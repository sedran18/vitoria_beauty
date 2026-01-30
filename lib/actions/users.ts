'use server';
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "../supabase";
import { revalidatePath } from 'next/cache';
import {signOut} from '@/auth';

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

export const updateProfileFields = async (id: string, { name, image, passwords }: {
    name: string | null,
    image: string | null,
    passwords: string[]
}) => {
    const updateData: { name?: string, image?: string, password?: string } = {};

    if (name && name.trim() !== "") updateData.name = name;
    if (image) updateData.image = image;

    const newPassword = passwords[0];
    const confirmPassword = passwords[1];

    if (newPassword && newPassword.trim() !== "") {
        if (newPassword.length < 8) return false;
        if (newPassword === confirmPassword) {
            updateData.password = await bcrypt.hash(newPassword.trim(), 10);
        } else {
            return false;
        }
    }

    try {
        if (Object.keys(updateData).length === 0) return false;

        const user = await prisma.user.update({
            where: { id },
            data: updateData
        });

        return !!user;
    } catch (error) {
        console.error("Erro no Prisma:", error);
        return false;
    }
}

export const uploadImage = async (file: File, userId: string) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error } = await supabaseAdmin.storage
            .from('images')
            .upload(filePath, buffer, { contentType: file.type, upsert: true });

        if (error) throw error;

        const { data: urlData } = supabaseAdmin.storage
            .from('images')
            .getPublicUrl(filePath);

        return urlData.publicUrl;
    } catch (error) {
        console.error('Erro no upload:', error);
        return null;
    }
}

export const deleteProfileImage = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true }
    });

    if (user?.image && user.image.includes('avatars/')) {
      
      const filePath = user.image.split('images/').pop(); 

      if (filePath) {
        const { error } = await supabaseAdmin.storage
          .from('images')
          .remove([filePath]);
          
        if (error) console.error("Erro ao remover do Supabase:", error);
      }
    }
  } catch (error) {
    console.error("Erro na função de limpeza:", error);
  }
}

export const handleUpdateUserProfile = async (formData: FormData, userId: string) => {
    const name = formData.get("name") as string;
    const file = formData.get("avatar") as File;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    let imageUrl = null;
    try {
        if (file && file.size > 0) {
            await deleteProfileImage(userId); 
            imageUrl = await uploadImage(file, userId);
        }

        const success = await updateProfileFields(userId, {
            name,
            image: imageUrl,
            passwords: [password, confirmPassword]
        });

        if (success) {
            revalidatePath('/', 'layout'); 
        }

        return success;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export const deleteUser = async (userId: string, formData: FormData) => {
  const password = formData.get('password') as string;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user || !user.password) return { success: false, error: "Usuário não encontrado" };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return { success: false, error: "Senha incorreta" };

    await prisma.user.delete({ where: { id: userId } });

  } catch (err) {
    console.error(err);
    return { success: false, error: "Erro ao deletar conta" };
  }
    await signOut({ redirectTo: "/login" });
};

export const getUserById = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        return user;
    } catch (err) {
        console.error(err)
    }
}