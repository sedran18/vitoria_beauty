import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { countCartItems } from "@/lib/actions/cart";

export default async function CartCounter() {
  const count = await countCartItems();

  return (
    <Link href="/carrinho" className="relative group p-2">
      <ShoppingBag size={22} className="group-hover:text-pink-600 transition-colors" />
      
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}