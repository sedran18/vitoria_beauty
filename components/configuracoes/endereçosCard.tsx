'use client';

import { Trash2,  Home } from "lucide-react";
import { Address } from "@prisma/client";
import { deleteAddress } from "@/lib/actions/address";

const EndereçosCard = ({address, userId}: {
    address: Address
    userId: string
}) => {
  return (
<div className="bg-white w-full p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[var(--brand-primary)] transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--brand-soft)] rounded-2xl text-[var(--brand-secondary)]">
                <Home size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-[var(--text-primary)] text-sm">{address.isDefault &&'Principal •'} {address.complement}</p>
                <p className="text-xs text-gray-400">{address.street}, {address.number} • {address.city}, {address.state}</p>
              </div>
            </div>
            <button 
            onClick={() => deleteAddress({addressId: address.id, userId})} 
            className="p-2 cursor-pointer text-gray-300 hover:text-red-400 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
  )
}

export default EndereçosCard
