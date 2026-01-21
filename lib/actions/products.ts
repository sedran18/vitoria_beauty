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

export { getProducts, getProductsByCategory, countProdutos, getBySalesCount }