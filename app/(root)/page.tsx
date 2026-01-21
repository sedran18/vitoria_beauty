import Hero from '@/components/home/hero';
import CategoryCarousel from '@/components/home/category-carousel';
import Destaques from '@/components/home/destaques';
import BrandExperience from '@/components/home/brandExperience';
import VideoPromocional from '@/components/home/videoPromocional';
import { getBySalesCount} from '@/lib/actions/products';

export default async function Home() {
  const produtosDestaques = await getBySalesCount(8);

  return (
    <main>
        <Hero />
        <CategoryCarousel />
        <BrandExperience />
        <Destaques produtos={produtosDestaques.data ?? []}/>
        <VideoPromocional />
    </main>
  );
}
