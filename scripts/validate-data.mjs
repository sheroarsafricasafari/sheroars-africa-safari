import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = resolve(root, ".data-validation-temp");
const configPath = resolve(root, "tsconfig.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);

if (configFile.error) {
  throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n"));
}

const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
const options = {
  ...parsed.options,
  incremental: false,
  noEmit: false,
  module: ts.ModuleKind.CommonJS,
  moduleResolution: ts.ModuleResolutionKind.Node10,
  outDir: outputDir,
  rootDir: root,
  tsBuildInfoFile: undefined,
};
const entry = resolve(root, "src/data/validateSamples.ts");
const program = ts.createProgram([entry], options);
const diagnostics = ts.getPreEmitDiagnostics(program);

if (diagnostics.length) {
  throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCurrentDirectory: () => root,
    getCanonicalFileName: (fileName) => fileName,
    getNewLine: () => "\n",
  }));
}

try {
  const emitted = program.emit();
  if (emitted.emitSkipped) throw new Error("TypeScript could not emit the data validator.");
  const result = spawnSync(process.execPath, [resolve(outputDir, "src/data/validateSamples.js")], {
    cwd: root,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status ?? 1;
} finally {
  rmSync(outputDir, { recursive: true, force: true });
}
