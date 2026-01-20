import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

interface SeedProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  ratingAvg: number;
  ratingCount: number;
}

interface SeedImage {
  url: string;
  alt: string;
}

const produtos: SeedProduct[] = [
    {
        name: "Ageless Radiance Serum",
        description: "Sérum facial rejuvenescedor de alta performance, formulado com Ácido Hialurônico e Vitamina C. Nutre profundamente e revitaliza a pele, proporcionando um brilho radiante e combatendo sinais de envelhecimento. Fabricado no Brasil.",
        price: 189.90, 
        category: "skincare",
        stock: 150,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Éclat Nutritif - Deep Repair Hair Mask",
        description: "Máscara de reparação profunda que restaura e fortalece os fios. Enriquecida com Óleo de Argan e Queratina para um tratamento intensivo. Conteúdo: 250ml.",
        price: 124.90,
        category: "cabelo",
        stock: 85,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Ligne Parfaite - Liquid Eyeliner",
        description: "Delineador líquido preto de longa duração com ponta de precisão para traços perfeitos e definidos. Resistente a borrões.",
        price: 59.90,
        category: "maquiagem",
        stock: 300,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Teint Parfait - Powder Foundation",
        description: "Base em pó com acabamento mate de longa duração. Proporciona cobertura uniforme e controle de oleosidade ao longo do dia. Conteúdo: 10g.",
        price: 139.90,
        category: "maquiagem",
        stock: 120,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Rouge Éclat - Hydrating Satin Lipstick",
        description: "Batom acetinado hidratante com cor intensa e textura macia. Mantém os lábios condicionados com um acabamento sofisticado. Conteúdo: 4g.",
        price: 72.00,
        category: "maquiagem",
        stock: 210,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Cils Magnifique - Lash Volumizing Mascara",
        description: "Máscara de cílios volumizadora com fórmula de longa duração e à prova de borrões. Define e destaca o olhar. Conteúdo: 8g.",
        price: 89.90,
        category: "maquiagem",
        stock: 180,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Rose Désirée - Eau de Parfum",
        description: "Fragrância floral e sensual marcante. Um perfume elegante para ocasiões especiais em um frasco luxuoso de 50ml.",
        price: 249.00,
        category: "perfumes",
        stock: 0,
        ratingAvg: 0,
        ratingCount: 88,
    },
    {
        name: "Base Lisse - Pore-Minimizing & Hydrating Primer",
        description: "Primer hidratante que minimiza a aparência dos poros e prepara a pele para uma maquiagem impecável e duradoura. Conteúdo: 30ml.",
        price: 115.00,
        category: "maquiagem",
        stock: 140,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Joie Rosée - Powder Blush",
        description: "Blush em pó com acabamento radiante e textura construível. Confere um ar saudável e iluminado às maçãs do rosto. Conteúdo: 7g.",
        price: 94.90,
        category: "maquiagem",
        stock: 95,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Palette de Rêves - Eyeshadow Palette",
        description: "Paleta de sombras versátil com 5 cores altamente pigmentadas, variando entre acabamentos mate e cintilantes. Ideal para criar looks desde o dia a dia até eventos sofisticados. Acompanha aplicadores duplos.",
        price: 159.00,
        category: "maquiagem",
        stock: 60,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Kit Olhar de Sonhos",
        description: "Combine a Palette de Rêves com a Lash Volumizing Mascara para um olhar marcante. Cores pigmentadas e cílios com volume extremo em um único kit exclusivo.",
        price: 215.00,
        category: "kits",
        stock: 25,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Kit Noir Noite de Gala",
        description: "Prepare-se para ocasiões especiais com este conjunto luxuoso. Inclui o perfume Noir Éclat (Eau de Parfum), uma Palette de Rêves com tons intensos e um Batom Rouge Éclat em tom vinho sofisticado.",
        price: 399.90,
        category: "kits",
        stock: 15,
        ratingAvg: 0,
        ratingCount: 0,
    },
    {
        name: "Kit Éclat Capilaire Reparação Total",
        description: "Tratamento completo de salão em casa. Este kit de luxo contém Shampoo, Condicionador, Leave-in (Après-Shampooing) e a Masque Réparateur Intense. Todos os itens são enriquecidos com Óleo de Argan e Queratina para reconstrução profunda dos fios.",
        price: 385.00,
        category: "kits",
        stock: 20,
        ratingAvg: 0,
        ratingCount: 0,
    }
];

const produtosImgs: SeedImage[] = [
     {
        url:'/produtosImages/angeless.webp',
        alt: "Ageless Radiance Serum" 
    },
    {
        url:'/produtosImages/enclat.webp',
        alt: "Éclat Nutritif - Deep Repair Hair Mask"
    },
    {
        url:'/produtosImages/parfaite.webp',
        alt: "Ligne Parfaite - Liquid Eyeliner"
    },
    {
        url:'/produtosImages/teint.webp',
        alt: "Teint Parfait - Powder Foundation" 
    },
    {
        url:'/produtosImages/rouge.webp',
        alt: "Rouge Éclat - Hydrating Satin Lipstick"
    },
    {
        url:'/produtosImages/lash.webp',
        alt: "Cils Magnifique - Lash Volumizing Mascara"
    },
    {
        url:'/produtosImages/rose_desire.webp',
        alt: "Rose Désirée - Eau de Parfum"
    },
    {
        url:'/produtosImages/lisse.webp',
        alt: "Base Lisse - Pore-Minimizing & Hydrating Primer"
    },
    {
        url:'/produtosImages/joie.webp',
        alt: "Joie Rosée - Powder Blush"
    },
    {
        url:'/produtosImages/pallete.webp',
        alt: "Palette de Rêves - Eyeshadow Palette"
    },
    {
        url:'/produtosImages/kit1.webp',
        alt: "Kit Olhar de Sonhos"
    },
    {
        url:'/produtosImages/kit2.webp',
        alt: "Kit Noir Noite de Gala"
    },
    {
        url:'/produtosImages/kit3.webp',
        alt: "Kit Éclat Capilaire Reparação Total"
    },
];

async function main() {
  console.log("🧹 Limpando banco de dados...");
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  console.log("📦 Inserindo produtos e imagens...");

  for (let i = 0; i < produtos.length; i++) {
  await prisma.product.create({
    data: {
      name: produtos[i].name,
      description: produtos[i].description,
      price: produtos[i].price,
      category: produtos[i].category,
      stock: produtos[i].stock,
      ratingAvg: produtos[i].ratingAvg,
      ratingCount: produtos[i].ratingCount,
      images: {
        create: {
          url: produtosImgs[i].url,
          alt: produtosImgs[i].alt
        }
      }
    }
  });
  console.log(`✅ Produto inserido: ${produtos[i].name}`);
}
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("\n🚀 Seed finalizado com sucesso! Todos os dados da Vitória Beauty estão no banco.");
  })
  .catch(async (e) => {
    console.error("\n❌ Erro ao rodar o seed:");
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });