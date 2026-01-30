'use server';

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export const saveRating = async ({value, productId, userId}: {value: number, productId: string, userId: string}) => {
    try {
        await prisma.rating.upsert({
            where: {
                productId_userId: {
                    productId,
                    userId
                }
            },
            update: {
                value 
            },
            create: {
                value, 
                productId, 
                userId 
            }
        });

        revalidatePath(`/detalhes/${productId}`);
        
        return { success: true };
    } catch (error) {
        console.error("Erro no Prisma:", error);
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