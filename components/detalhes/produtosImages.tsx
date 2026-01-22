'use client';

import Image from "next/image";
import { Heart } from "lucide-react";
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
                        <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                            <Heart className="w-5 h-5 text-gray-600" />
                        </button>
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
