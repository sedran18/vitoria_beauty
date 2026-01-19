import { produtos } from "@/lib/data/listaDeProdutos";
import { Button } from "@/components/ui/button";
import ProdutoCard from "@/components/shared/produto-card";
import Filtro from "@/components/produtos/fitro";
import { filtros } from "@/lib/utils";
import { type FiltroKey } from "@/lib/utils";

export default async function Produtos({ 
  searchParams 
}: { 
  searchParams: Promise<{ filtro ?: string}>
}) {
  
  const { filtro } = await searchParams;
  const acaoDoFiltro =
  filtro && filtro in filtros
    ? filtros[filtro as FiltroKey]
    : undefined;
  
  if (!acaoDoFiltro) {
    console.error('Filtro inválido:', filtro);
  }

  const produtosRenderizados = acaoDoFiltro? acaoDoFiltro(produtos) : produtos;

  const qtndprodutos = produtos.length;

  return (<>
            <div className='flex flex-col gap-3 sm:flex-row justify-between px-12 '>
              <span className='text-sm text-stone '>{qtndprodutos}</span>
                <Filtro />
            </div>

        <section className="w-full py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4 lg:px-10">
            {produtosRenderizados.map((p) => (
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
    </>)
}