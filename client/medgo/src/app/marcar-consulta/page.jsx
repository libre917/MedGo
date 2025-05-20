"use client";

import { useState } from "react";

export default function MarcarConsulta() {
  // Dados mockados
  const clinicas = [
    { id: 1, nome: "Clínica Médica Central", endereco: "Av. Paulista, 1000 - São Paulo/SP" },
    { id: 2, nome: "Clínica Saúde Integral", endereco: "Rua Augusta, 500 - São Paulo/SP" },
    { id: 3, nome: "Instituto de Bem-Estar", endereco: "Alameda Santos, 200 - São Paulo/SP" }
  ];

  const medicos = [
    { id: 1, nome: "Dra. Ana Claudia Souza", especialidade: "Cardiologia", clinicaId: 1 },
    { id: 2, nome: "Dr. Carlos Eduardo Lima", especialidade: "Ortopedia", clinicaId: 1 },
    { id: 3, nome: "Dra. Juliana Santos", especialidade: "Dermatologia", clinicaId: 2 },
    { id: 4, nome: "Dr. Marcelo Vieira", especialidade: "Neurologia", clinicaId: 3 }
  ];

  const horariosDisponiveis = [
    { id: 1, medicoId: 1, data: "15/06/2024", horarios: ["09:00", "10:30", "14:00", "15:30"] },
    { id: 2, medicoId: 2, data: "15/06/2024", horarios: ["08:00", "11:00", "13:30", "16:00"] },
    { id: 3, medicoId: 3, data: "16/06/2024", horarios: ["10:00", "11:30", "14:30", "17:00"] },
    { id: 4, medicoId: 4, data: "17/06/2024", horarios: ["09:30", "11:00", "15:00"] }
  ];

  // Estados do formulário
  const [passo, setPasso] = useState(1);
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // Filtrar médicos pela clínica selecionada
  const medicosDaClinica = clinicaSelecionada 
    ? medicos.filter(medico => medico.clinicaId === clinicaSelecionada.id) 
    : [];

  // Filtrar horários pelo médico selecionado
  const horariosDoMedico = medicoSelecionado 
    ? horariosDisponiveis.find(horario => horario.medicoId === medicoSelecionado.id) 
    : null;

  // Função para avançar nos passos
  const proximoPasso = () => {
    if (
      (passo === 1 && clinicaSelecionada) ||
      (passo === 2 && medicoSelecionado) ||
      (passo === 3 && dataSelecionada && horarioSelecionado)
    ) {
      setPasso(passo + 1);
    } else {
      alert("Por favor, selecione uma opção antes de continuar");
    }
  };

  // Função para finalizar o agendamento
  const finalizarAgendamento = () => {
    const consulta = {
      clinica: clinicaSelecionada,
      medico: medicoSelecionado,
      data: dataSelecionada,
      horario: horarioSelecionado,
      observacoes,
      status: "agendado"
    };
    
    alert(`Consulta marcada com sucesso!\n\nDetalhes:\nClínica: ${consulta.clinica.nome}\nMédico: ${consulta.medico.nome}\nData: ${consulta.data}\nHorário: ${consulta.horario}`);
    // Aqui você enviaria os dados para a API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Agendar Consulta</h1>
          <p className="text-lg text-indigo-600">Preencha as informações passo a passo</p>
        </div>

        {/* Indicador de Passos */}
        <div className="flex justify-between mb-10 relative">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                passo >= step ? "bg-indigo-600" : "bg-gray-300"
              }`}>
                {step}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                {step === 1 && "Clínica"}
                {step === 2 && "Médico"}
                {step === 3 && "Horário"}
                {step === 4 && "Confirmar"}
              </span>
            </div>
          ))}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-1">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300" 
              style={{ width: `${(passo - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Passo 1 - Selecionar Clínica */}
        {passo === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Selecione a Clínica</h2>
            <div className="space-y-4">
              {clinicas.map((clinica) => (
                <div 
                  key={clinica.id}
                  onClick={() => setClinicaSelecionada(clinica)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    clinicaSelecionada?.id === clinica.id 
                      ? "border-indigo-500 bg-indigo-50" 
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <h3 className="font-bold text-lg text-gray-800">{clinica.nome}</h3>
                  <p className="text-gray-600">{clinica.endereco}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Passo 2 - Selecionar Médico */}
        {passo === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Selecione o Médico</h2>
            <div className="mb-4 p-4 bg-indigo-50 rounded-lg">
              <p className="font-medium text-indigo-800">Clínica selecionada:</p>
              <p className="text-gray-800">{clinicaSelecionada.nome}</p>
            </div>
            <div className="space-y-4">
              {medicosDaClinica.map((medico) => (
                <div 
                  key={medico.id}
                  onClick={() => setMedicoSelecionado(medico)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    medicoSelecionado?.id === medico.id 
                      ? "border-indigo-500 bg-indigo-50" 
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <h3 className="font-bold text-lg text-gray-800">{medico.nome}</h3>
                  <p className="text-indigo-600">{medico.especialidade}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Passo 3 - Selecionar Horário */}
        {passo === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Selecione o Horário</h2>
            <div className="mb-4 p-4 bg-indigo-50 rounded-lg">
              <p className="font-medium text-indigo-800">Médico selecionado:</p>
              <p className="text-gray-800">{medicoSelecionado.nome} - {medicoSelecionado.especialidade}</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Data da Consulta</label>
              <select
                value={dataSelecionada}
                onChange={(e) => {
                  setDataSelecionada(e.target.value);
                  setHorarioSelecionado("");
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Selecione uma data</option>
                {horariosDisponiveis
                  .filter(h => h.medicoId === medicoSelecionado.id)
                  .map((h) => (
                    <option key={h.id} value={h.data}>{h.data}</option>
                  ))}
              </select>
            </div>

            {dataSelecionada && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Horários Disponíveis</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {horariosDisponiveis
                    .find(h => h.medicoId === medicoSelecionado.id && h.data === dataSelecionada)
                    ?.horarios.map((horario) => (
                      <button
                        key={horario}
                        onClick={() => setHorarioSelecionado(horario)}
                        className={`p-3 border rounded-lg text-center ${
                          horarioSelecionado === horario
                            ? "bg-indigo-600 text-white border-indigo-700"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-indigo-50"
                        }`}
                      >
                        {horario}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Passo 4 - Confirmar Agendamento */}
        {passo === 4 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirme seu Agendamento</h2>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-gray-500 font-medium">Clínica</p>
                <p className="text-lg font-semibold">{clinicaSelecionada.nome}</p>
                <p className="text-gray-600">{clinicaSelecionada.endereco}</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-gray-500 font-medium">Médico</p>
                <p className="text-lg font-semibold">{medicoSelecionado.nome}</p>
                <p className="text-indigo-600">{medicoSelecionado.especialidade}</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-gray-500 font-medium">Data e Horário</p>
                <p className="text-lg font-semibold">{dataSelecionada} às {horarioSelecionado}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Observações (opcional)</label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Alguma informação adicional que deseja informar..."
              ></textarea>
            </div>
          </div>
        )}

        {/* Navegação entre passos */}
        <div className="mt-8 flex justify-between">
          {passo > 1 && (
            <button
              onClick={() => setPasso(passo - 1)}
              className="px-6 py-3 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition"
            >
              Voltar
            </button>
          )}
          
          {passo < 4 ? (
            <button
              onClick={proximoPasso}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition ml-auto"
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={finalizarAgendamento}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition ml-auto"
            >
              Confirmar Agendamento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}