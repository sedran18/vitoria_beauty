'use client'

import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessScreenProps {
    name: string;
}

export default function SuccessScreen({ name}: SuccessScreenProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-8 space-y-6"
        >
            <div className="relative flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="h-20 w-20 rounded-full border border-[#C7A39D]/30 flex items-center justify-center bg-[#C7A39D]/5"
                >
                    <Check className="text-[#C7A39D]" size={32} strokeWidth={1.5} />
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border border-[#C7A39D]"
                />
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-medium text-gray-800">
                    Bem-vinda, {name.split(' ')[0]}!
                </h2>
                <p className="text-sm text-gray-500 max-w-[220px] mx-auto leading-relaxed">
                    Sua conta foi criada com sucesso. Estamos preparando seu acesso...
                </p>
            </div>

            <div className="w-32 h-[2px] bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6 }}
                    className="h-full bg-[#C7A39D]"
                />
            </div>
        </motion.div>
    );
}