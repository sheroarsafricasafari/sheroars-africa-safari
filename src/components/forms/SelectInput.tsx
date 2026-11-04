import type { SelectHTMLAttributes } from "react";
import { fieldControlClassName } from "./Field";

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function SelectInput({ className = "", ...props }: SelectInputProps) {
  return <select {...props} className={`${fieldControlClassName} ${className}`} />;
}
