import Header from "@/components/shared/Header";
import Footer from "@/components/shared/footer";
import { auth } from "@/auth";
import { Suspense } from "react";
import { ShoppingBag } from "lucide-react";
import CartCounter from "@/components/shared/Header/cartCounter";

export default async function LayoutHome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
        <Header 
          user={session?.user}
          cartCounter={
            <Suspense fallback={<ShoppingBag className="text-gray-300" size={22} />}>
              <CartCounter />
            </Suspense>
          } 
        />
        {children}
        <Footer />
    </>
  );
}
