'use client'
import { formatBRL } from "@/lib/utils";
import { cleanCart } from "@/lib/actions/cart";
import { useRouter } from "next/navigation";

const PedidoResumo = ({valorTotal, user}:{valorTotal:  number, user: boolean}) => {
    const router = useRouter();

    const handleClick = async () => {
        if (!user) return router.push('/login') 
        await cleanCart();
        alert('Pedido comprado com sucesso')
    }
  return (
 <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Resumo do Pedido</h2>
                    
                    <div className="space-y-3 border-b border-gray-100 pb-4 mb-4 text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium">{formatBRL(valorTotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Frete</span>
                            <span className="text-green-600 font-medium">Grátis</span>
                        </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                        <span>Total</span>
                        <span>{formatBRL(valorTotal)}</span>
                    </div>

                    <button className="w-full bg-[var(--brand-secondary)] 
                    cursor-pointer hover:bg-[var(--accent)] 
                     text-white font-bold py-4 rounded-xl transition-colors
                     " 
                     onClick={handleClick}>
                        Finalizar Compra
                    </button>
    </section>
  )
}

export default PedidoResumo;
