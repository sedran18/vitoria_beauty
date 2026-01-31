'use client'

import  { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react'; 
import { ProdutosImagesType } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { adicionarQuantidade, removerItem} from '@/lib/actions/cart';
import { formatBRL } from '@/lib/utils';

const ProdutoCart = ({ productId, name, image, quantity, itemId, price }: {
    productId: string, 
    name: string, 
    image: ProdutosImagesType, 
    quantity: number
    itemId: string
    price: number
}) => {
  const [qtd, setQtd] = useState(quantity);
  const aumentar = async () => {
    await adicionarQuantidade(itemId, 1)
    setQtd(prev => prev + 1);
}
  const diminuir = async () => {
    await adicionarQuantidade(itemId, -1)
    setQtd(prev => (prev > 1 ? prev - 1 : 1))
};

  return (

        <div className="flex flex-col sm:flex-row items-center justify-between p-4 mb-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <Link href={`/detalhes/${productId}`} className='cursor-pointer '>
            <div className="flex items-center w-full gap-4">
            <div className="w-20 h-20 flex-shrink-0 relative">
                <Image
                src={image.url}
                alt={image.alt}
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
            </div>

            <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-base md:text-lg leading-tight line-clamp-2">
                {name}
                </h3>
                <p className="text-[8px] text-gray-500 mt-1 uppercase tracking-wider">Ref: {itemId}</p>
            </div>
            </div>
        </Link>

        <div className="flex flex-col items-center sm:items-end px-2">
            <span className="text-xs text-gray-400 font-medium">Preço</span>
            <span className="font-bold text-gray-900">
            {formatBRL(price * qtd)}
            </span>
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
                onClick={diminuir}
                className="p-2 sm:p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600 active:scale-95"
            >
                <Minus size={18} />
            </button>

            <span className="w-12 text-center font-bold text-gray-700">
                {qtd}
            </span>

            <button
                onClick={aumentar}
                className="p-2 sm:p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600 active:scale-95"
            >
                <Plus size={18} />
            </button>
            </div>

            <button
            onClick={() => removerItem(itemId)}
            className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-2 active:bg-red-50 rounded-full">
            <Trash2 size={22} />
            </button>
        </div>
        </div>

  );
};

export default ProdutoCart;