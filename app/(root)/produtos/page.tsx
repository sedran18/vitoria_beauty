import ProdutoCard from "@/components/shared/produto-card";
import { Button } from "@/components/ui/button";

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
export default function Produtos() {
  return (
    <section className="w-full py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4 lg:px-10">
        {produtosTeste.map((p) => (
          <div key={p.id} className="w-full">
            <ProdutoCard {...p} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button 
          className="bg-transparent cursor-pointer hover:bg-[#333] hover:text-[#fefefe] px-3 py-6  transition-all duration-400 ease  font-base border-1"
        >
          Carregar mais
        </Button>
      </div>
    </section>
  );
}