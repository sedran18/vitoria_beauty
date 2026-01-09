import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function interWithLoop<T>(
  arr:T[], 
  miliseconds: number, 
  onchange: (item: T) => void 
)
{
  let index = 0;

  const interval = setInterval(() => {
    onchange(arr[index]);
    index = (index + 1) % arr.length;
  }, miliseconds);

  return () => clearInterval(interval);
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}