'use server';

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export const saveRating = async ({ value, productId, userId }: { value: number, productId: string, userId: string }) => {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.rating.upsert({
                where: {
                    productId_userId: {
                        productId,
                        userId
                    }
                },
                update: { value },
                create: {
                    value,
                    productId,
                    userId
                }
            });

            const allRatings = await tx.rating.findMany({
                where: { productId },
                select: { value: true }
            });

            const ratingCount = allRatings.length;
            const sum = allRatings.reduce((acc, curr) => acc + curr.value, 0);
            const ratingAvg = sum / ratingCount;

            await tx.product.update({
                where: { id: productId },
                data: {
                    ratingCount: ratingCount,
                    ratingAvg: ratingAvg 
                }
            });
        });

        revalidatePath(`/detalhes/${productId}`);
        revalidatePath(`/produtos`); 
        revalidatePath(`/`); 

        return { success: true };
    } catch (error) {
        console.error("Erro ao salvar avaliação:", error);
        return { success: false };
    }
}

export const getRatingFromUser = async ({productId, userId}: { productId: string, userId: string}) => {
    try {
        const rate = await prisma.rating.findUnique({
            select: {
                value: true
            },
            where: {
                productId_userId: { 
                    productId,
                    userId
                }
            }
        });

        
        return rate?.value;

    } catch {
        return 0
    }
}