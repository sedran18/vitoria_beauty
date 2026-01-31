'use server'

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";


export async function addToCart(productId: string) {
  try {
    const session = await auth();
    const cookieStore = await cookies();
    const cartIdFromCookie = cookieStore.get('vitoria-cart-id')?.value;
    const userId = session?.user?.id;

    let cart;

    if (userId) {
      cart = await prisma.cart.upsert({
        where: { userId: userId },
        update: {},
        create: { 
          userId: userId,
        },
      });
    } else {
      if (!cartIdFromCookie) throw new Error("Cookie de carrinho não encontrado");

      cart = await prisma.cart.upsert({
        where: { id: cartIdFromCookie },
        update: {},
        create: { id: cartIdFromCookie },
      });
    }

    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
      update: { quantity: { increment: 1 } },
      create: {
        cartId: cart.id,
        productId: productId,
        quantity: 1,
      },
    });

    revalidatePath('/'); 
    revalidatePath('/carrinho');
    
  } catch (error) {
    console.error("ERRO AO ADICIONAR ITEM:", error);
    return { success: false };
  }
}

export const getItemsFromCart = async (userId?: string) => {
  const cookieStore = await cookies();
  const cartIdFromCookie = cookieStore.get('vitoria-cart-id')?.value;

  if (!userId && !cartIdFromCookie) return null;

  const cart = await prisma.cart.findUnique({
    where: userId 
      ? { userId } 
      : { id: cartIdFromCookie }, 
    include: {
      items: {
        orderBy :{
          createdAt: 'asc'
        },
        include: {
          product: {
            select: {
              id: true,
              images: true,
              name: true,
              price: true, 
            }
          }
        }
      }
    }
  });

  return cart;
}

export const adicionarQuantidade = async (itemId: string, value: 1 | -1) => {
  try {
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      select: { quantity: true, cartId: true }
    });

    if (!item) throw new Error("Item não encontrado");

    if (item.quantity === 1 && value === -1) {
      await prisma.cartItem.delete({
        where: { id: itemId }
      });
    } else {
      await prisma.cartItem.update({
        where: { id: itemId },
        data: {
          quantity: { increment: value }
        }
      });
    }

    revalidatePath('/carrinho');
    revalidatePath('/'); 
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao alterar quantidade:", error);
    return { success: false };
  }
}

export const removerItem = async (itemId: string) => {
  try {
    await prisma.cartItem.delete({
        where: { id: itemId }
    });
    revalidatePath('/')
    revalidatePath('/carrinho')
  } catch (err) {
    console.error(err)
  }
}

export const cleanCart = async () => {
  const session = await auth();
  if (!session?.user) return;

  await prisma.cartItem.deleteMany({
    where: {
      cart: {
        userId: session.user.id
      }
    }
  });
  
  revalidatePath('/carrinho');
}