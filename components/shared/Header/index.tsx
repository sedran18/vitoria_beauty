'use client';

import Logo from "@/components/shared/logo";
import Link from "next/link";
import Menu from "./menu";
import { ShoppingBag} from 'lucide-react';
import PromoHeader from "./promo_header";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import UserMenu from "./user/userMenu";

export default function Header() {
    const [isHero, setIsHero] = useState(true);

  useEffect(() => {
        const onScroll = () => {
        setIsHero(window.scrollY < 1);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header>
            <PromoHeader />
            <div
                className={
                    cn(
                        "text-[#1F1F1F] bg-white",
                        "lg:fixed lg:z-50",
                        "transition-all duration-800 ease",
                        "w-full h-17 lg:h-26 ",
                        "grid items-center justify-center justify-items-center",
                        "grid-cols-[1fr_1fr_4fr_1.5fr]",
                        "md:grid-cols-3 md:justify-items-stretch",
                        "md:px-[30px] lg:px-[50px]", 
                        isHero
                        ? ""
                        : "lg:h-20 lg:top-0"
                    )}
                >
                <Menu/>
                <SearchBar isMobile={true} />
                
                <Link href='/' className="flex text-center justify-center flex-col items-center 
                hover:scale-103 transition-all duration-800 ease">
                    <Logo/>
                </Link>

                <div className="h-full w-auto flex items-center justify-end gap-3 md:gap-8">
                    <SearchBar  isMobile={false}/>
                    <Link href={'/carrinho'}>
                        <ShoppingBag size={20}/>
                    </Link>
                    <UserMenu />
                </div>
            </div>
            <div className="lg:h-20 lg:bg-white"></div>
        </header>
   
    )
}