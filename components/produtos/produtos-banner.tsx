import Image from "next/image";

interface BannerProps {
  name: string;
  cor: string;
  img2: string;
}

const ProdutosBanner = ({ name, cor, img2 }: BannerProps) => {
  return (
    <section 
      className="relative w-full h-1/3 lg:mt-6 flex overflow-hidden"
      style={{ backgroundColor: cor }}
    >
      <div className="max-w-7xl mx-auto px-10 w-full flex justify-between items-center relative z-10">
        <h2 className="uppercase text-4xl md:text-5xl font-extralight tracking-tighter text-stone-800 lowercase first-letter:uppercase">
          {name}
        </h2>

        {img2 && (
          <div className="relative h-[240px] w-[240px]">
            <Image 
              src={img2} 
              alt={name} 
              fill 
              priority
              className="object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProdutosBanner;