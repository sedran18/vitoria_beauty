'use client';

import ProdutoCard from "../shared/produto-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface productTest {
  id: string;
  thumbnails: string[];
  slug: string;
  rate: number;
  description: string;
  price: number;
  votos: number;
  name: string;
}

const produtosTeste: productTest[] = [
  {
    id: '1',
    thumbnails: ['/teste1.webp', '/teste2.webp'],
    slug: 'teste',
    rate: 5,
    description: 'produto vendkiddo mais famoso do Brasil',
    price: 29,
    votos: 90,
    name: 'teste produto',
  },
  {
    id: '2',
    thumbnails: ['/teste1.webp', '/teste2.webp'],
    slug: 'teste',
    rate: 5,
    description: 'produto vendkiddo mais famoso do Brasil',
    price: 29,
    votos: 90,
    name: 'teste produto',
  },
  {
    id: '3',
    thumbnails: ['/teste1.webp', '/teste2.webp'],
    slug: 'teste',
    rate: 5,
    description: 'produto vendkiddo mais famoso do Brasil',
    price: 29,
    votos: 90,
    name: 'teste produto',
  },
  {
    id: '4',
    thumbnails: ['/teste1.webp', '/teste2.webp'],
    slug: 'teste',
    rate: 5,
    description: 'produto vendkiddo mais famoso do Brasil',
    price: 29,
    votos: 90,
    name: 'teste produto',
  },
  {
    id: '5',
    thumbnails: ['/teste1.webp', '/teste2.webp'],
    slug: 'teste',
    rate: 5,
    description: 'produto vendkiddo mais famoso do Brasil',
    price: 29,
    votos: 90,
    name: 'teste produto',
  },
  {
    id: '6',
    thumbnails: ['/teste1.webp', '/teste2.webp'],
    slug: 'teste',
    rate: 5,
    description: 'produto vendkiddo mais famoso do Brasil',
    price: 29,
    votos: 90,
    name: 'teste produto',
  },
  {
    id: '7',
    thumbnails: ['/teste1.webp', '/teste2.webp'],
    slug: 'teste',
    rate: 5,
    description: 'produto vendkiddo mais famoso do Brasil',
    price: 29,
    votos: 90,
    name: 'teste produto',
  },
  {
    id: '8',
    thumbnails: ['/teste1.webp', '/teste2.webp'],
    slug: 'teste',
    rate: 5,
    description: 'produto vendkiddo mais famoso do Brasil',
    price: 29,
    votos: 90,
    name: 'teste produto',
  },
  
];

const Destaques = () => {
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
              {produtosTeste.map((p) => (
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
          {produtosTeste.map((p) => (
            <ProdutoCard key={p.id} {...p} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Destaques;