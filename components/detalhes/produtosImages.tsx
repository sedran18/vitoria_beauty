'use client';

import Image from "next/image";
import { ProdutosType } from "@/lib/types";
import { useState } from "react";

const ProdutoImagens = ({product}: {product: ProdutosType}) => {
  const [current, setCurrent] = useState(0);

  return (
<div className="lg:col-span-7 space-y-6">
                    <div className="relative aspect-square overflow-hidden rounded-md ">
                        <Image
                            src={product.images[current]?.url}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            priority
                        />
                    </div>
                    
                    <div className="flex h-15 gap-4">
                        {product.images.map((img, i) => (
                            <div 
                            key={img.id} 
                            onClick={() => setCurrent(i)}
                            className="relative aspect-square  overflow-hidden cursor-pointer group border border-transparent hover:border-black transition-all">
                                <Image src={img.url} alt={img.alt} fill className="object-cover group-hover:opacity-80 transition-opacity" />
                            </div>
                        ))}
                    </div>
                </div>
  )
}

export default ProdutoImagens
