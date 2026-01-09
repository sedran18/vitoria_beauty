import MobileMenu from "./mobile_menu";
import Link from "next/link";

export default function Menu() {
    return (
        <>
            <nav 
            className="
                hidden h-full gap-6 md:flex 
                items-center justify-start  
            " 
            aria-label="Navegação principal">
                 <Link
          href="/"
          className="uppercase text-sm
                     text-gray-800 transition-colors
                     hover:text-[var(--accent)]"
        >
          Início
        </Link>

        <Link
          href="/produtos"
          className="uppercase text-sm 
                     text-gray-800 transition-colors
                     hover:text-[var(--accent)]"
        >
          Produtos
        </Link>

        <Link
          href="/kits"
          className="uppercase text-sm  
                     text-grey-800 transition-colors
                     hover:text-[var(--accent)]
                     "
        >
          Kits
        </Link>
      </nav>

            <MobileMenu />
        </>
    )
}

//Ainda existe o MobileMenu no DOM nas larguras maiores, mas o impacto é bem irrelevante