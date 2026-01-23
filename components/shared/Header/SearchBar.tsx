'use client'

import { useState, useEffect, useRef } from "react";
import { searchProducts } from "@/lib/actions/products";
import Link from "next/link";
import { SearchIcon, X, Loader2, ArrowRight } from "lucide-react";
import { ProdutosType } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function SearchBar({ isMobile }: { isMobile: boolean }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Pick<ProdutosType, 'id' | 'name'>[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            const timeout = setTimeout(() => inputRef.current?.focus(), 100);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (query.length) {
                setLoading(true);
                try {
                    const data = await searchProducts(query);
                    setResults(data);
                } catch (error) {
                    console.error("Erro na busca:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300); 

        return () => clearTimeout(handler);
    }, [query]);

    return (
        <div className={cn( isMobile ? 'md:hidden ' : 'hidden md:inline ')}>
            <button 
                onClick={() => setOpen(true)}
                className="h-full inline-block cursor-pointer hidden"
                aria-label="Abrir busca"
            >
                <SearchIcon 
                    className={isMobile ? 'md:hidden ' : 'hidden md:inline '} 
                    size={20}
                />
            </button>

            {open && (
    <div className="fixed  inset-0 bg-white z-[100] p-6 ">
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between 
            border-b border-gray-300 pb-2 px-5 rounded-full shadow-md h-14 
            ">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Buscar..."
                    className="w-full h-full bg-transparent text-xl
                     outline-none font-light "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                className="rounded-full  flex shadow-md cursor-pointer p-2 items-center text-gray-400"
                onClick={() => { setOpen(false); setQuery(""); }}>
                    <X size={22}  />
                </button>
            </div>

            <div className="mt-6 bg-white">
                {loading && <p className="text-sm text-gray-400 italic">Buscando...</p>}

                {!loading && results.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {results.map((product) => (
                            <Link 
                                key={product.id}
                                href={`/detalhes/${product.id}`}
                                onClick={() => setOpen(false)}
                                className="py-2 text-gray-600 hover:text-black transition-colors border-b border-gray-50 last:border-0"
                            >
                                {product.name}
                            </Link>
                        ))}
                    </div>
                )}

                {!loading && query.length >= 1 && results.length === 0 && (
                    <p className="text-sm text-gray-400">Nenhum resultado.</p>
                )}
            </div>
        </div>
    </div>
)}
        </div>
    );
}