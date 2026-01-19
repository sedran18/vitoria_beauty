import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ProdutosType } from "@/lib/types";

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

export const  filterByDate = <P extends { createdAt: string | Date }> (produtos:P[], order: -1 | 1 ):P[] => {
  return produtos.sort((a,b) =>  order * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
}


export const filterByPrice = <P extends { price: number }>(
  produtos: P[],
  order: 1 | -1 
): P[] => {
  return produtos.sort((a, b) => order * (a.price - b.price));
};

export const filterByName = <P extends {name: string}>(
  produtos: P[],
  order: 1 | -1
)  => {
  return produtos.sort((a, b) => order * a.name.localeCompare(b.name)); 
}


export const filtros = {
  // 'mais-novo': (p: ProdutosType[]) => filterByDate(p, 1),
  // 'mais-antigo': (p: ProdutosType[]) => filterByDate(p, -1),
  'mais-barato': (p: ProdutosType[]) => filterByPrice(p, 1),
  'mais-caro': (p: ProdutosType[]) => filterByPrice(p, -1),
  'a-z': (p: ProdutosType[]) => filterByName(p, 1),
  'z-a': (p: ProdutosType[]) => filterByName(p, -1),
};

export type FiltroKey = keyof typeof filtros;