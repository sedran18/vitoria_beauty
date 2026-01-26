'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { 
  User, 
  Settings, 
  LogOut, 
  UserCircle,
  LogIn
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function UserMenu() {
  const { data: session, status } = useSession()

  if (status === "loading") return <div className="h-9 w-9 animate-pulse rounded-full bg-gray-100" />

  if (!session) {
    return (
      <Button variant="ghost" asChild className="gap-2 text-[#C7A39D] hover:text-[#B08982]">
        <Link href="/login">
          <LogIn size={18} />
          <span className="font-bold uppercase tracking-widest text-xs">Log-in</span>
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-gray-100 shadow-sm hover:bg-gray-50">
          <User className="text-gray-600" size={22} />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 mt-2 rounded-xl p-2" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 py-1">
            <p className="text-sm font-bold leading-none text-gray-800">{session.user?.name}</p>
            <p className="text-xs leading-none text-gray-500">{session.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-gray-50" />
        
        <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-[#C7A39D]/10 focus:text-[#C7A39D]">
          <Link href="/perfil" className="flex w-full items-center">
            <UserCircle className="mr-3" size={18} />
            <span className="font-medium">Meu Perfil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-[#C7A39D]/10 focus:text-[#C7A39D]">
          <Link href="/configuracoes" className="flex w-full items-center">
            <Settings className="mr-3" size={18} />
            <span className="font-medium">Configurações</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gray-50" />
        
        <DropdownMenuItem 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer rounded-lg text-red-500 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="mr-3" size={18} />
          <span className="font-medium">Sair da conta</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}