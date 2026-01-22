import { getProducts, countProdutos } from "@/lib/actions/products";
import ProdutoCard from "@/components/shared/produto-card";
import Filtro from "@/components/produtos/fitro";
import { filtros } from "@/lib/utils";
import { type FiltroKey } from "@/lib/types";
import CarregarMaisBtn from "@/components/produtos/carregarMaisBtn";

export default async function Produtos({ 
  searchParams 
}: { 
  searchParams: Promise<{ filtro ?: string, page ?: number}>
}) {
  const { filtro, page } = await searchParams;
  
  const pagina = page ?? 1
  const produtosRes = await  getProducts(pagina * 12);
  


  const acaoDoFiltro =
  filtro && filtro in filtros
    ? filtros[filtro as FiltroKey]
    : undefined;

  const produtos = produtosRes.data;
  if (!produtos) return <>Sem produtos...</>

  const produtosRenderizados = acaoDoFiltro? acaoDoFiltro(produtos) : produtos;

  const qtndprodutos = await countProdutos();
  
  return (<>
            <div className='flex flex-col gap-3 sm:flex-row justify-between px-12 '>
              <span className='text-sm text-stone '>{qtndprodutos}</span>
                <Filtro />
            </div>

        <section className="w-full py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4 lg:px-10">
            {produtosRenderizados.map((p) => {
              return <div key={p.id} className="w-full">
                        <ProdutoCard {...p} />
                      </div>
})}
          </div>

        <CarregarMaisBtn productLen={produtos.length} totalProducts={qtndprodutos}/>
      
          
        </section>
    </>)
}