import { MapPin, Trash2, ShieldAlert, Plus, Home, ChevronRight } from "lucide-react";

const Conta = () => {
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
          <button className="flex items-center gap-1 text-[10px] font-black uppercase text-[var(--accent)] hover:opacity-70 transition-opacity">
            <Plus size={14} />
            Novo Endereço
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[var(--brand-primary)] transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--brand-soft)] rounded-2xl text-[var(--brand-secondary)]">
                <Home size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-[var(--text-primary)] text-sm">Principal • Casa</p>
                <p className="text-xs text-gray-400">Rua das Flores, 123 • São Paulo, SP</p>
              </div>
            </div>
            <button className="p-2 text-gray-300 hover:text-red-400 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[var(--brand-primary)]/30 pb-2">
          <ShieldAlert size={18} className="text-[var(--brand-secondary)]" />
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-secondary)]">
            Privacidade
          </h2>
        </div>

        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">

            <button className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="text-left">
                    <p className="text-sm font-bold text-[var(--text-primary)]">Novidades e Ofertas</p>
                    <p className="text-[10px] text-gray-400">Gerencie como você recebe nossas promoções.</p>
                </div>
                <div className="w-10 h-5 bg-[var(--brand-primary)] rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                </div>
            </button>
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