type PagePlaceholderProps = {
  title: string;
  path: string;
  section?: string;
};

export default function PagePlaceholder({
  title,
  path,
  section,
}: PagePlaceholderProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      {section ? (
        <p className="text-sm uppercase tracking-widest opacity-60">
          {section}
        </p>
      ) : null}
      <h1 className="text-4xl font-semibold">{title}</h1>
      <code className="rounded bg-black/5 px-3 py-1 text-sm dark:bg-white/10">
        {path}
      </code>
      <p className="opacity-60">Page under construction</p>
    </main>
  );
}
