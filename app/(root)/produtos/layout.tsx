'use client';

import { useParams } from 'next/navigation';
import { categorias } from "@/lib/data/categorias";
import Link from 'next/link';
import Image from 'next/image';

export default function LayoutProdutos({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const categoriaAtiva = params?.categoria;


  return (
    <main>
      <section className='lg:mt-1 h-30 md:h-50 w-full bg-[#e8b4b8] flex items-end py-10'>
      <h2 className='flex items-end w-full   h-15 lg:mt-6  px-10 lg:px-20 uppercase text-4xl font-bold text-[#fefefe] drop-shadow-md'>
        {categoriaAtiva ? categoriaAtiva : 'produtos'}
      </h2>
      </section>


      <nav className="mx-auto px-3 py-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6  pb-8">
          
          <div className="flex px-1 gap-3 overflow-hidden w-full">
            {categorias.map((cat, index) => {
              const isActive = categoriaAtiva === cat.slug;
              return (
                <Link 
                  key={index}
                  href={`/produtos/${cat.slug}`}
                  className={`   my-2 group flex flex-col items-center gap-3 transition-all duration-300 min-w-[60px] ${
                    isActive ? 'hidden' : 'hover:-translate-y-1'
                  }`}
                >
                  <div className={`relative p-1 rounded-xl  transition-all duration-300 ${
                    isActive ? 'ring-2 ring-rose-400 ring-offset-2' : 'ring-0'
                  }`}>
                    <Image 
                      src={cat.img} 
                      alt={cat.name} 
                      width={80} 
                      height={80} 
                      className='rounded-xl object-cover aspect-square shadow-sm'
                    />
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest text-center transition-colors ${
                    isActive 
                      ? 'hidden' 
                      : 'text-stone group-hover:text-stone'
                  }`}>
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-[10px] -order-1 md:order-1 px-1 uppercase tracking-[0.2em] text-stone font-light whitespace-nowrap">
            <Link href="/" className="hover:text-rose-400 transition-colors">home</Link>
            <span className="mx-2 opacity-50">/</span>
            <Link href="/produtos" className="hover:text-rose-400 transition-colors">produtos</Link>
            {categoriaAtiva && (
              <>
                <span className="mx-2 text-stone">/</span>
                <span className="text-rose-400 font-medium">{categoriaAtiva}</span>
              </>
            )}
          </div>
          
        </div>
      </nav>
      <section>
        {children}
      </section>
    </main>
  );
}