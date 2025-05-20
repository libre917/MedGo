"use client";

import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white text-[#004aad] w-full border-b shadow-sm z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 h-16 sm:h-20">
        {/* Botão Mobile - Movido para a esquerda */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden flex flex-col items-center justify-center p-2 rounded-md hover:bg-[#004aad]/10 transition-colors"
          aria-label="Abrir menu"
        >
          <span
            className={`w-6 h-0.5 bg-[#004aad] rounded-full transition-transform duration-300 $`}
          />
          <span
            className={`w-6 h-0.5 bg-[#004aad] rounded-full mt-1.5 transition-opacity duration-300 $`}
          />
          <span
            className={`w-6 h-0.5 bg-[#004aad] rounded-full mt-1.5 transition-transform duration-300 `}
          />
        </button>

        {/* Logo - Centralizado */}
        <a href="/" className="flex items-center h-full mx-auto sm:mx-0">
          <img
            src="MEDGO_logo.png"
            alt="Logo MEDGO"
            className="h-25 sm:h-25 w-auto object-contain transition-transform hover:scale-105"
          />
        </a>

        {/* Menu Desktop - Centralizado */}
        <div className="hidden sm:flex items-center justify-center flex-1">
          <nav>
            <ul className="flex gap-6 text-base font-medium items-center">
              {[
                ["Home", "/"],
                ["Médicos", "/planos"],
                ["Sua Agenda", "/agenda"],
                ["Sobre nós", "/sobrenos"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="relative group block px-2 py-2 text-[#004aad] hover:text-[#003a8c] transition-colors"
                  >
                    {label}
                    <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-[#004aad] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Botão Marcar Consulta - À direita */}
        <a
          href="/marcar-consulta"
          className="hidden sm:block ml-4 px-4 py-2 bg-[#004aad] text-white rounded-md hover:bg-[#003a8c] transition duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
        >
          Marcar Consulta
        </a>

        {/* Espaço vazio para balancear o layout mobile */}
        <div className="sm:hidden w-6" />
      </div>

      {/* Menu Mobile Expandido */}
      <nav
        className={`sm:hidden transition-all duration-500 overflow-hidden bg-white border-t border-gray-200 ${
          isOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col gap-4 text-base font-medium px-4">
          {[
            ["Home", "/"],
            ["Médicos", "/planos"],
            ["Marcar consulta", "/marcar-consulta"],
            ["Sua Agenda", "/agenda"],
            ["Sobre nós", "/sobrenos"],
          ].map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                className="block py-2 px-2 text-[#004aad] hover:text-[#003a8c] transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}