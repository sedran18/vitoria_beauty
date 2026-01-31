'use server'

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { RegisterFormType} from "../types";
import { cookies } from "next/headers";

export async function registerAction({name, email, password, confirmPassword} : RegisterFormType) {

  if (!name || !email || !password) {
    return { sucess: false, error: "Todos os campos são obrigatórios." }
  }

  if (confirmPassword !== password) {
    return { sucess: false, error: "Senhas não coincidem" }
  }

  if(password.length < 8) {
    return { sucess: false, error: "Senhas precisa ter no mínimo 8 caracteres" }
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { sucess: false, error: "Este e-mail já está cadastrado." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const cookieStore = await cookies();
    const cartIdFromCookie = cookieStore.get('vitoria-cart-id')?.value;

    if (cartIdFromCookie) {
      await prisma.cart.upsert({
        where: { id: cartIdFromCookie },
        update: { userId: user.id },
        create: { 
          id: cartIdFromCookie, 
          userId: user.id 
        },
      });
    }
    
  } catch (error) {
    console.log(error)
    return { sucess: false, error: "Erro ao criar conta. Tente novamente. "}
  }
    return {sucess: true, error: null}
}