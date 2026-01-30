import Stars from "@/components/ui/stars"; 
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";

interface RatingWithUser {
  id: string;
  value: number;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
}

const Ratings = ({ ratings, userId }: { ratings: RatingWithUser[], userId: string}) => {
  return (
    <div className="space-y-6 mt-8">
      {ratings && ratings.length > 0 ? (
        ratings.map((r) => (
          <div 
            key={r.id} 
            className="p-4 bg-white border  border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full
                    bg-[var(--brand-soft)] border-2 border-[var(--brand-primary)]
                    flex items-center justify-center 
                    overflow-hidden text-[var(--brand-secondary)] text-1xl
                    shadow-inner
                    ">
                    {
                      r.user?.image ? 
                        <Image
                          src={r.user?.image || "/placeholder-user.png"} 
                          alt={r.user?.name || "Usuário"}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />  
                      : r?.user ?  r.user?.name?.charAt(0).toUpperCase() 
                      : <User />
                    }
                    
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900 leading-none">
                      <Link href={r.user?.id === userId ? 
                      '/perfil'
                      : r.user?.id ?
                      `/perfil/${r.user?.id}` :
                      ''
                      } >
                        {r.user?.name || "Usuário excluído"}
                      </Link>
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-1">
                      {new Date(r.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50/50 w-full flex justify-center sm:w-auto sm:block px-3 py-1 rounded-xl border border-gray-100/50">
                  <Stars 
                    rating={r.value} 
                    size={20} 
                    cor2="#E5E7EB" 
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-sm text-gray-400 font-medium">
            Seja a primeira a avaliar este produto! ✨
          </p>
        </div>
      )}
    </div>
  );
};

export default Ratings;