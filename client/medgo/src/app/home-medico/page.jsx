"use client";

import { useState } from "react";

export default function AgendaMedico() {
  const userId = localStorage.getItem("usuario");
  if(!userId){
    alert('Erro: Login ou cadastro necessário para funcionamento')
    window.location.href = "/";
  }
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      paciente: "João Silva",
      idade: 35,
      data: "15/06/2024",
      horario: "14:30",
      status: "agendado",
      endereco: "Av. Paulista, 1000 - Sala 305 - São Paulo/SP",
      telefone: "(11) 99999-9999"
    },
    {
      id: 2,
      paciente: "Maria Oliveira",
      idade: 42,
      data: "15/06/2024",
      horario: "15:30",
      status: "agendado",
      endereco: "Av. Paulista, 1000 - Sala 305 - São Paulo/SP",
      telefone: "(11) 98888-8888"
    },
    {
      id: 3,
      paciente: "Carlos Souza",
      idade: 28,
      data: "16/06/2024",
      horario: "09:00",
      status: "agendado",
      endereco: "Av. Paulista, 1000 - Sala 305 - São Paulo/SP",
      telefone: "(11) 97777-7777"
    },
    {
      id: 4,
      paciente: "Ana Costa",
      idade: 50,
      data: "16/06/2024",
      horario: "10:30",
      status: "agendado",
      endereco: "Av. Paulista, 1000 - Sala 305 - São Paulo/SP",
      telefone: "(11) 96666-6666"
    },
    {
      id: 5,
      paciente: "Pedro Santos",
      idade: 60,
      data: "17/06/2024",
      horario: "11:00",
      status: "agendado",
      endereco: "Av. Paulista, 1000 - Sala 305 - São Paulo/SP",
      telefone: "(11) 95555-5555"
    }
  ]);

  const [detalhesConsulta, setDetalhesConsulta] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const consultasFiltradas = consultas.filter(consulta => {
    if (filtroStatus === "todos") return true;
    return consulta.status === filtroStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Minha Agenda</h1>
          <p className="mt-2 text-gray-600">Consultas agendadas pelos pacientes</p>

          <div className="flex justify-center mt-4 space-x-2">
            {["todos", "agendado"].map((status) => (
              <button
                key={status}
                onClick={() => setFiltroStatus(status)}
                className={`px-3 py-1 text-sm rounded-full ${
                  filtroStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-blue-200"
                }`}
              >
                {status === "todos" ? "Todos" : "Agendados"}
              </button>
            ))}
          </div>
        </div>

        {consultasFiltradas.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">Nenhuma consulta encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {consultasFiltradas.map((consulta) => (
              <div
                key={consulta.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{consulta.paciente}</h2>
                      <p className="text-sm text-gray-500">{consulta.idade} anos</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Agendado
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Data:</span>
                      <span className="font-medium">{consulta.data}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Horário:</span>
                      <span className="font-medium">{consulta.horario}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => setDetalhesConsulta(consulta)}
                      className="w-full py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {detalhesConsulta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-blue-800">Detalhes da Consulta</h2>
              <button
                onClick={() => setDetalhesConsulta(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-500">Paciente</h3>
                <p className="text-lg font-semibold">{detalhesConsulta.paciente}</p>
                <p className="text-gray-600">{detalhesConsulta.idade} anos</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-500">Data</h3>
                  <p className="text-gray-800">{detalhesConsulta.data}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Horário</h3>
                  <p className="text-gray-800">{detalhesConsulta.horario}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-500">Telefone</h3>
                <p className="text-gray-800">{detalhesConsulta.telefone}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-500">Local</h3>
                <p className="text-gray-800">{detalhesConsulta.endereco}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-500">Status</h3>
                <p className="inline-block px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  Agendado
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setDetalhesConsulta(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
