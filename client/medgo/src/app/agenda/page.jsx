"use client";

import { useState } from "react";

export default function AgendaMedica() {
  // Dados mockados das consultas
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      medico: "Dra. Ana Claudia Souza",
      especialidade: "Cardiologia",
      data: "15/06/2024",
      horario: "14:30",
      status: "agendado",
      endereco: "Av. Paulista, 1000 - Sala 305 - São Paulo/SP"
    },
 
  ]);

  // Estado para controlar qual consulta está sendo visualizada
  const [detalhesConsulta, setDetalhesConsulta] = useState(null);

  // Função para cancelar consulta
  const cancelarConsulta = (id) => {
    if (confirm("Tem certeza que deseja cancelar esta consulta?")) {
      setConsultas(consultas.map(consulta => 
        consulta.id === id ? {...consulta, status: "cancelado"} : consulta
      ));
    }
  };

  // Função para remarcar consulta
  const remarcarConsulta = (id) => {
    const novaData = prompt("Digite a nova data (DD/MM/AAAA):");
    const novoHorario = prompt("Digite o novo horário:");
    
    if (novaData && novoHorario) {
      setConsultas(consultas.map(consulta => 
        consulta.id === id ? {...consulta, data: novaData, horario: novoHorario} : consulta
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Minha Agenda Médica</h1>
          <p className="mt-2 text-gray-600">Gerencie suas consultas e compromissos de saúde</p>
        </div>

        {/* Lista de Consultas */}
        <div className="space-y-4">
          {consultas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 mb-4">Nenhuma consulta agendada no momento.</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Agendar Nova Consulta
              </button>
            </div>
          ) : (
            consultas.map((consulta) => (
              <div 
                key={consulta.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{consulta.medico}</h2>
                      <p className="text-blue-600">{consulta.especialidade}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      consulta.status === "agendado" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {consulta.status === "agendado" ? "Agendado" : "Cancelado"}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Data</h3>
                      <p className="text-gray-800">{consulta.data}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Horário</h3>
                      <p className="text-gray-800">{consulta.horario}</p>
                    </div>
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">Local</h3>
                      <p className="text-gray-800">{consulta.endereco}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button 
                      onClick={() => setDetalhesConsulta(consulta)}
                      className="px-4 py-2 text-blue-600 border border-blue-300 rounded hover:bg-blue-50"
                    >
                      Ver detalhes
                    </button>
                    {consulta.status === "agendado" && (
                      <>
                        <button 
                          onClick={() => remarcarConsulta(consulta.id)}
                          className="px-4 py-2 text-blue-600 border border-blue-300 rounded hover:bg-blue-50"
                        >
                          Remarcar
                        </button>
                        <button 
                          onClick={() => cancelarConsulta(consulta.id)}
                          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      {detalhesConsulta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
                <h3 className="font-medium text-gray-500">Médico</h3>
                <p className="text-lg text-gray-800">{detalhesConsulta.medico}</p>
                <p className="text-blue-600">{detalhesConsulta.especialidade}</p>
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
                <h3 className="font-medium text-gray-500">Endereço</h3>
                <p className="text-gray-800">{detalhesConsulta.endereco}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-500">Status</h3>
                <p className={`inline-block px-3 py-1 rounded-full ${
                  detalhesConsulta.status === "agendado" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {detalhesConsulta.status === "agendado" ? "Agendado" : "Cancelado"}
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