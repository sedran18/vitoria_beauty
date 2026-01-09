'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Stars from '@/components/ui/stars';
import { formatBRL } from "@/lib/utils";

interface ProdutoCardProps {
  id: string;
  thumbnails: string[];
  slug: string;
  rate: number;
  votos: number;
  name: string;
  price: number;
  description: string;
}

export default function ProdutoCard({
  id,
  thumbnails = [],
  rate,
  votos,
  name,
  price,
  description
}: ProdutoCardProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const hasSecondImage = thumbnails.length > 1;

  return (
    <Card className="group flex h-full flex-col gap-1 overflow-hidden border-none bg-white p-0 shadow-none transition-all hover:shadow-sm">
      <Link href={`/products/${id}`} className="relative block overflow-hidden">
        <CardContent className="relative aspect-square w-full p-0 bg-gray-100">
          <Image
            src={thumbnails[currentImg] || "/placeholder.png"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onMouseEnter={() => hasSecondImage && setCurrentImg(1)}
            onMouseLeave={() => setCurrentImg(0)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </CardContent>
      </Link>

      <CardFooter className="flex  flex-col gap-3 p-2 pt-2">
        <div className="flex items-center gap-2 justify-between w-full flex-wrap">
          <div className="flex items-center gap-1 ">
            <Stars rating={rate} cor="#393939" size={14} />
            <span className="text-[10px] text-muted-foreground">({votos})</span>
          </div>
          <span className="font-bold text-sm">{formatBRL(price)}</span>
        </div>

        <Link href={`/products/${id}`} className="w-full block  flex items-start flex-col">
        <h3 className="font-semibold text-xs md:text-sm line-clamp-1 group-hover:underline">
          {name}
        </h3>
          <p className=" mt-1 text-xs text-gray-500">
            {description}
          </p>
        </Link>

        <Button 
          className="w-full bg-[#333] hover:bg-black text-white py-5 h-auto rounded-md transition-colors text-xs lg:text-sm"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}