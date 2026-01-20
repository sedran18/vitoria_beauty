import { filtros } from "./utils";
import { Decimal } from "@prisma/client/runtime/library";

export interface ProdutosImagesType {
  id: string;
  url: string;
  alt: string;
  productId: string;
}

export interface ProdutosType {
  id: string;
  name: string;
  description: string;
  price: Decimal | number;
  stock: number;
  category: string;
  ratingAvg: Decimal | number | null; 
  ratingCount: number | null;
  images: ProdutosImagesType[]; 
  createdAt: Date;
  updatedAt: Date;
}

export type FiltroKey = keyof typeof filtros;