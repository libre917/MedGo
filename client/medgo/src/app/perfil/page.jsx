"use client";

import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
const API_URL = "http://localhost:3000"

export default function Perfil() {

  const deletarConta = async (idUser) => {
    if (!confirm('Tem certeza que deseja deletar esta conta?')) return;
    try {
      axios.delete(`${API_URL}/pacientes/${idUser}`)
      window.location = "/"
    } catch (err) {
      console.error("Erro", err)
    }
  }
  const userData = localStorage.getItem("usuario");
  const usuarioLogado = JSON.parse(userData);
  const data = new Date()
  const anoAtual = data.getFullYear()
  const dataNasc = usuarioLogado.dataNascimento.split(" ") 
  const idade = anoAtual - dataNasc[3]
  
  const atualizarSenha = async (idUser) => {
    try{
     const response = await axios.get(`${API_URL}/pacientes/${idUser}`)
     const data = response.data
     await axios.post("http://localhost:3000/auth/login", {email: usuarioLogado.email, senha: senha});

     await axios.put(`${API_URL}/pacientes/${idUser}`, {
      ...data,
      senha: newSenha
     }
     )
     alert('Senha alterada com sucesso')

     setAltSenha(null)


    } catch (err) {
      console.error("Erro", err)
    }
  }
  const userId = localStorage.getItem("usuario");
  if (!userId) {
    alert('Erro: Login ou cadastro necessário para funcionamento')
    window.location.href = "/";
  }
  const [paciente, setPaciente] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [altSenha, setAltSenha] = useState(null)
  const [senha, setSenha] = useState("")
  const [newSenha, setNewSenha] = useState("");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
      
        if (!userData) return;

       

        // Verifica se é médico (tem CRM) ou paciente
        if (usuarioLogado.crm) {
          setTipoUsuario('medico');
          const { data } = await axios.get(`${API_URL}/medicos/${usuarioLogado.id}`);
          setUsuario(data);
        } else {
          setTipoUsuario('paciente');
          const { data } = await axios.get(`${API_URL}/pacientes/${usuarioLogado.id}`);

          // Se já tiver idade no objeto, usa ela diretamente
          if (data.idade) {
            setUsuario(data);
          } else if (data.data_nascimento) {
            // Se tiver data_nascimento, calcula a idade
            const birthDate = new Date(data.data_nascimento);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }

            setUsuario({
              ...data,
              idade: age
            });
          } else {
            // Se não tiver nem idade nem data_nascimento, mantém os dados sem idade
            setUsuario(data);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-light text-gray-800">Perfil não disponível</h1>
          <p className="text-gray-500">Não foi possível carregar suas informações</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-block relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <span className="text-4xl text-blue-600 font-light">
                  {usuario.nome.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white"></div>
            </div>
            <h1 className="mt-6 text-4xl font-light text-gray-900">
              {usuario.nome}
            </h1>
            {tipoUsuario === 'medico' && (
              <p className="mt-2 text-lg text-gray-600">{usuario.especialidade}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-xs  titulo-cor-padrao-medgo font-bold uppercase tracking-wider">
                  Informações {tipoUsuario === 'medico' ? 'Profissionais' : 'Pessoais'}
                </h2>
                <div className="mt-4 space-y-4">
                  {tipoUsuario === 'paciente' ? (
                    <>
                      <div className="pb-4 border-b border-gray-100">
                        <p className="text-sm text-black">Idade</p>
                        <p className="mt-1 text-lg font-light text-gray-800">
                          {idade} anos
                        </p>
                      </div>
                      <div className="pb-4 border-b border-gray-100">
                        <p className="text-sm text-black">Telefone</p>
                        <p className="mt-1 text-lg font-light text-gray-800">
                          {usuario.telefone}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="pb-4 border-b border-gray-100">
                        <p className="text-sm text-gray-500">CRM</p>
                        <p className="mt-1 text-lg font-light text-gray-800">
                          {usuario.crm}
                        </p>
                      </div>
                      <div className="pb-4 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Especialidade</p>
                        <p className="mt-1 text-lg font-light text-gray-800">
                          {usuario.especialidade}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xs font-bold  titulo-cor-padrao-medgo uppercase tracking-wider">
                  Contato
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-sm text-black">E-mail</p>
                    <p className="mt-1 text-lg font-light text-gray-800">
                      {usuario.email}
                    </p>
                  </div>
                  {tipoUsuario === 'paciente' && (
                    <div className="pb-4 border-b border-gray-100">
                      <p className="text-sm text-black">Endereço</p>
                      <p className="mt-1 text-lg font-light text-gray-800">
                        {usuario.endereco}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
              <div className="flex justify-center">
                <button className="m-2 rounded-4xl px-3 py-2.5 cursor-pointer text-red-800 bg-red-100" onClick={() => deletarConta(usuario.id)}>
                  Excluir conta
                </button>
                <button className="m-2 rounded-4xl px-3 py-2.5 cursor-pointer text-yellow-800 bg-yellow-100" onClick={() => setAltSenha(usuario)}>
                  Alterar senha
                </button>
              </div>
            
            {altSenha && (
              <div className="fixed inset-0 bg-gray-900/60 bg-opacity-50 flex items-center justify-center p-4 z-50" >
                <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                   <form onSubmit={(e) => {
                    e.preventDefault();
                    atualizarSenha(usuario.id)
                   }}>
                    <div className="flex justify-between items-start mb-4">
              
                  <h2 className="text-2xl font-bold text-blue-800">Digite a nova senha</h2>
                      <button
                  type="button"
                  onClick={() => setAltSenha(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
                </div>
                 <div className="space-y-4">
                 
                    <input required type="password" placeholder="Senha antiga" className="w-80 md:w-60 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"  onChange={(e) => setSenha(e.target.value)} />
                    
                  
                 
                    <input required type="password" placeholder="Nova senha" className="w-80 md:w-60 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"  onChange={(e) => setNewSenha(e.target.value)} />
                    
                  </div>
                       <div className="mt-6 flex justify-end space-x-3">
                        <button type="submit" className="text-green-800 bg-green-100">Alterar</button>
                       </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>

  );

}