import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from '@/auth';

export default async function LayoutConfiguracoes({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prefix = '/configuracoes';
  const secoes = ['Perfil', 'Conta'];

  return (
    <main className="flex -mb-10  flex-col lg:flex-row min-h-screen w-full bg-[var(--brand-soft)]">
      <section className="w-full pt-9 lg:w-72 flex flex-col border-b
       lg:border-b-0 lg:border-r border-gray-200/60 bg-white/80
         sticky top-0 lg:h-full  lg:min-h-screen z-40 ">
        
        <div className="hidden lg:block p-8 pb-6">
          <h2 className="text-md font-black uppercase text-[var(--brand-secondary)] tracking-[0.25em]">
            Configurações
          </h2>
        </div>
        <div className="flex lg:flex-col flex-1 justify-between p-3 lg:p-4">
          
          <nav className="flex lg:flex-col gap-1.5 items-center
           lg:items-stretch overflow-x-auto scrollbar-hide">
            {secoes.map(s => (
              <Link 
                key={s.toLowerCase()} 
                href={`${prefix}/${s.toLowerCase()}`}
                className="px-5 py-2.5 lg:px-4 lg:py-3 rounded-xl 
                transition-all text-sm font-bold 
                text-[var(--text-primary)]/70 hover:text-[var(--brand-secondary)]
                 hover:bg-[var(--brand-soft)] active:scale-95 whitespace-nowrap"
              >
                {s}
              </Link>
            ))}
          </nav>

          <div className="lg:mt-auto">
            <div className="hidden lg:block mb-4 border-t border-[var(--secondary-color)]/30 mx-2" />
            
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="lg:w-full"
            >
              <button 
                type="submit"
                className="flex items-center justify-center lg:justify-between p-3 lg:p-4 rounded-2xl 
                           bg-red-50 lg:bg-transparent hover:bg-red-100/50 text-red-400 
                           hover:text-red-600 transition-all duration-300 group w-full"
                title="Sair da conta"
              >
                <span className="hidden lg:inline text-[10px] font-black uppercase tracking-[0.15em]">
                  Sair da Conta
                </span>
                
                <LogOut 
                  size={18} 
                  className="lg:ml-2 opacity-60 group-hover:opacity-100 lg:group-hover:translate-x-1 transition-all" 
                />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="flex-1 pt-2  ">
        <div className="mx-auto mt-6 ">
          {children}
        </div>
      </section>
    </main>
  );
}