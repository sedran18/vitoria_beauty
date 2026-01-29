'use client'

import Link from "next/link"
import { signOut } from "next-auth/react" // Importe para o logout funcionar
import { 
  User, 
  Settings, 
  LogOut, 
  UserCircle,
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
import { type UserMenuProps } from "@/lib/types";
import Image from "next/image";



export default function UserMenu({ user }: UserMenuProps) {

  if (!user) {
    return (
      <Button variant="ghost" asChild className="p-2 mx-2 text-stone-700
       hover:text-[#B08982] shadow-sm rounded-sm bg-[var(--brand-primary)]">
        <Link href="/login">
          <span className="font-bold uppercase tracking-widest text-xs">Login</span>
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="
            cursor-pointer
            relative
            h-10 w-10
            rounded-full
            p-0
            shadow-sm
            bg-background
            hover:bg-muted
            transition-all
            duration-200
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
          "
        >
          {user.image ? 
          <Image src={
            user.image || ''}
            fill 
            alt="avatar"  
            className="object-cover rounded-full"
            sizes="40px"/>
          : 
          <User className="h-6 w-6 text-muted-foreground" />
          }
        </Button>
      </DropdownMenuTrigger>

      
      <DropdownMenuContent className="w-56 mt-2 rounded-xl p-2 bg-white" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 py-1 px-1">
            <p className="text-sm font-bold leading-none text-gray-800">{user.name}</p>
            <p className="text-[10px] leading-none text-gray-400 truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-gray-100" />
        
        <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-[#C7A39D]/10 focus:text-[#C7A39D] transition-colors">
          <Link href="/perfil" className="flex w-full items-center p-2">
            <UserCircle className="mr-3" size={18} />
            <span className="text-sm font-medium">Meu Perfil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-[#C7A39D]/10 focus:text-[#C7A39D] transition-colors">
          <Link href="/configuracoes/perfil" className="flex w-full items-center p-2">
            <Settings className="mr-3" size={18} />
            <span className="text-sm font-medium">Configurações</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gray-100" />
        
        <DropdownMenuItem 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer rounded-lg text-red-500 focus:bg-red-50 focus:text-red-600 transition-colors p-2"
        >
          <LogOut className="mr-3" size={18} />
          <span className="text-sm font-medium">Sair da conta</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}