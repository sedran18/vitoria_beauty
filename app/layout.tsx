import type { Metadata } from "next";
import "./globals.css";
import {inter} from '@/lib/fonts';
import {APP_NAME, APP_DESCRIPTION} from '@/lib/constants';
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
        < SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
