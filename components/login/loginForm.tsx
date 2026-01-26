'use client'

import { useState} from "react";
import Link from "next/link";
import { Mail, Eye, Loader2, EyeOff, Lock, AlertCircle} from "lucide-react";
import Logo from "../shared/logo";
import { signIn } from "next-auth/react";


export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [typeSenha, setTypeSenha] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password.length < 8) {
            setError('Senha precisa ter no mínimo 8 caracteres');
            return;
        }

        try {
            await signIn('credentials', {                
                email: formData.email,
                password: formData.password,
                redirect: true,
                callbackUrl: "/",} );
        }catch (err) {
            setError('Erro ao fazer login');
            console.log(err)

        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-10 bg-white shadow-2xl rounded-xl border border-gray-100">
            <Link href={'/'} className="flex hover:scale-105 animation-all ease duration-300 cursor-pointer justify-center mb-8 transform ">
                <Logo />
            </Link>

            {error && (
                    <div className="flex items-center my-10 gap-2 bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium animate-shake">
                        <AlertCircle size={18} />
                        {error}
                    </div>
            )}
            

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-2 ml-1">
                        E-mail de Acesso
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C7A39D] transition-colors" size={20} />
                        <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={e => setFormData({...formData, email : e.target.value})}
                            placeholder="seu@email.com"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#C7A39D] focus:ring-4 focus:ring-[#C7A39D]/10 transition-all text-gray-900 font-medium"
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-2 ml-1">
                        Senha
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C7A39D] transition-colors" size={20} />
                        <input 
                            type={typeSenha ? 'text' : 'password'}
                            required
                            value={formData.password}
                            onChange={e => setFormData({...formData, password : e.target.value})}
                            placeholder="********"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#C7A39D] focus:ring-4 focus:ring-[#C7A39D]/10 transition-all text-gray-900 font-medium"
                        />
                        {typeSenha ? 
                        <EyeOff onClick={() => setTypeSenha(false)} className=" cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C7A39D] transition-colors" size={20} />
                        : 
                        <Eye 
                        onClick={() => setTypeSenha(true)}
                        className=" cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 " size={20} />
                         }

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