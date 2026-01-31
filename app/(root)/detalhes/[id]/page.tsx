import { getProductById } from "@/lib/actions/products";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ShieldCheck } from "lucide-react";
import { formatBRL } from "@/lib/utils";
import ProdutoImagens from "@/components/detalhes/produtosImages";
import RatingInput from "@/components/detalhes/ratingInput";
import Ratings from "@/components/detalhes/ratings";
import { auth } from "@/auth";
import Link from "next/link";
import AddToCartBtn from "@/components/detalhes/addToCartBtn";

export default async function DetalhesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) return notFound();

    const session = await auth();
    
    return (
        <main className="max-w-7xl mx-auto px-6 py-12 md:py-24 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                <ProdutoImagens product={product} />

                <div className="lg:col-span-5 flex flex-col ">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                            <span>{product.category}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-gray-600">{product.ratingAvg}</span>
                            </div>
                        </div>
                        <h1 className="text-3xl text-gray-900 leading-tight">
                            {product.name}
                        </h1>
                    </div>

                    <div className="mt-6 ">
                        <span className="text-3xl font-bold  text-stone-700 ">
                            {formatBRL(product.price)}
                        </span>
                    </div>

                    <div className="h-px bg-gray-100 w-full my-8" />

                    <div className="space-y-6">
                        <p className="text-gray-500 leading-relaxed font-light">
                            {product.description}
                        </p>

                        <div className="space-y-4">
                            <AddToCartBtn productId={product.id} stock={product.stock}/>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-4 border-t border-gray-100 pt-8">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <ShieldCheck className="w-5 h-5 text-gray-400" />
                            <span>Pagamento seguro e devolução simplificada</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-5 h-5 flex items-center justify-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            </div>
                            <span>{product.stock > 0 ? `Disponível para envio imediato (${product.stock})` : "Produto sob encomenda"}</span>
                        </div>
                    </div>
                </div>

            </div>

            <section className="max-w-5xl mx-auto py-10 px-4">
                <div className="space-y-12">
                    <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-center text-gray-400">
                        Sua Opinião
                    </h3>
                    {session ? (
                        <RatingInput  userId={session?.user?.id ?? ''} productId={product.id} />
                        ) : (
                            <div 
                            className="
                            relative 
                            overflow-hidden 
                            p-7 rounded-[2.5rem] border-2 
                            border-dashed border-gray-100 
                            bg-white text-center space-y-4">
                                <div className="space-y-2">
                                <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--brand-secondary)]">
                                    Sua opinião importa
                                </p>
                                <p className="text-xs text-gray-500 font-medium max-w-[200px] mx-auto leading-relaxed">
                                    Para avaliar este produto, você precisa estar logado.
                                </p>
                                </div>

                                <Link 
                                href="/login" 
                                className="inline-block px-8 py-3
                                bg-[var(--brand-secondary)] border border-gray-200
                                text-[10px] font-black uppercase
                                tracking-widest rounded-xl 
                                hover:bg-[var(--accent)] 
                                text-white hover:border-[var(--brand-primary)] 
                                transition-all shadow-sm active:scale-95"
                                >
                                Fazer Login
                                </Link>

                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 px-4">
                        Avaliações da Comunidade
                    </h3>
                    <Ratings ratings={product.ratings} userId={session?.user?.id ?? ''}/>
                    </div>
                </div>
            </section>
        </main>
    );
}