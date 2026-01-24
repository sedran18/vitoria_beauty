import { getProducts } from "@/lib/actions/products";
import ProdutoCart from "@/components/carrinho/produtoCart";
import PedidoResumo from "@/components/carrinho/pedidoResumo";

const Carrinho = async () => {
    const res = await getProducts(7);
    const testeProdutos = res.data;

    return (
        <main className="max-w-7xl mx-auto p-6 md:p-10">
            <h1 className="
            text-4xl font-bold mb-8  uppercase
            text-[var(--brand-secondary)] tracking-wider">Carrinho</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                <section className="lg:col-span-2">
                    {testeProdutos && testeProdutos.length > 0 ? (
                        testeProdutos.map((p) => (
                            <ProdutoCart 
                                key={p.id} 
                                productId={p.id}  
                                name={p.name}  
                                image={p.images[0]} 
                                quantidadeInicial={1}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">Nenhum produto adicionado ao carrinho ainda.</p>
                        </div>
                    )}
                </section>

                <PedidoResumo />
            </div>
        </main>
    );
}

export default Carrinho;