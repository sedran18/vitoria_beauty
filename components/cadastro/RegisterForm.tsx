'use client'

import { useState } from "react";
import Link from "next/link";
import { Mail, Eye, EyeOff, User, Lock, Loader2, UserPlus, AlertCircle } from "lucide-react";
import Logo from "../shared/logo";
import { registerAction } from "@/lib/actions/register";
import { useRouter } from "next/navigation";
import SuccessScreen from "./SuccessScreen";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [verSenha1, setVerSenha1] = useState(false);
    const [verSenha2, setVerSenha2] = useState(false);
    const router = useRouter()
    const [error, setError] = useState("");
    const [usuarioCriado, setUsuarioCriado] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        setLoading(true);
        try {
            const res = await registerAction(formData);

            if (!res.sucess) { 
                throw new Error(res.error || "Erro ao registrar");
            }

            setUsuarioCriado(true);

                const result = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false, 
                });

                if (result?.error) {
                    console.error("Erro no login automático:", result.error);
                }

            setTimeout(() => {
                router.push("/");
                router.refresh(); 
            }, 4000);

        } catch (err) {
            setLoading(false); 
            setError(err instanceof Error ? err.message : "Erro inesperado");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (usuarioCriado) return (<SuccessScreen name={formData.name}/>)

    return (
        <div className="w-full max-w-md mx-auto p-10 bg-white shadow-2xl rounded-xl border border-gray-100">
            <Link href={'/'} className="flex hover:scale-105 animation-all ease duration-300 cursor-pointer justify-center mb-8 transform ">
                <Logo />
            </Link>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium animate-shake">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-2 ml-1">Nome Completo</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C7A39D] transition-colors" size={20} />
                        <input 
                            name="name"
                            type="text" 
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: Maria Silva"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#C7A39D] focus:ring-4 focus:ring-[#C7A39D]/10 transition-all text-gray-900 font-medium"
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-2 ml-1">E-mail</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C7A39D] transition-colors" size={20} />
                        <input 
                            name="email"
                            type="email" 
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#C7A39D] focus:ring-4 focus:ring-[#C7A39D]/10 transition-all text-gray-900 font-medium"
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-2 ml-1">Senha</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C7A39D] transition-colors" size={20} />
                        <input 
                            name="password"
                            type={verSenha1 ? 'text' : 'password'} 
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#C7A39D] focus:ring-4 focus:ring-[#C7A39D]/10 transition-all text-gray-900 font-medium"
                        />
                        {
                            verSenha1 ? 
                            <EyeOff 
                                size={20} 
                                onClick={() => setVerSenha1(false)} 
                                className="cursor-pointer absolute right-4 top-1/2 
                                -translate-y-1/2 text-gray-400"
                            /> 
                            : 
                            <Eye 
                                size={20} 
                                onClick={() => setVerSenha1(true)} 
                                className="cursor-pointer absolute right-4 top-1/2
                                -translate-y-1/2 text-gray-400"
                            />
                        }
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-2 ml-1">Confirmar Senha</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C7A39D] transition-colors" size={20} />
                        <input 
                            name="confirmPassword"
                            type={verSenha2 ? 'text' : 'password'} 
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repita sua senha"
                            autoComplete="new-password"
                            className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl outline-none transition-all text-gray-900 font-medium ${
                                error ? 'border-red-200 focus:border-red-400' : 'border-gray-100 focus:border-[#C7A39D] focus:ring-4 focus:ring-[#C7A39D]/10'
                            }`}
                        />
                        {
                            verSenha2 ? 
                            <EyeOff 
                                size={20} 
                                onClick={() => setVerSenha2(false)} 
                                className="cursor-pointer absolute right-4 top-1/2 
                                -translate-y-1/2 text-gray-400"
                            /> 
                            : 
                            <Eye 
                                size={20} 
                                onClick={() => setVerSenha2(true)} 
                                className="cursor-pointer absolute right-4 top-1/2
                                -translate-y-1/2 text-gray-400"
                            />
                        }
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer bg-[var(--brand-secondary)] hover:bg-[var(--accent)] text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-[#B08982]/30 hover:scale-[1.02] mt-6"
                >
                    {loading ? <Loader2 className="animate-spin" size={22} /> : (
                        <>
                            <UserPlus size={20} />
                            <span className="tracking-wide text-sm text-white">CRIAR MINHA CONTA</span>
                        </>
                    )}
                </button>
            </form>

            <div className="mt-3 text-center border-t border-gray-50 pt-8">
                <p className="text-gray-600 font-medium">
                    Já possui uma conta?{" "}
                    <Link href="/login" className="text-[#C7A39D] font-bold hover:text-[#B08982] underline decoration-2 underline-offset-4 transition-colors">
                        Fazer Login
                    </Link>
                </p>
            </div>
        </div>
    );
}