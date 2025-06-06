"use client";

import Link from "next/link";

export default function Cabecalho() {
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <header className=" left-0 right-0 bg-white text-[#004aad] w-full border-b shadow-sm z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 h-16 lg:h-20">
        {/* Logo - Alinhado à esquerda */}
        <Link href="/" className="flex items-center h-full">
          <img
            src="/MEDGO_logo.png"
            alt="Logo MEDGO"
            className="h-25 w-auto object-contain sm:h-25 md:h-25 lg:h-25"
          />
        </Link>

        <div className="flex items-center gap-10">
         
          {/* Botão "Sair" com estilo similar */}
          <button
            onClick={handleLogout}
            className="px-4 py-3 bg-[#004aad] text-white rounded-full hover:bg-[#003a8c] transition duration-300 shadow-sm hover:shadow-md whitespace-nowrap flex items-center gap-2"
          >
            Sair
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}