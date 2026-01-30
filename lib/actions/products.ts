'use server'
import prisma from "@/lib/prisma";
import {type ProdutosType}  from "@/lib/types";

export type ServerResponse= {
    success: boolean;
    data?: ProdutosType[];
    error?: string;
};

const getProducts = async (limit: number = 12, skip: number = 0): Promise<ServerResponse> => {
    try {
        const produtos = await prisma.product.findMany({
            take: Math.abs(limit), 
            skip:  Math.abs(skip),
            include: {
                images: true,
            },
        });

        const produtosSerializados = produtos.map(p => ({
            ...p,
            price: Number(p.price),
            ratingAvg: Number(p.ratingAvg)
        }));
    
        return { success: true, data: produtosSerializados as unknown as ProdutosType[] };
    } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        return { success: false, error: "Falha ao carregar produtos." };
    }
}

const getProductsByCategory = async (category: string, limit: number = 12, skip: number = 0): Promise<ServerResponse> => {
    if (!category) return { success: false, error: 'O campo categoria é obrigatório' };

    try {
        const produtos = await prisma.product.findMany({
            take: Math.abs(limit), 
            skip:  Math.abs(skip),
            where: {
                category,
            },
            include: {
                images: true,
            }
        });


        const produtosSerializados = produtos.map(p => ({
            ...p,
            price: Number(p.price),
            ratingAvg: Number(p.ratingAvg)
        }));

        return { success: true, data: produtosSerializados as unknown as ProdutosType[] };

    } catch (err) {
        console.error(`Erro ao buscar categoria ${category}:`, err);
        return { success: false, error: "Erro interno ao buscar produtos por categoria." };
    }
}

//contar produtos

const countProdutos = async (category?: string) => {
    return await prisma.product.count({
        where: {
            ...(category && { category })
        }
    });
}

//os mais vendidos
const getBySalesCount = async (limit: number = 4): Promise<ServerResponse> => {
    try {
        const produtos = await prisma.product.findMany({
            take: Math.abs(limit),
            orderBy: {
                salesCount: 'desc' 
            },
            include: {
                images: true,
            }
        });

        const produtosSerializados = produtos.map(p => ({
            ...p,
            price: Number(p.price),
            ratingAvg: p.ratingAvg ? Number(p.ratingAvg) : 0,
        }));

        return { 
            success: true, 
            data: produtosSerializados as unknown as ProdutosType[] 
        };
    } catch (err) {
        console.error("Erro ao buscar produtos mais vendidos:", err);
        return { success: false, error: "Falha ao carregar destaques." };
    }
}
//pegar um único por id
const getProductById = async (id: string) => {
    const produto = await prisma.product.findUnique({
        where: {
            id
        }, 
        include: {
            images: true,
            ratings: {
                include: {
                    user: {
                        select: {
                            id: true, 
                            name: true, 
                            image: true
                        }
                    }
                },
                orderBy: {
                    createdAt:  'desc'
                }
            }
        }
    });

    const produtoSerializado = produto ? {
        ...produto,
        price: Number(produto.price),
        ratingAvg: produto.ratingAvg ? Number(produto.ratingAvg) : 0,
    } : null

    return produtoSerializado;
}

const  searchProducts = async (query: string) => {
  return  prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive", 
      },
    },
    select: {
      id: true,
      name: true,
      images: true
    },
    take: 10
  });
}

export { 
    getProducts, 
    getProductsByCategory, 
    countProdutos, 
    getBySalesCount,
    getProductById,
    searchProducts }