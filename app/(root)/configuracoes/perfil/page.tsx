import UpdateProfileForm from "@/components/configuracoesPerfil/updateProfileForm";
import { auth } from "@/auth";

const PerfilConfiguracao = async  () => {
  const session = await auth();
  const user =  session?.user;

  return (
   <>
   <UpdateProfileForm  user={user}/>
   </>
  );
};

export default PerfilConfiguracao;