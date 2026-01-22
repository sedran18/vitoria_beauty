'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';

const VideoPromocional = () => {
  const [mute, setMute] = useState(true);

  return (
    <section className="mt-10 w-full py-20 bg-[#FDF6F0] text-[#2D2D2D]">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-light block mb-4">
            Vitoria Beauty
          </span>
          <h2 className="tracking-wide text-2xl md:text-3xl font-extralight uppercase text-stone-800">
            A essência do cuidado.
          </h2>
        </div>

        <div className="relative group overflow-hidden bg-stone-100 shadow-sm border border-stone-200/50">
          <video 
            className="w-full h-full aspect-video object-cover cursor-pointer transition-transform duration-700 group-hover:scale-[1.01]" 
            src="/videos/divulgacao-1.mp4" 
            autoPlay 
            loop 
            muted={mute}
            playsInline
            onClick={() => setMute(!mute)}
          >
            Seu navegador não suporta vídeos.
          </video>
            <div 
              onClick={() => setMute(!mute)}
              className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:bg-white/40"
            >
              {mute ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </div>
          <button 
            onClick={() => setMute(!mute)}
            className="absolute bottom-6 right-6 p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20"
            aria-label={mute ? "Ativar som" : "Mudar para mudo"}
          >
            {mute ? <VolumeX size={18} strokeWidth={1.5} /> : <Volume2 size={18} strokeWidth={1.5} />}
          </button>
        </div>

        <div className="mt-14 text-center">
          <Link href='/produtos'
            className=" cursor-pointer inline-block border-b border-stone-800 pb-1 text-sm font-medium tracking-wide uppercase hover:text-rose-400 hover:border-rose-400 transition-all duration-300"
          >
            Descobrir Coleção
          </Link>
        </div>

      </div>
    </section>
  );
};

export default VideoPromocional;