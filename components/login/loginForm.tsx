'use client'

import { useState } from "react";
import Link from "next/link";
import { Mail, User, Loader2} from "lucide-react";
import Logo from "../shared/logo";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="w-full max-w-md mx-auto p-10 bg-white shadow-2xl rounded-xl border border-gray-100">
            <Link href={'/'} className="flex hover:scale-105 animation-all ease duration-300 cursor-pointer justify-center mb-8 transform ">
                <Logo />
            </Link>


            

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-2 ml-1">
                        Seu Nome
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C7A39D] transition-colors" size={20} />
                        <input 
                            type="text" 
                            required
                            placeholder="Ex: Maria Silva"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#C7A39D] focus:ring-4 focus:ring-[#C7A39D]/10 transition-all text-gray-900 font-medium"
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-2 ml-1">
                        E-mail de Acesso
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C7A39D] transition-colors" size={20} />
                        <input 
                            type="email" 
                            required
                            placeholder="seu@email.com"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#C7A39D] focus:ring-4 focus:ring-[#C7A39D]/10 transition-all text-gray-900 font-medium"
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer bg-[var(--brand-secondary)] 
                    hover:bg-[var(--accent)] text-white
                     font-bold py-4 rounded-2xl transition-all duration-300
                      flex items-center justify-center gap-3 shadow-xl
                       shadow-[#B08982]/30 hover:scale-105 mt-4"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={22} />
                    ) : (
                        <>
                            <span className="tracking-wide">LOGIN</span>
                        </>
                    )}
                </button>
            </form>

            <div className="mt-12 text-center border-t border-gray-50 pt-8">
                <p className="text-gray-600 font-medium">
                    Novo por aqui?{" "}
                    <Link 
                        href="/cadastro" 
                        className="text-[#C7A39D] font-bold hover:text-[#B08982] underline decoration-2 underline-offset-4 transition-colors"
                    >
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
}