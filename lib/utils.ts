import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string): string => name
  .split(' ')
  .map(word => word.charAt(0).toUpperCase())
  .join('')
  .slice(0, 2) // Limit to two initials
  .trim();