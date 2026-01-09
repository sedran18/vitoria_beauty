"use client";

import { useState } from "react";
import { Menu as Menubar, X } from "lucide-react";
import Logo from "@/components/shared/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='md:hidden'>
      <button onClick={() => setIsOpen(true)} className="p-2">
        <Menubar size={23} strokeWidth={1} />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-white p-5 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <div className="flex justify-between items-center mb-8 mt-6">
          <span className="font-bold text-lg"><Logo /></span>

          <button onClick={() => setIsOpen(false)}>
            <X size={23} strokeWidth={1} />
          </button>
        </div>

        <nav className={cn('flex flex-col mt-10 text-sm')}>
          <Link href='/' className="
            uppercase  
            text-gray-800
            border-b border-gray-200 py-6 px-2
          "
          onClick={() => setIsOpen(false)}>
            Início
          </Link>
          <Link href='/produtos' className="
            uppercase 
            text-gray-800 
            border-b border-gray-200 py-6 px-2
          "
          onClick={() => setIsOpen(false)}>
            Produtos
          </Link>
          <Link href='/' className="
            uppercase 
            text-gray-800
            border-b border-gray-200 py-6 px-2
          "
          onClick={() => setIsOpen(false)}>
            Kits
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;