"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Home from "@/app/home/page";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Oculta o Header e Footer na home, cadastro e na página not-found
  const hideLayout = ["/", "/cadastro", "/not-found" , "/politicadeprivacidade" , "/login-medico" , "/cadastro-medico" , "/home-clinicas", "/home-admin" ,"/home-medico"  ].includes(pathname);

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
