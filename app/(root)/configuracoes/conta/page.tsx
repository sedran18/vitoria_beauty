import { MapPin,  Plus} from "lucide-react";
import EndereçosCard from "@/components/configuracoes/endereçosCard";
import { getListAddresses } from "@/lib/actions/address";
import { auth } from "@/auth";
import Link from "next/link";

const Conta = async () => {
  const session = await auth();
  
  const addresses = session ? await getListAddresses(session?.user?.id ?? "") : null;


  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-20">
      <header className="space-y-2">
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
          Minha Conta
        </h1>
        <p className="text-sm text-[var(--brand-secondary)] font-medium">
          Gerencie seus endereços e preferências de privacidade.
        </p>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--brand-primary)]/30 pb-2">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-[var(--brand-secondary)]" />
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-secondary)]">
              Endereços de Entrega
            </h2>
          </div>
          <button className=" text-[10px] font-black uppercase text-[var(--accent)] hover:opacity-70 transition-opacity">
            <Link href='/configuracoes/conta/endereco' className="h-full w-full flex items-center gap-1">
              <Plus size={14} />
              Novo Endereço
            </Link>

          </button>
        </div>

        <div className="flex flex-col gap-4 items-center">
          { addresses && addresses.length > 0? 
            addresses.map(a=> <EndereçosCard key={a.id} address={a} userId={session?.user?.id ?? ''}/>)
            : <p className="text-gray-500 text-sm">Não há nenhum endereço de entrega ainda </p>
          }
        </div>
      </section>

      

      <section className="pt-10">
        <div className="bg-red-50/50 p-8 rounded-[2.5rem] border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-sm font-black text-red-600 uppercase tracking-tighter">
              Excluir minha conta
            </h3>
            <p className="text-xs text-red-400 max-w-[320px]">
              Esta ação é permanente e removerá todo seu histórico de compras e avaliações.
            </p>
          </div>
          <button className="px-8 py-3 bg-white border border-red-200 text-red-600 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">
            Encerrar Conta
          </button>
        </div>
      </section>
    </div>
  );
};

export default Conta;