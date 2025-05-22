"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Esconde Header e Footer na home ("/") e na página de cadastro ("/cadastro")
  const hideLayout = ["/", "/cadastro"].includes(pathname);

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
