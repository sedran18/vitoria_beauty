'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { categorias } from "@/lib/data/categorias";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi, 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function CategoryCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateStats = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    updateStats();

    api.on("select", updateStats);
    api.on("reInit", updateStats);

    return () => {
      api.off("select", updateStats);
      api.off("reInit", updateStats);
    };
}, [api]);

  return (
    <section className="mt-10 md:mt-16 w-full px-4 lg:px-10">
          <div className="mb-10 text-center">
        <h2 className="text-xl uppercase md:text-3xl text-[var(--brand-secondary)] font-semibold ">
          Categorias
        </h2>
        <span className="mt-2 block text-xs md:text-sm text-gray-500 uppercase tracking-widest">
          Encontre o que combina com você
        </span>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {categorias.map((cat) => (
            <CarouselItem
              key={cat.slug}
              className="pl-3 basis-[45%]  sm:basis-[40%] md:basis-[45%] lg:basis-[30%]"
            >
              <Link
                href={`/${cat.slug}`}
                className="group relative flex  aspect-square items-center justify-center overflow-hidden rounded-2xl shadow-sm"
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                <div className="relative z-10 flex flex-col items-center px-4 text-center">
                  <span className={cn(
                    "text-[15px] md:text-2xl font-bold uppercase text-white transition-all duration-300 tracking-wider",
                    "group-hover:text-[var(--brand-secondary)] group-hover:scale-105"
                  )}>
                    {cat.name}
                  </span>
                  <div className="mt-2 h-[2px] w-0 bg-[var(--brand-secondary)] transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 transition-all cursor-pointer duration-300 rounded-full",
                current === index 
                  ? "w-3 bg-[var(--accent)]" 
                  : "w-3 bg-gray-500 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}