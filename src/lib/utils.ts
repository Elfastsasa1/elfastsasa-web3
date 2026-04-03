import { clsx as clsxLib, type ClassValue } from "clsx";

/** Merge Tailwind class names conditionally */
export function cn(...inputs: ClassValue[]) {
  return clsxLib(inputs);
}
