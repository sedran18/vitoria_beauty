import Hero from '@/components/home/hero';
import CategoryCarousel from '@/components/home/category-carousel';
import Destaques from '@/components/home/destaques';
import BrandExperience from '@/components/home/brandExperience';
import VideoPromocional from '@/components/home/videoPromocional';

export default function Home() {
  return (
    <main>
        <Hero />
        <CategoryCarousel />
        <BrandExperience />
        <Destaques />
        <VideoPromocional />
    </main>
  );
}
