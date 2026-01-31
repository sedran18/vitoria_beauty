'use server';

import prisma from "../prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getDefautlAddress } from "./address";

export const createOrder = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const address = getDefautlAddress();

    if (!address) throw new Error('Adicione um endereço padrão de entrega')
    const cart = await prisma.cart.findUnique({
      where: {
        userId
      },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new Error("Carrinho vazio ou não encontrado");
    }

    const total = cart.items.reduce((acc, item) => {
      return acc + (item.quantity * Number(item.product.price));
    }, 0);

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: userId ?? '',
          total: total,
          status: "PAID", 
          orderItems: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: Number(item.product.price), 
            })),
          },
        },
      });

     await Promise.all(
        cart.items.map((item) =>
          tx.product.update({
            where: { id: item.productId },
            data: {
              stock: { decrement: item.quantity },
              salesCount: { increment: item.quantity } 
            }
          })
        )
      );

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
      return newOrder;
    });

    revalidatePath('/carrinho');
    revalidatePath('/compras');
    
    return { success: true, orderId: order.id };

  } catch (error) {
    console.error("ERRO AO FINALIZAR PEDIDO:", error);
    return { success: false, error: "Falha ao processar pedido" };
  }
};


export const getOrders = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  
  if (!userId) return []; 

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: { orderItems: true }
        },
        orderItems: {
          take: 1,
          select: {
            product: {
              select: { images: true }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc' 
      }
    });

    return orders;
  } catch (err) {
    console.error("Erro ao buscar pedidos:", err);
    return [];
  }
}

export const getItemsFromOrder = async (orderId: string) => {
  try {
    const items = await prisma.orderItem.findMany({
      where: {
        orderId,
      }, 
      include: {
        product: {
          include: {
            images: true
          } 
        }
      }
    });

    if (!items) throw new Error('id de produto não encontrado');
    return items;
  } catch (err) {
    console.error(err);
    return [];
  }
}