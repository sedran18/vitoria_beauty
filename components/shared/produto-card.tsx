'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Stars from '@/components/ui/stars';
import { formatBRL } from "@/lib/utils";
import { type ProdutosType } from "@/lib/types";
import { addToCart } from "@/lib/actions/cart";
import { Check } from "lucide-react";


export default function ProdutoCard({
  id,
  images = [],
  ratingAvg,
  ratingCount,
  name,
  price,
}: Omit<ProdutosType, 'description'>) {
  const [currentImg, setCurrentImg] = useState(0);
   const [added, setAdded] = useState(false);

  const hasSecondImage = images.length > 1;

  const handleClick = async () => {
    await addToCart(id);
    setAdded(true);
  }


  return (
    <Card className="group flex h-full flex-col gap-1 overflow-hidden border-none bg-white p-0 shadow-none transition-all hover:shadow-sm justify-between">
      <Link href={`/detalhes/${id}`} className="relative block overflow-hidden">
        <CardContent className="relative aspect-square w-full p-0 bg-gray-100">
          <Image
            src={images[currentImg].url || "/placeholder.png"}
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
            <Stars rating={Number(ratingAvg)} cor="#393939" size={14} />
            <span className="text-[10px] text-muted-foreground">({ratingCount})</span>
          </div>
          <span className="font-bold text-sm">{formatBRL(price)}</span>
        </div>

        <Link href={`/detalhes/${id}`} className="w-full block  flex items-start flex-col">
        <h3 className="font-semibold text-xs md:text-sm line-clamp-2 group-hover:underline">
          {name}
        </h3>
        </Link>

        <Button 
          className="w-full bg-[#333] hover:bg-black text-white py-5 h-auto rounded-md transition-colors text-xs lg:text-sm"
          onClick={handleClick}
        >
           {
        added ?  
        <>
          <Check className="w-4 h-4 mr-2"/>
          Adicionado
        </>
        :
        <>
          Adicionar ao Carrinho
        </>
      }
        </Button>
      </CardFooter>
    </Card>
  );
}