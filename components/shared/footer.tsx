'use client';

import Link from "next/link";
import { APP_NAME } from '@/lib/constants';
import { 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import Logo from "./logo";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-primary)] pt-16 pb-8 border-t border-white/40 mt-10 shadow-xl">
      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="mb-6 group">
              <Logo />
            </Link>

            <p className="text-sm text-gray-600 leading-relaxed max-w-[250px]">
              Sua beleza realçada com texturas leves e cuidado diário. A essência da skincare feita para você.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-[#1F1F1F] uppercase text-xs tracking-[0.2em] mb-6">
              Menu
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/produtos" className="hover:text-black transition-colors">Produtos</Link></li>
              <li><Link href="/kits" className="hover:text-black transition-colors">Kits</Link></li>
              <li><Link href="/sobre" className="hover:text-black transition-colors">Nossa História</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-[#1F1F1F] uppercase text-xs tracking-[0.2em] mb-6">
              Atendimento
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-pink-400" />
                <span>vittoria.beauty@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-pink-400" />
                <span>(77) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-pink-400" />
                <span>Xique-Xique, BA - Brasil</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-[#1F1F1F] uppercase text-xs tracking-[0.2em] mb-6">
              Siga-nos
            </h3>
            <div className="flex gap-5 mb-8 text-gray-600">
              <Link href="#" className="hover:text-pink-400 transition-colors"><InstagramIcon /></Link>
              <Link href="#" className="hover:text-pink-400 transition-colors"><FacebookIcon /></Link>
              <Link href="#" className="hover:text-pink-400 transition-colors"><YouTubeIcon/></Link>
            </div>

          </div>

        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 opacity-40 grayscale grayscale-100">
            <div className="h-4 w-6 bg-gray-400 rounded-sm" />
            <div className="h-4 w-6 bg-gray-400 rounded-sm" />
            <div className="h-4 w-6 bg-gray-400 rounded-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}