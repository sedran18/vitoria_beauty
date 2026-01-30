import Link from 'next/link';
import { getRatingsFromUser } from '@/lib/actions/users';
import Stars from '@/components/ui/stars';
import {  Star } from 'lucide-react';
import Image from 'next/image';
import { getUserById } from '@/lib/actions/users';

const Perfis = async ({ params }: { params: Promise<{ userId: string }> }) => {
  
  const {userId} = await  params;
  const user = await getUserById(userId);
  const ratings = await getRatingsFromUser(user?.id ?? '');

  return (
    <div className="max-w-4xl mt-7  mx-auto space-y-8">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[var(--brand-primary)]/30 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 relative rounded-full bg-[var(--brand-soft)] border-2 border-[var(--brand-primary)] flex items-center justify-center overflow-hidden text-[var(--brand-secondary)] text-3xl font-black shadow-inner">
          {user?.image ? (
             <Image src={user.image} 
             alt={user.name ?? ''} 
             fill
             sizes='48'
             className="w-full h-full object-cover rounded-full" />
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

      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <Star size={18} className="text-[var(--brand-secondary)] fill-[var(--brand-secondary)]" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text-primary)]/60">
            Histórico de Avaliações
          </h3>
        </div>

        {ratings.length === 0 ? (
          <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
            <p className="text-gray-400 font-medium italic">Nenhuma avaliação desse usuário ainda</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {ratings.map((r) => (
            <Link
                key={r.id}
                href={`/detalhes/${r.product.id}`}
                className="group relative bg-white p-5 rounded-[2rem] border border-gray-100 flex items-center gap-6 hover:border-[var(--brand-primary)]/20 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500"
            >
                <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                    <Stars rating={r.value} size={16}  />
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
                    {new Date(r.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                </div>
                
                <div>
                    <h4 className="font-black text-[var(--text-primary)] text-md leading-tight group-hover:text-[var(--brand-primary)] transition-colors">
                    {r.product.name}
                    </h4>
                </div>
                </div>

                <div className="pr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--brand-primary)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
                </div>
            </Link>
        ))}

          </div>
        )}
      </section>
    </div>
  );
};

export default Perfis;