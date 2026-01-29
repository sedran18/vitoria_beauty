'use client';

import { useState } from "react";
import { deleteUser } from "@/lib/actions/users"; 
import { Loader2 } from "lucide-react";

const RemoverForm = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    const confirmed = confirm("Tem certeza absoluta? Essa ação não pode ser desfeita.");
    if (!confirmed) return;

    setLoading(true);
    const result = await deleteUser(userId, formData);
    
    if (!result?.success) {
      alert(result?.error || "Senha incorreta");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input
        name="password"
        type="password"
        placeholder="Sua senha atual"
        required
        className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-red-400 outline-none"
      />
      
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer py-4 bg-red-600 text-white rounded-2xl font-bold uppercase text-xs hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : "Confirmar Exclusão"}
      </button>
    </form>
  );
};

export default RemoverForm;