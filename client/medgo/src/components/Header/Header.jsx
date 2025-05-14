// components/Header.jsx
export default function Header() {
  return (
    <header className="bg-[#004aad] text-white py-4 px-6 flex items-center">
      {/* Logo à esquerda */}
      <div className="flex-shrink-0">
        <a href="/">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </a>
      </div>

      {/* Navegação deslocada um pouco à direita */}
      <nav className="ml-10">
        <ul className="flex space-x-6 text-lg font-medium">
          <li>
            <a href="/" className="hover:underline">Home</a>
          </li>
          <li>
            <a href="/planos" className="hover:underline">Planos</a>
          </li>
          <li>
            <a href="/snackbar" className="hover:underline">Snackbar</a>
          </li>
          <li>
            <a href="/suasessao" className="hover:underline">Sua Sessão</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
