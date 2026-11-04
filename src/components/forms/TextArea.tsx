import type { TextareaHTMLAttributes } from "react";
import { fieldControlClassName } from "./Field";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ className = "", ...props }: TextAreaProps) {
  return <textarea {...props} className={`${fieldControlClassName} min-h-32 resize-y ${className}`} />;
}
