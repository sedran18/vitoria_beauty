'use client';

import { cn } from "@/lib/utils";

export default function BrandExperience() {
  return (
    <section className="bg-[#fdf2f2] py-16 px-3 md:px-9 lg:px-24 mt-10">
      <div className="mx-auto ">
        <div className={cn(
          "flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16",
          "transition-all duration-700 ease-in-out"
        )}>
          
          <div className="w-full lg:w-1/2 flex flex-col items-center 
          lg:items-start text-center lg:text-left ">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p- w-full md:p-12 shadow-sm border border-white/40">

              <h3 className={cn(
                "text-3xl md:text-3xl font-semibold mb-6 text-[#1F1F1F] uppercase"
              )}>
                Cuidado que acompanha você
              </h3>

              <ul className="space-y-4 text-sm sm:text-xl lg:text-base text-gray-600 mb-8">
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-pink-300">✨</span> Texturas leves e confortáveis
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-pink-300">🌸</span> Sensação de cuidado todos os dias
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-pink-300">💫</span> Beleza que realça sua essência
                </li>
              </ul>

              <button className="group my-4 w-full flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#1F1F1F]">
                Conhecer a coleção
                <div className="h-[1px] w-8 bg-black transition-all group-hover:w-12" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 max-w-[580px]">
            <div className="rounded-full relative aspect-square overflow-hidden shadow-2xl">
              <video
                src="/videos/video-home.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}