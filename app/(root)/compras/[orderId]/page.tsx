import { ArrowLeft, Package, MapPin, ReceiptText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getItemsFromOrder } from "@/lib/actions/order";

const OrderDetails = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = await params;
  const items = await getItemsFromOrder(orderId);

  const totalGeral = items.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <Link 
        href="/compras" 
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors text-sm mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para minhas compras
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="text-zinc-400" size={24} />
            <h1 className="text-2xl font-black uppercase tracking-tighter">Itens do Pedido</h1>
          </div>

          <div className="border border-zinc-100 rounded-3xl overflow-hidden bg-white">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border-b border-zinc-50 last:border-0 items-center">
                <div className="relative h-20 w-20 bg-zinc-50 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-100">
                  <Image 
                    src={item.product.images?.[0]?.url || '/placeholder.png'} 
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-zinc-900 leading-tight">{item.product.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">{item.product.category}</p>
                  <div className="flex justify-between items-end mt-2">
                    <p className="text-sm text-zinc-500 font-medium">Qtd: {item.quantity}</p>
                    <p className="font-bold text-zinc-900">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.price))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 text-white rounded-3xl p-6 shadow-xl shadow-zinc-200">
            <div className="flex items-center gap-2 mb-6">
              <ReceiptText size={20} className="text-pink-400" />
              <h2 className="font-bold uppercase tracking-widest text-xs">Resumo do Pedido</h2>
            </div>
            
            <div className="space-y-3 text-sm border-b border-zinc-800 pb-4 mb-4">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGeral)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Frete</span>
                <span className="text-emerald-400 uppercase text-[10px] font-bold">Grátis</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-sm uppercase">Total</span>
              <span className="text-2xl font-black">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGeral)}
              </span>
            </div>
          </div>

          <div className="bg-white border border-zinc-100 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4 text-zinc-900">
              <MapPin size={18} />
              <h3 className="font-bold text-sm uppercase tracking-wider">Entrega</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Endereço padrão de entrega cadastrado no seu perfil Vitta Beauty.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;