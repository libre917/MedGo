"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const API_URL = "http://localhost:3000";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    const permissao = JSON.parse(userData)
    if (permissao.status !== "Permitido")  {
     router.push('/')
     
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };


  return (
    <header className="bg-white text-[#004aad] w-full border-b shadow-sm z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 h-16 lg:h-20">
        {/* Botão Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col items-center justify-center p-2 rounded-md hover:bg-[#004aad]/10 transition-colors"
          aria-label="Abrir menu"
        >
          <span className="w-6 h-0.5 bg-[#004aad] rounded-full" />
          <span className="w-6 h-0.5 bg-[#004aad] rounded-full mt-1.5" />
          <span className="w-6 h-0.5 bg-[#004aad] rounded-full mt-1.5" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center h-full mx-auto lg:mx-0">
          <img
            src="MEDGO_logo.png"
            alt="Logo MEDGO"
            className="h-25 lg:h-25 w-auto object-contain"
          />
        </Link>

        {/* Menu Desktop */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <nav>
            <ul className="flex gap-6 text-base font-medium items-center">
              {[
                
                
          
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="relative group block px-2 py-2 text-[#004aad] hover:text-[#003a8c] transition-colors"
                  >
                    {label}
                    <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-[#004aad] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Área do usuário */}
        <div className="flex items-center gap-4">
          {userName && (
            <>
              {/* Versão Desktop */}
              <div className="hidden lg:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-[#004aad] font-medium hover:text-[#003a8c] transition-colors"
                >
                  <span>Olá, {userName}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      href="/perfil"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#004aad]/10 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Meu Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#004aad]/10 transition-colors"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>

              {/* Versão Mobile - Ícone de perfil */}
              <Link
                href="/perfil"
                className="lg:hidden flex items-center justify-center p-2 rounded-full hover:bg-[#004aad]/10"
                aria-label="Meu perfil"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#004aad]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menu Mobile Expandido */}
      <nav
        className={`lg:hidden transition-all duration-500 overflow-hidden bg-white border-t border-gray-200 ${
          isOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col gap-4 text-base font-medium px-5">
          {[
          
            ["Meu Perfil", "/perfil"],
          ].map(([label, href]) => (
            <li key={label}>
              <Link
                href={href}
                className="block py-3 px-2 text-[#004aad] hover:text-[#003a8c] transition-colors border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          {userName && (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left py-3 px-2 text-[#004aad] hover:text-[#003a8c] transition-colors border-b border-gray-100"
              >
                Sair
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}


// --------------------------------------------------------------------  header para a página de adiministracao para nao ficar igual do layout -------------------------------------------

export default function GerenciamentoClinicas() {
  const [clinicas, setClinicas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Carrega as clínicas da API
  useEffect(() => {
    const carregarClinicas = async () => {
      try {
        const response = await axios.get(`${API_URL}/Clinicas`);
        setClinicas(response.data);
      } catch (err) {
        console.error("Erro ao buscar clínicas:", err);
        alert("Erro ao carregar clínicas");
      } finally {
        setCarregando(false);
      }
    };

    carregarClinicas();
  }, []);

  const abrirModalDetalhes = (clinica) => {
    setClinicaSelecionada(clinica);
    setModalAberto(true);
    setModoEdicao(false);
  };

  const abrirModalEdicao = (clinica) => {
    setClinicaSelecionada(clinica);
    setModalAberto(true);
    setModoEdicao(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setClinicaSelecionada(null);
    setModoEdicao(false);
  };

  const handleAdicionarClinica = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:3000/clinicas",{
        nome: clinicaSelecionada.nome,
        endereco: clinicaSelecionada.endereco,
        telefone: clinicaSelecionada.telefone,
        email: clinicaSelecionada.email,
        senha: clinicaSelecionada.senha
      }
      )
      alert("Clinica adicionada!")
      fecharModal()
    } catch(err) {
      console.error("Erro ao adicionar clinica:", err)
      alert("Erro ao adicionar clinica")
    }
  }

  const handleExcluirClinica = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta clínica? Esta ação não pode ser desfeita.")) {
      try {
        await axios.delete(`${API_URL}/Clinicas/${id}`);
        setClinicas(clinicas.filter(clinica => clinica.id !== id));
        alert("Clínica excluída com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir clínica:", err);
        alert("Erro ao excluir clínica");
      }
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Carregando clínicas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Painel Administrativo</h1>
            <p className="mt-2 text-gray-600">Gerenciamento de Clínicas do Sistema</p>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-left">
                <p className="text-sm text-gray-600">
                  Total de clínicas cadastradas: <span className="font-semibold text-blue-600">{clinicas.length}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  setClinicaSelecionada({
                    id: null,
                    nome: "",
                    endereco: "",
                    telefone: "",
                    email: "",
                    senha: ""
                  });
                  setModoEdicao(true);
                  setModalAberto(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                + Adicionar Nova Clínica
              </button>
            </div>
          </div>

          {clinicas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 mb-4">Nenhuma clínica cadastrada.</p>
              <button
                onClick={() => {
                  setClinicaSelecionada({
                    id: null,
                    nome: "",
                    endereco: "",
                    telefone: "",
                    email: "",
                    senha: ""
                  });
                  setModoEdicao(true);
                  setModalAberto(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Cadastrar primeira clínica
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Endereço</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Telefone</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">E-mail</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clinicas.map((clinica) => (
                    <tr key={clinica.id} className="border-t">
                      <td className="px-4 py-3 text-sm text-gray-900">{clinica.nome}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{clinica.endereco}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{clinica.telefone}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{clinica.email}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => abrirModalDetalhes(clinica)}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => abrirModalEdicao(clinica)}
                            className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleExcluirClinica(clinica.id)}
                            className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal de Detalhes/Edição */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-blue-800">
                  {modoEdicao ? (clinicaSelecionada.id ? "Editar Clínica" : "Adicionar Nova Clínica") : "Detalhes da Clínica"}
                </h2>
                <button
                  onClick={fecharModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {modoEdicao ? (
                <form className="space-y-4" onSubmit={handleAdicionarClinica}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Clínica*</label>
                    <input
                      type="text"
                      value={clinicaSelecionada.nome}
                      onChange={(e) => setClinicaSelecionada({...clinicaSelecionada, nome: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Clínica Saúde Total"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo*</label>
                    <textarea
                      value={clinicaSelecionada.endereco}
                      onChange={(e) => setClinicaSelecionada({...clinicaSelecionada, endereco: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Rua, número, bairro, cidade - UF"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefone*</label>
                      <input
                        type="tel"
                        value={clinicaSelecionada.telefone}
                        onChange={(e) => setClinicaSelecionada({...clinicaSelecionada, telefone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="(11) 1234-5678"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail*</label>
                      <input
                        type="email"
                        value={clinicaSelecionada.email}
                        onChange={(e) => setClinicaSelecionada({...clinicaSelecionada, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="contato@clinica.com"
                        required
                      />
                    </div>
                  </div>

                  {!clinicaSelecionada.id && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Senha de Acesso*</label>
                      <input
                        type="password"
                        value={clinicaSelecionada.senha}
                        onChange={(e) => setClinicaSelecionada({...clinicaSelecionada, senha: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Senha para acesso da clínica"
                        required
                      />
                    </div>
                  )}

                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={fecharModal}
                      className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {clinicaSelecionada.id ? "Atualizar" : "Cadastrar"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-500 mb-2">Nome da Clínica</h3>
                    <p className="text-lg text-gray-800 font-semibold">{clinicaSelecionada.nome}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-500 mb-2">Endereço</h3>
                    <p className="text-gray-800">{clinicaSelecionada.endereco}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-500 mb-2">Telefone</h3>
                      <p className="text-gray-800">{clinicaSelecionada.telefone}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 mb-2">E-mail</h3>
                      <p className="text-gray-800">{clinicaSelecionada.email}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      onClick={() => abrirModalEdicao(clinicaSelecionada)}
                      className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={fecharModal}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}