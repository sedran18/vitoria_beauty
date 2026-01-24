'use server'

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { RegisterFormType

 } from "../types"
export async function registerAction({name, email, password} : RegisterFormType) {

  if (!name || !email || !password) {
    return { error: "Todos os campos são obrigatórios." }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { error: "Este e-mail já está cadastrado." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

  } catch (error) {
    return { error: "Erro ao criar conta. Tente novamente. " + error }
  }

  redirect("/login")
}