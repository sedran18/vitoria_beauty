'use client';

import ProdutoCard from "../shared/produto-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProdutosType } from "@/lib/types";

interface DestaquesType {
  produtos: ProdutosType[]
}

const Destaques = ({produtos}: DestaquesType) => {
  return (
    <section className="mt-16 w-full">
      <div className="mb-10 text-center">
        <h2 className="text-xl uppercase md:text-3xl text-[var(--brand-secondary)] font-semibold">
          Mais Vendidos
        </h2>
        <span className="mt-2 block text-xs md:text-sm text-gray-500">
          Os favoritos de quem já experimentou
        </span>
      </div>

      <div className="mx-auto px-4 md:px-12 lg:px-16">
        
        <div className="lg:hidden">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-2">
              {produtos.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="pl-2 basis-[82%] sm:basis-[45%]"
                >
                  <ProdutoCard {...p} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="hidden lg:grid grid-cols-4 gap-6">
          {produtos.map((p) => (
            <ProdutoCard key={p.id} {...p} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Destaques;