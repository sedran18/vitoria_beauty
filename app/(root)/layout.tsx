import Header from "@/components/shared/Header";
import Footer from "@/components/shared/footer";

export default function LayoutHome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        {children}
        <Footer />
    </>
  );
}
