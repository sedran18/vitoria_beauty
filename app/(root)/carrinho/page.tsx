import ProdutoCart from "@/components/carrinho/produtoCart";
import PedidoResumo from "@/components/carrinho/pedidoResumo";
import { getItemsFromCart } from "@/lib/actions/cart";
import { auth } from "@/auth";

const Carrinho = async () => {
    const session = await auth();
    const cart = await getItemsFromCart(session?.user?.id ?? '');
    const items = cart?.items;

    const valorTotal = items?.reduce((acc, item) => {
        return acc + ( Number(item.product.price )* item.quantity)
    }, 0);

    return (
        <main className="max-w-7xl mx-auto p-6 md:p-10">
            <h1 className="
            text-4xl font-bold mb-8  uppercase
            text-[var(--brand-secondary)] tracking-wider">Carrinho</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                <section className="lg:col-span-2">
                    {items && items.length > 0 ? (
                        items.map((p) => (
                            <ProdutoCart 
                                key={p.id} 
                                productId={p.product.id}  
                                name={p.product.name}  
                                image={p.product.images[0]} 
                                quantity={p.quantity}
                                itemId={p.id}
                                price={Number(p.product.price)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">Nenhum produto adicionado ao carrinho ainda.</p>
                        </div>
                    )}
                </section>

                <PedidoResumo valorTotal={valorTotal ?? 0} user={!!session?.user}/>
            </div>
        </main>
    );
}

export default Carrinho;