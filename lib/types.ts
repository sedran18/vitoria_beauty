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
  ratingAvg: Decimal | number; 
  ratingCount: number | null;
  images: ProdutosImagesType[]; 
  salesCount: number
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterFormType {
  email: string, 
  password: string,
  name: string,
  confirmPassword?: string
}

export type FiltroKey = keyof typeof filtros;

export interface UserMenuProps {
  user?: {
    id?: string;         
    name?: string | null;
    email?: string | null;
    image?: string | null; 
  } | null;
}
