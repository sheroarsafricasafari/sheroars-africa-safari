import type { ReactNode } from "react";

export const fieldControlClassName =
  "w-full rounded-xl border border-earth/15 bg-white px-4 py-3 text-sm text-earth outline-none transition placeholder:text-muted/70 focus:border-gold focus:ring-2 focus:ring-gold/20";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export default function Field({ id, label, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-earth">{label}</label>
      {children}
      {error ? <p id={errorId} role="alert" className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}

export function fieldErrorProps(id: string, error?: string) {
  return error ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {};
}
