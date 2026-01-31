'use client';
import { Camera, User, Lock, Sparkles, Eye, EyeOff, AlertCircle, Check} from "lucide-react";
import { handleUpdateUserProfile } from "@/lib/actions/users";
import { useState, useEffect} from "react";
import { type UserMenuProps } from "@/lib/types";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";

const UpdateProfileForm = ({user}: UserMenuProps) => {
    const [formData, setFormData] = useState({
        image: null as File | null,
        password1: '',
        password2: '',
        name: user?.name|| ''
    });
    const [isPwd1, setIsPwd1]  = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState<string | null>();
    const [loading, setIsLoading] = useState(false);
    const [success,setSuccess] =  useState(false);
    const { data: session, update } = useSession();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (formData.password1) {
            if (formData.password1.length < 8) {
                setError('A nova senha deve ter no mínimo 8 caracteres');
                setIsLoading(false);
                return;
            } 
            if (formData.password1 !== formData.password2) {
                setError('As senhas não coincidem');
                setIsLoading(false);
                return;
            }
        }

        try {
            const data = new FormData();
            data.append("name", formData.name);
            if (formData.image) data.append("avatar", formData.image);
            data.append("password", formData.password1);
            data.append("confirmPassword", formData.password2);

            const success = await handleUpdateUserProfile(data, user?.id ?? '');
            
            if (success) {
                await update({
                  user: {
                    name: formData.name,
                    image: preview ?? session?.user?.image,
                  }
                });

                
                setSuccess(true);
                setTimeout(() => {
                window.location.href = '/configuracoes/perfil';

                }, 3000)
            } else {
                setError('Não foi possível atualizar o perfil. Tente novamente.');
            }
        } catch(err) {
            setError('Ocorreu um erro ao processar sua solicitação.');
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect (() => {
      if (!formData.image) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(formData.image);
        setPreview(url);
        
        return () => URL.revokeObjectURL(url);
    }, [formData.image]);


  return (
   <form className="max-w-2xl  mx-auto overflow-y-auto space-y-12 pb-20 px-3 " onSubmit={handleSubmit}>
      <header className="space-y-2">
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
          Meu Perfil
        </h1>
        <p className="text-sm text-[var(--brand-secondary)] font-medium">
          Gerencie suas informações de acesso e identidade na Vitoria Beauty.
        </p>
      </header>

        {error && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 shadow-sm">
              <AlertCircle className="size-5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">Ops! Algo deu errado</p>
                <p className="text-sm font-medium opacity-90">{error}</p>
              </div>
              <button 
                onClick={() => setError('')} 
                className="text-red-400 hover:text-red-600 transition-colors p-1"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 shadow-sm">
              <div className="bg-emerald-500 rounded-full p-1 shrink-0">
                <Check className="size-3 text-white stroke-[4px]" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">
                  Perfil Atualizado
                </p>
                <p className="text-sm font-medium opacity-90">
                  Suas alterações foram salvas com sucesso!
                </p>
              </div>
              <button 
                onClick={() => setSuccess(false)} 
                className="text-emerald-400 hover:text-emerald-600 transition-colors p-1"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
          </div>
        )}

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[var(--brand-primary)]/30 pb-2">
          <User size={18} className="text-[var(--brand-secondary)]" />
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-secondary)]">
            Identidade
          </h2>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="avatar-upload" className="relative group cursor-pointer">
                
                <input 
                type="file" 
                id="avatar-upload"
                name="avatar" 
                accept="image/png,image/jpeg,image/jpg,image/webp"
                multiple={false}
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];

                  if (!file) {
                    setError('Escolha alguma imagem para trocar foto de perfil')
                    return;
                  }

                  setFormData(prev => ({...prev, image: file}));
                }}
                />

                <div className="w-28 h-28 rounded-full bg-[var(--brand-soft)] border-2
                 border-[var(--brand-primary)] 
                 relative
                 flex items-center justify-center overflow-hidden 
                 transition-transform group-hover:scale-105 shadow-sm">
                {preview || user && user?.image ? (
                    <Image 
                    src={preview || user?.image || ''} 
                    fill 
                    className=" h-full w-full object-cover" alt="Avatar" />
                ) : (
                    <User size={48} className="text-[var(--brand-secondary)] opacity-30" />
                )}
                </div>

                <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
                </div>
            </label>

            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Toque para alterar foto
            </p>
        </div>

          <div className="space-y-2 group">
  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1
    group-focus-within:text-[var(--brand-secondary)] transition-colors">
    Novo nome de Exibição
  </label>

  <input 
    type="text"
    placeholder="Seu nome completo"
    value={formData.name}
    onChange={e =>
      setFormData(prev => ({ ...prev, name: e.target.value }))
    }
    className="
      w-full px-6 py-4 rounded-2xl text-sm font-semibold
      bg-[var(--brand-soft)]/30 text-[var(--text-primary)]
      placeholder:text-gray-400
      border border-transparent
      outline-none
      transition-all duration-200

      focus:bg-white
      focus:border-[var(--brand-secondary)]
      focus:ring-4 focus:ring-[var(--brand-secondary)]/10
    "
  />
</div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[var(--brand-primary)]/30 pb-2">
          <Lock size={18} className="text-[var(--brand-secondary)]" />
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-secondary)]">
            Segurança
          </h2>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Nova Senha
              </label>
              <div className="relative">
                <input 
                    type={isPwd1 ?'text' : 'password'} 
                    placeholder="Min. 8 caracteres"
                    value={formData.password1}
                    onChange={e =>
                        setFormData(prev => ({ ...prev, password1: e.target.value }))
                    }
                    className="w-full px-6 py-4 bg-[var(--brand-soft)]/30 border border-transparent rounded-2xl focus:bg-white focus:border-[var(--brand-secondary)] transition-all text-sm outline-none"
                />
                {
                    isPwd1 ? <EyeOff 
                        size={20} 
                        onClick={() => setIsPwd1(false)} 
                        className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4"/> 
                    : 
                    <Eye  
                        size={20} 
                        onClick={() => setIsPwd1(true)} 
                        className="  cursor-pointer absolute top-1/2 -translate-y-1/2 right-4"/>
                }
              </div>
            </div>
            <div className="space-y-2 ">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Confirmar Senha
              </label>
              <div className="relative">
                <input 
                    type={'password'} 
                    placeholder="Repita a nova senha"
                    value={formData.password2}
                    onChange={e =>
                        setFormData(prev => ({ ...prev, password2: e.target.value }))
                    }
                    className="w-full px-6 py-4 bg-[var(--brand-soft)]/30 border border-transparent rounded-2xl focus:bg-white focus:border-[var(--brand-secondary)] transition-all text-sm outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-6">
        <button 
        className="cursor-pointer w-full py-5 bg-[var(--brand-secondary)]
          text-white rounded-3xl font-black text-xs
          uppercase tracking-[0.3em] hover:bg-[var(--accent)] 
          hover:shadow-xl hover:shadow-[var(--brand-primary)]/50 
          transition-all active:scale-[0.98] flex items-center 
          justify-center gap-3">
            {loading ? (
              <>
                <Spinner className="size-5 border-white/30 border-t-white" />
                <span>Salvando Alterações...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} className="group-hover:animate-pulse" />
                <span>Atualizar Perfil</span>
              </>
            )}
        </button>
      </div>
    </form>
  )
}

export default UpdateProfileForm
