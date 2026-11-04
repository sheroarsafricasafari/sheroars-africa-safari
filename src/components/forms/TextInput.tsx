import type { InputHTMLAttributes } from "react";
import { fieldControlClassName } from "./Field";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({ className = "", ...props }: TextInputProps) {
  return <input {...props} className={`${fieldControlClassName} ${className}`} />;
}
