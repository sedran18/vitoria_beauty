'use client';

import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { createAddress } from "@/lib/actions/address"; 
import { useRouter } from "next/navigation"; 

const EnderecoForm = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const handleCEPBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
          zipCode: cep
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    } finally {
      setCepLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData(e.currentTarget);
    const result = await createAddress(userId, data);

    if (result.success) {
      router.push("/configuracoes/conta"); 
    } else {
      alert(result.error || "Erro ao salvar endereço");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[var(--brand-soft)] rounded-lg text-[var(--brand-secondary)]">
          <MapPin size={20} />
        </div>
        <h2 className="text-lg font-black text-[var(--text-primary)]">Novo Endereço</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CEP */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">CEP</label>
          <div className="relative">
            <input
              name="zipCode" // IMPORTANTE
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
              placeholder="00000-000"
              className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--brand-primary)] outline-none transition-all text-sm"
              onBlur={handleCEPBlur}
              required
            />
            {cepLoading && <Loader2 className="absolute right-4 top-3 animate-spin text-gray-400" size={18} />}
          </div>
        </div>

        {/* Rua */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Rua / Logradouro</label>
          <input
            name="street" // IMPORTANTE
            type="text"
            value={formData.street}
            onChange={(e) => setFormData({...formData, street: e.target.value})}
            className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--brand-primary)] outline-none transition-all text-sm"
            required
          />
        </div>

        {/* Número */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Número</label>
          <input
            name="number" // IMPORTANTE
            type="text"
            required
            className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--brand-primary)] outline-none transition-all text-sm"
          />
        </div>

        {/* Complemento */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Complemento</label>
          <input
            name="complement" // IMPORTANTE
            type="text"
            placeholder="Ex: Apto 12"
            className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--brand-primary)] outline-none transition-all text-sm"
          />
        </div>

        {/* Bairro */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Bairro</label>
          <input
            name="neighborhood" // IMPORTANTE
            type="text"
            value={formData.neighborhood}
            onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
            className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-sm outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Cidade</label>
                <input
                    name="city" // IMPORTANTE
                    type="text"
                    readOnly
                    value={formData.city}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-sm outline-none"
                    required
                />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">UF</label>
                <input
                    name="state" 
                    type="text"
                    readOnly
                    value={formData.state}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-sm outline-none"
                    required
                />
            </div>
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input 
            name="isDefault" 
            type="checkbox" 
            className="w-5 h-5 rounded-lg border-gray-200 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
        />
        <span className="text-xs font-bold text-gray-500 group-hover:text-[var(--brand-secondary)] transition-colors">
            Definir como endereço principal para entrega
        </span>
      </label>

   <button
        type="submit"
        disabled={loading || cepLoading}
        className={`
          w-full py-4 rounded-2xl cursor-pointer font-black uppercase tracking-widest text-xs 
          flex justify-center items-center gap-2 transition-all shadow-lg
          ${loading || cepLoading 
            ? "bg-gray cursor-not-allowed opacity-70 shadow-none" 
            : "bg-[var(--brand-secondary)] text-white hover:bg-[var(--accent)] hover:scale-[1.01] active:scale-95 shadow-[var(--brand-primary)]/20"
          }
        `}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Salvando...
          </>
        ) : (
          "Salvar Endereço"
        )}
      </button>
    </form>
  );
};

export default EnderecoForm;