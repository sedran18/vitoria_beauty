"use client"

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { filtros } from "@/lib/utils";

const Filtro = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [filtro, setFiltro] = useState<string>('');
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const arrItems = Object.keys(filtros);
  const handleSelectChange = (value: string) => {
    setIsOpen(false)
    if (value !== '') {
      setFiltro(value);
    }
  }
  const handleFilter = (valor: string) => {
    if (valor === '') return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('filtro', valor);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-100 w-fit">
      <div className="relative w-35 group">
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 transition-colors duration-200">
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-400 transition-transform duration-300",
              isOpen ? "rotate-180 text-slate-900" : "group-hover:text-slate-600"
            )}
          />
        </div>

        <select
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onChange={(e) => handleSelectChange(e.target.value)}
          defaultValue=""
          className={cn(
            "w-full h-10 appearance-none rounded-lg border-none bg-transparent px-4 py-2 text-sm font-medium text-slate-700 outline-none cursor-pointer transition-all duration-200",
            "hover:bg-slate-50",
            "focus:ring-0" 
          )}
        >
          <option value="" disabled>Filtrar por</option>
          {arrItems.map((item, index) => (
            <option key={index} value={item.toLowerCase().replace(' ', '-')}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <Button 
        className="h-10 px-6 cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-all active:scale-95 flex gap-2 shadow-md shadow-zinc-200"
        onClick={() => handleFilter(filtro)}
      >
        <Search className="h-4 w-4" />
        Buscar
      </Button>
    </div>
  );
};

export default Filtro;