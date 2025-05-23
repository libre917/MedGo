"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Perfil() {
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const userData = localStorage.getItem("usuario");
        if (!userData) return;
        
        const { id } = JSON.parse(userData);
        const { data } = await axios.get(`http://localhost:3000/Pacientes/${id}`);
        
        setPaciente({
          ...data,
          data_nascimento: new Date(data.data_nascimento).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })
        });
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

  if (!paciente) {
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
                  {paciente.nome.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white"></div>
            </div>
            <h1 className="mt-6 text-4xl font-light text-gray-900">
              {paciente.nome}
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Informações Pessoais
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Data de Nascimento</p>
                    <p className="mt-1 text-lg font-light text-gray-800">
                      {paciente.data_nascimento}
                    </p>
                  </div>
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="mt-1 text-lg font-light text-gray-800">
                      {paciente.telefone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Contato
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-500">E-mail</p>
                    <p className="mt-1 text-lg font-light text-gray-800">
                      {paciente.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}