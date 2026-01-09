import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {

  return (
    <section className="relative w-full overflow-x-hidden bg-black/5">
      <div className="w-full relative">
        <Link href='/produtos' className="w-full block">
          <picture className="w-full block h-">
            <source media="(max-width: 500px)" srcSet='/hero/hero-mobile.png' />
            <img
              src='/hero/hero.png'
              alt='A skincare feita para todos'
              className="w-full h-auto block md:object-contain"
            />
          </picture>
        </Link>

        <Link href='/produtos'>
          <Button 
            variant='outline' 
            className="
              absolute left-1/2 w-auto 
              border-white text-white top-[70%] -translate-x-1/2 drop-shadow-lg
              transition-all duration-500 ease
              text-sm md:text-xl p-3  sm:p-4  md:p-4 lg:p-8
              h-7 sm:h-10
              bg-transparent cursor-pointer hover:bg-white/40
              hover:scale-102"
          >
            VER PRODUTOS
          </Button>
        </Link>
      </div>
    </section>
  );
}