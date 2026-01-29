import EnderecoForm from "@/components/configuracoes/enderecoForm";
import {auth} from '@/auth';


const EndereçoNovo = async () => {
  const session = await auth();
  return (
    <EnderecoForm userId={session?.user?.id ?? ''}/>
  )
}

export default EndereçoNovo
