'use client'
import {useEffect, useState } from "react";
import { DISCOUNT_FOR_PIX } from "@/lib/constants";
import { interWithLoop, formatBRL } from "@/lib/utils";
import { DISCOUNT_IN_FIRST_PURCHASE } from "@/lib/constants";

const PROMO_DATA = [
  {
    prefix: "💖 Compre no",
    highlight: "pix",
    suffix: "e ganhe",
    badge: `${DISCOUNT_FOR_PIX}% OFF 💖`
  },
  {
    prefix: "💖 Economize",
    highlight: formatBRL(Number(DISCOUNT_IN_FIRST_PURCHASE)),
    suffix: "na primeira compra! 💖",
    badge: ""
  }
];

export default function PromoHeader() {
  const [current, setCurrent] = useState(PROMO_DATA[0]);

  useEffect(() => {
    const stop = interWithLoop(PROMO_DATA, 3000, setCurrent)
    return () => stop();
  }, []);

  
  return (
    <div className="w-full h-[40px] md:h-[50px] bg-[#fbc3cd54] flex justify-center items-center text-[11px] uppercase overflow-hidden">
      <p className="">
        {current.prefix} &nbsp;
        <strong>{current.highlight}</strong> &nbsp;
        {current.suffix} &nbsp;
        {current.badge && <strong>{current.badge}</strong>}
      </p>
    </div>
  );
}