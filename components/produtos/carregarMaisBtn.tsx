'use client'
import { Button } from "../ui/button";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

interface Props {
  productLen: number;
  totalProducts: number; 
}

const CarregarMaisBtn = ({ productLen, totalProducts }: Props) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    if (productLen >= totalProducts) return null;

    const params = new URLSearchParams(searchParams.toString());
    const nextPage = Math.floor(productLen / 12) + 1;
    params.set('page', String(nextPage));

    return (
        <div className="flex justify-center mt-12">
            <Button 
                asChild 
                variant="outline"
                className="hover:bg-[#333] hover:text-[#fefefe] px-6 py-6 transition-all duration-400 font-base"
            >
                <Link href={`${pathname}?${params.toString()}`} scroll={false}>
                    Carregar mais
                </Link>
            </Button>
        </div>
    );
}

export default CarregarMaisBtn;