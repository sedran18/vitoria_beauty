'use server';
import prisma from "../prisma";

export const getRatingsFromUser = async (id:string) => {
    const user  = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            ratings: {
                include: {
                    product: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            }
        }
    });

    return user?.ratings ?? [];
}