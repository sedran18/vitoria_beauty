'use server';
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export const getListAddresses = async (userId: string) => {
    try {
        const addresses = await prisma.address.findMany({

            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return addresses;

    } catch (err) {
        console.error("Erro ao buscar endereços:", err);
        return [];
    }
}

export const createAddress = async (userId: string, formData: FormData) => {
  try {
    const zipCode = (formData.get('zipCode') as string).replace(/\D/g, "");
    const street = formData.get('street') as string;
    const number = formData.get('number') as string;
    const neighborhood = formData.get('neighborhood') as string;
    const complement = formData.get('complement') as string || null;

    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
    const cepData = await response.json();

    if (cepData.erro) {
      return { success: false, error: "CEP inválido ou não encontrado." };
    }


    const existingAddressesCount = await prisma.address.count({
      where: { userId }
    });

    const isDefault = formData.get('isDefault') === 'on' || existingAddressesCount === 0;

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    await prisma.address.create({
      data: {
        userId,
        street,
        number,
        neighborhood,
        city: cepData.localidade,
        state: cepData.uf,        
        complement,
        zipCode, 
        isDefault,
      },
    });

    revalidatePath("/configuracoes/conta"); 
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar endereço:", error);
    return { success: false, error: "Erro interno ao salvar endereço." };
  }
};

export const deleteAddress = async ({ addressId, userId }: { addressId: string, userId: string }) => {
  try {
    const deletedAddress = await prisma.address.delete({
      where: {
        id: addressId,
        userId: userId 
      }
    });

    if (deletedAddress.isDefault) {
      const nextAddress = await prisma.address.findFirst({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' }
      });

      if (nextAddress) {
        await prisma.address.update({
          where: { id: nextAddress.id },
          data: { isDefault: true }
        });
      }
    }

    revalidatePath("/conta");
    return { success: true };
  } catch (err) {
    console.error("Erro ao excluir endereço:", err);
    return { success: false, error: "Falha ao remover o endereço." };
  }
};