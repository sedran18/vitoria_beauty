import OrderCard from "@/components/order/orderCard";
import { PackageOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getOrders } from "@/lib/actions/order";


const MinhasComprasPage = async  () => {
  const orders = await getOrders();
  const hasOrders = orders.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="mb-10">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-sm mb-4 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para a loja
        </Link>
        <h1 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter">
          Minhas Compras
        </h1>
        <p className="text-zinc-500 mt-2">
          Acompanhe o status e histórico de todos os seus pedidos.
        </p>
      </div>

      {hasOrders ? (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard 
              key={order.id}
              orderId={order.id}
              date={order.createdAt}
              total={order.total}
              status={order.status}
              firstItemImage={order.orderItems[0]?.product?.images[0]?.url ?? ''}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
          <div className="flex justify-center mb-4 text-zinc-300">
            <PackageOpen size={64} strokeWidth={1} />
          </div>
          <h2 className="text-xl font-bold text-zinc-800">Você ainda não tem pedidos</h2>
          <p className="text-zinc-500 mb-8 mt-2">Que tal começar a cuidar de você hoje?</p>
          <Link 
            href="/produtos" 
            className="bg-zinc-900 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all"
          >
            Explorar Produtos
          </Link>
        </div>
      )}
    </div>
  );
};

export default MinhasComprasPage;