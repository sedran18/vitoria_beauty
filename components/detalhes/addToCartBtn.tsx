'use client';

import { ShoppingBag, Check } from "lucide-react";
import { Button } from "../ui/button";
import { addToCart } from "@/lib/actions/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddToCartBtn = ({productId, stock}: {productId: string, stock: number}) => {
  const [added, setAdded] = useState(false)
  const router = useRouter();

  const handleClick = async () => {
    if (stock <= 0) return;
    await addToCart(productId);
    setAdded(true);
    router.push('/carrinho');
  }

  return (
    <Button
    onClick={handleClick}
    className="w-full cursor-pointer py-8 text-sm uppercase tracking-widest bg-black text-white hover:bg-zinc-800 rounded-full transition-all shadow-xl shadow-black/5">
        {
        stock <= 0 ?
        <>
          Estoque Vazio
        </>
        :
        added ?  
        <>
          <Check className="w-4 h-4 mr-2"/>
          Adicionado
        </>
        :
        <>
          <ShoppingBag className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </>
      }
         
    </Button>
  )
}

export default AddToCartBtn
