import type { Metadata } from "next";
import "./globals.css";
import {inter} from '@/lib/fonts';
import {APP_NAME, APP_DESCRIPTION} from '@/lib/constants';


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
          {children}
      </body>
    </html>
  );
}
