import { auth } from '@/auth';
import Link from 'next/link';
import { getRatingsFromUser } from '@/lib/actions/users';
import Stars from '@/components/ui/stars';
import { Settings2, Star } from 'lucide-react';
import Image from 'next/image';

const Perfil = async () => {
  const session = await auth();
  const user = session?.user;
  const ratings = await getRatingsFromUser(user?.id ?? '');

  return (
    <div className="max-w-4xl mt-7  mx-auto space-y-8">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[var(--brand-primary)]/30 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-[var(--brand-soft)] border-2 border-[var(--brand-primary)] flex items-center justify-center overflow-hidden text-[var(--brand-secondary)] text-3xl font-black shadow-inner">
          {user?.image ? (
             <Image src={user.image} alt={user.name ?? ''} className="w-full h-full object-cover" />
          ) : (
            user?.name?.charAt(0).toUpperCase()
          )}
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
            {user?.name}
          </h2>
          <p className="text-xs font-bold text-[var(--brand-secondary)]  tracking-widest opacity-80">
            {user?.email}
          </p>
        </div>

        <Link href='/configuracoes/perfil'>
          <button className="flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-soft)] text-[var(--brand-secondary)] font-bold text-xs uppercase tracking-tighter hover:bg-[var(--brand-primary)] hover:text-[var(--text-primary)] transition-all active:scale-95 shadow-sm border border-[var(--brand-primary)]/20">
            <Settings2 size={16} />
            Editar Perfil
          </button>
        </Link>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <Star size={18} className="text-[var(--brand-secondary)] fill-[var(--brand-secondary)]" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text-primary)]/60">
            Meu Histórico de Avaliações
          </h3>
        </div>

        {ratings.length === 0 ? (
          <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
            <p className="text-gray-400 font-medium italic">Nenhuma avaliação ainda</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {ratings.map((r) => (
              <div 
                key={r.id} 
                className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-1">
                  <Stars rating={r.value} />
                  <h4 className="font-bold text-[var(--text-primary)] text-lg">
                    {r.product.name}
                  </h4>
                </div>
                
                <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-3 py-1 rounded-full w-fit">
                  {new Date(r.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Perfil;