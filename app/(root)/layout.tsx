import Header from "@/components/shared/Header";
import Footer from "@/components/shared/footer";
import { auth } from "@/auth";

export default async function LayoutHome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
        <Header user={session?.user}/>
        {children}
        <Footer />
    </>
  );
}
