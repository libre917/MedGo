"use client";
import axios from "axios"
const API_URL = "http://localhost:3000"

import { useState } from "react";
import { useEffect } from "react";

async function listarClinicas() {
  try {
    const response = await axios.get(`${API_URL}/Clinicas`);
    return response.data;
  } catch (err) {
    console.error("Erro ao exibir clinicas");
    return [];
  }
}

async function listarMedicos() {
  try {
    const response = await axios.get(`${API_URL}/Medicos`)
    return response.data
  } catch (err) {
    console.error("Erro ao exibir medicos");
    return [];
  }
}

async function listarHorarios() {
  try {
    const response = await axios.get(`${API_URL}/Horarios`)
    return response.data
  } catch ( err) {
    console.error('Erro ao exibir horarios');
    return []
  }
}

export default function MarcarConsulta() {
  const userId = localStorage.getItem("usuario");
  if (!userId) {
    alert('Erro: Login ou cadastro necessário para funcionamento')
    window.location.href = "/";
  }

  const user = JSON.parse(userId)
  const [clinicas, setClinicas] = useState([]);
  const [medicos, setMedicos] = useState([])
  const [horarios, setHorarios] = useState([])

  useEffect(() => {
    async function fetchClinicas() {
      const dados = await listarClinicas();
      setClinicas(dados);
    }
    fetchClinicas();
  }, []);

  useEffect(() => {
    async function fetchMedicos() {
      const dados = await listarMedicos();
      setMedicos(dados);
    }
    fetchMedicos();
  }, []);

  useEffect(() => {
    async function fetchHorarios() {
      const dados = await listarHorarios();
      setHorarios(dados);
    }
    fetchHorarios();
  }, []);

  // Estados do formulário
  const [passo, setPasso] = useState(1);
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  // Filtrar médicos pela clínica selecionada
  const medicosDaClinica = clinicaSelecionada
    ? medicos.filter(medico => medico.id_clinica === clinicaSelecionada.id)
    : [];

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

  const finalizarAgendamento = async () => {
    if (!clinicaSelecionada || !medicoSelecionado || !dataSelecionada || !horarioSelecionado) {
      alert("Preencha todos os campos antes de agendar.");
      return;
    }
    


    try {
      const id = JSON.parse(localStorage.getItem('usuario'));
      const [dia, mes] = dataSelecionada.split("/");
      const status = "marcado";
      if(horarioSelecionado == "00:00"){
        alert('Horário inválido')
        return
      }

  
      const consulta = {
        id_clinica: clinicaSelecionada.id,
        id_medico: medicoSelecionado.id,
        id_paciente: id.id,
        data: `2025-${mes}-${dia}`,
        hora: `${horarioSelecionado}`,
        status: status
      };

      const responseCompare = await axios.get(`${API_URL}/Agendamentos`)
      const compare = responseCompare.data
      const conflito = compare.some(agenda =>
        agenda.id_medico === medicoSelecionado.id &&
        agenda.data === `2025-${mes}-${dia}T03:00:00.000Z` &&
        agenda.hora === horarioSelecionado
      );
      if(!conflito){
      await axios.post(`${API_URL}/Agendamentos`, consulta);

      alert("Agendamento realizado com sucesso!");
      window.location.href = "/agenda";} else {
        alert('Horário indisponível')
      }
    } catch (err) {
      console.error('Erro ao agendar:', err.response?.data || err.message);
      alert("Erro ao realizar o agendamento. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">Agendar Consulta</h1>
          <p className="text-md text-indigo-600">Preencha as informações passo a passo</p>
        </div>

        {/* Indicador de Passos */}
        <div className="flex justify-between mb-8 relative">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${passo >= step ? "bg-indigo-600" : "bg-gray-300"
                }`}>
                {step}
              </div>
              <span className="mt-2 text-xs font-medium text-gray-600">
                {step === 1 && "Clínica"}
                {step === 2 && "Médico"}
                {step === 3 && "Horário"}
                {step === 4 && "Confirmar"}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-1">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${(passo - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Passo 1 - Selecionar Clínica */}
        {passo === 1 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Selecione a Clínica</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {clinicas.map((clinica) => (
                <div
                  key={clinica.id}
                  onClick={() => setClinicaSelecionada(clinica)}
                  className={`p-3 border rounded-md cursor-pointer transition-all ${clinicaSelecionada?.id === clinica.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                    }`}
                >
                  <h3 className="font-semibold text-gray-800">{clinica.nome}</h3>
                  <p className="text-sm text-gray-600">{clinica.endereco}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Passo 2 - Selecionar Médico */}
        {passo === 2 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Selecione o Médico</h2>
            <div className="mb-3 p-3 bg-indigo-50 rounded-md text-sm">
              <p className="font-medium text-indigo-800">Clínica selecionada:</p>
              <p className="text-gray-800">{clinicaSelecionada.nome}</p>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {medicosDaClinica.map((medico) => (
                <div
                  key={medico.id}
                  onClick={() => setMedicoSelecionado(medico)}
                  className={`p-3 border rounded-md cursor-pointer transition-all ${medicoSelecionado?.id === medico.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                    }`}
                >
                  <h3 className="font-semibold text-gray-800">{medico.nome}</h3>
                  <p className="text-sm text-indigo-600">{medico.especialidade}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Passo 3 - Selecionar Horário */}
        {passo === 3 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Selecione o Horário</h2>
            <div className="mb-3 p-3 bg-indigo-50 rounded-md text-sm">
              <p className="font-medium text-indigo-800">Médico selecionado:</p>
              <p className="text-gray-800">{medicoSelecionado.nome} - {medicoSelecionado.especialidade}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Data da Consulta</label>
              <input
                type="text"
                placeholder="dd/mm"
                onChange={(e) => setDataSelecionada(e.target.value)}
                pattern="\d{2}/\d{2}"
                required
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              />
            </div>

            {dataSelecionada && (
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">Horário</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" type="text" onChange={(e) => setHorarioSelecionado(e.target.value)}>
                  <option value="00:00">00:00</option>
                  {horarios.map((horario) => (
                    <option key={horario.id} value={horario.hora}>{horario.hora.slice(0,5)}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Passo 4 - Confirmar Agendamento */}
        {passo === 4 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Confirme seu Agendamento</h2>

            <div className="space-y-3 mb-4">
              <div className="p-3 border border-gray-200 rounded-md">
                <p className="text-sm text-gray-500 font-medium">Clínica</p>
                <p className=" text-black font-semibold">{clinicaSelecionada.nome}</p>
                <p className="text-xs text-gray-600">{clinicaSelecionada.endereco}</p>
              </div>

              <div className="p-3 border border-gray-200 rounded-md">
                <p className="text-sm text-gray-500 font-medium">Médico</p>
                <p className=" text-black font-semibold">{medicoSelecionado.nome}</p>
                <p className="text-xs text-indigo-600">{medicoSelecionado.especialidade}</p>
              </div>

              <div className="p-3 border border-gray-200 rounded-md">
                <p className="text-sm text-gray-500 font-medium">Data e Horário</p>
                <p className=" text-black font-semibold">{dataSelecionada} às {horarioSelecionado.slice(0,5)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navegação entre passos */}
        <div className="mt-6 flex justify-between">
          {passo > 1 && (
            <button
              onClick={() => setPasso(passo - 1)}
              className="px-4 py-2 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition text-sm"
            >
              Voltar
            </button>
          )}

          {passo < 4 ? (
            <button
              onClick={proximoPasso}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition ml-auto text-sm"
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={finalizarAgendamento}
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition ml-auto text-sm"
            >
              Confirmar Agendamento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}