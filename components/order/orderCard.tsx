import { Calendar, ImageIcon} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Decimal } from "@prisma/client/runtime/library";
import Link from "next/link";

interface OrderCardProps {
  orderId: string;
  date: Date;
  total: Decimal; 
  status: string;
  firstItemImage?: string; 
}

const OrderCard = ({ orderId, date, total, status,  firstItemImage }: OrderCardProps) => {
  
  const totalAsNumber = Number(total);

  const statusStyles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-100",
    PAID: "bg-emerald-50 text-emerald-700 border-emerald-100",
    CANCELED: "bg-red-50 text-red-700 border-red-100",
  };

  const statusLabels: Record<string, string> = {
    PENDING: "Aguardando Pagamento",
    PAID: "Pagamento Aprovado",
    CANCELED: "Cancelado",
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-5 transition-all hover:shadow-md group">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        
        <div className="flex gap-4">
          <div className="relative h-20 w-20 rounded-xl bg-zinc-50 border border-zinc-100 overflow-hidden flex-shrink-0">
            {firstItemImage ? (
              <Image 
                src={firstItemImage} 
                alt="Produto do pedido" 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-zinc-300">
                <ImageIcon size={24} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border",
                statusStyles[status] || "bg-zinc-50 text-zinc-600 border-zinc-100"
              )}>
                {statusLabels[status] || status}
              </span>
            </div>
            
            <h3 className="font-bold text-gray-900 leading-none">
              Pedido #{orderId.slice(-8).toUpperCase()}
            </h3>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-1">
                <Calendar size={13} />
                {new Date(date).toLocaleDateString('pt-BR')}
              </div>

            </div>
          </div>
        </div>

        <div className="flex flex-col md:items-end justify-between gap-2 border-t md:border-t-0 pt-4 md:pt-0">
          <div className="md:text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Total Investido</p>
            <p className="text-xl font-black text-zinc-900">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalAsNumber)}
            </p>
          </div>
          
          <button className="cursor-pointer text-xs font-bold text-pink-600 md:text-zinc-900 underline underline-offset-4 hover:text-pink-600 transition-colors self-start md:self-auto">
            <Link href={`/compras/${orderId}`}>
              Ver detalhes
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;