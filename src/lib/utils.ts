import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Fetchios } from "./fethios/fetchios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchios = new Fetchios("http://localhost:3000/api/")
