/// components/Header.jsx
export default function Header() {
  return (
    <header className="  bg-white text-[#004aad] w-full px-4  border-b shadow-sm">
      <div className=" max-w-screen-xl mx-auto flex items-center justify-between ">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src="MEDGO_logo.png"
            alt="Logo"
            className="h-25 sm:h-25 w-auto object-contain"
          />
        </a>
       
        {/* Checkbox para controle do menu */}
        <input
          type="checkbox"
          id="menu-toggle"
          className="hidden peer"
          aria-hidden="true"
        />

        <label
          htmlFor="menu-toggle"
          className="sm:hidden block p-1"
          aria-label="Abrir menu"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#004aad]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#004aad]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#004aad]"></span>
          </div>
        </label>

        {/* Menu desktop e mobile */}
        <nav
          className="
            fixed top-25 left-0 w-full bg-white border-t border-gray-200
            max-h-0 overflow-hidden transition-all duration-300
            peer-checked:max-h-[500px]
            sm:static sm:max-h-full sm:flex sm:items-center sm:border-none sm:overflow-visible
          "
        >
          <ul
            className="
              flex flex-col sm:flex-row sm:gap-10 text-base font-semibold px-4 sm:px-0 py-4 sm:py-0
              sm:justify-center sm:items-center sm:w-full
            "
          >
            <li>
              <a href="/" className="relative group block py-2 sm:py-0 transition-all duration-200">
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#004aad] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
            <li>
              <a href="/planos" className="relative group block py-2 sm:py-0 transition-all duration-200">
                Médicos Disponíveis
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#004aad] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
            <li>
              <a href="/snackbar" className="relative group block py-2 sm:py-0 transition-all duration-200">
                Agenda
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#004aad] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
            <li>
              <a href="/suasessao" className="relative group block py-2 sm:py-0 transition-all duration-200">
                Sobre nós
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#004aad] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
            <li>
              <a href="/faq" className="relative group block py-2 sm:py-0 transition-all duration-200">
                FAQ
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#004aad] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

