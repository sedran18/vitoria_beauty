'use client'

import { useState, useEffect } from "react";
import { Star, Loader2 } from "lucide-react";
import { saveRating, getRatingFromUser } from "@/lib/actions/ratings"; 
import { cn } from "@/lib/utils";

export default function RatingInput({ productId, userId}: { productId: string, userId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRating = async (value: number) => {
    setRating(value);
    setLoading(true);
    
    await saveRating({productId, value, userId});
    
    setLoading(false);
    alert("Obrigado pela sua avaliação!");
  };


  useEffect( () => {
    getRatingFromUser({productId,  userId}).then(valor => setRating(valor ?? 0))

  }, [productId, userId]);

  return (
    <div className="p-6 bg-white border-2 border-dashed border-gray-100 rounded-sm text-center space-y-4">
      <p className="text-sm font-bold text-gray-600 uppercase tracking-widest">O que você achou deste produto?</p>
      
      <div className="flex justify-center gap-2">
        {loading ? <Loader2 className="animate-spin text-[var(--brand-primary)]" /> : (
          [1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleRating(star)}
              className="transition-transform hover:scale-125"
            >
              <Star
                size={32}
                className={cn(
                  "transition-colors",
                  (hover || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                )}
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
}