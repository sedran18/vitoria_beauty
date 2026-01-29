import RemoverForm from "@/components/configuracoes/removeForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const RemoverUserPage = async () => {
  const session = await auth();
  
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="max-w-md mx-auto pt-20 px-4 text-center">
      <h1 className="text-2xl font-black mb-2 text-red-600">Excluir Conta</h1>
      <p className="text-gray-500 text-sm mb-8">
        Para confirmar a exclusão, por favor digite sua senha.
      </p>
      
      <RemoverForm userId={session.user.id} />
    </div>
  );
};

export default RemoverUserPage;