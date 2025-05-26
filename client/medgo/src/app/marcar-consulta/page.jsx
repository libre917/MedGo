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

export default function MarcarConsulta() {
  const userId = localStorage.getItem("usuario");
  if(!userId){
    alert('Erro: Login ou cadastro necessário para funcionamento')
    window.location.href = "/";
  }

  const user = JSON.parse(userId)
    // setUserName(user.nome);
  const [clinicas, setClinicas] = useState([]);
  const [medicos, setMedicos] = useState([])

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

  // Filtrar horários pelo médico selecionado
  // const horariosDoMedico = medicoSelecionado 
  //   ? horariosDisponiveis.find(horario => horario.medicoId === medicoSelecionado.id) 
  //   : null;

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
  const id = JSON.parse(localStorage.getItem('usuario'))
  const [dia, mes, ano] = dataSelecionada.split(" ")
  const data = [ano, mes, dia]
       const status = "marcado"
       const consulta = {
        id_clinica: clinicaSelecionada?.id,
        id_medico: medicoSelecionado?.id,
        id_paciente: id.id,
        data: `${ano}-${mes}-${dia}`,
        horario: horarioSelecionado+":00",
        status: status
      };
  
  console.log(clinicaSelecionada, medicoSelecionado, id.id, ano, mes, dia, data, horarioSelecionado, status)
  console.log('Consulta----',consulta)



  const finalizarAgendamento = async () => {
    if (!clinicaSelecionada || !medicoSelecionado || !dataSelecionada || !horarioSelecionado) {
      alert("Preencha todos os campos antes de agendar.");
      return;
    }
  
    try {
      const id = JSON.parse(localStorage.getItem('usuario'));
      const [dia, mes, ano] = dataSelecionada.split(" ");
      const status = "marcado";
  
      const consulta = {
        id_clinica: clinicaSelecionada.id,
        id_medico: medicoSelecionado.id,
        id_paciente: id.id,
        data: `${ano}-${mes}-${dia}`,
        hora: `${horarioSelecionado}:00`,
        status: status
      };
  
      console.log("Enviando para API:", consulta);
      await axios.post(`http://localhost:3000/Agendamentos`, consulta);
  
      alert("Agendamento realizado com sucesso!");
      window.location.href = "/marcar-agendadem";
    } catch (err) {
      console.error('Erro ao agendar:', err.response?.data || err.message);
      alert("Erro ao realizar o agendamento. Tente novamente.");
    }
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
                  <p className="text-gray-600">{clinica.telefone}</p>
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

        {passo === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Selecione o Horário</h2>
            <div className="mb-4 p-4 bg-indigo-50 rounded-lg">
              <p className="font-medium text-indigo-800">Médico selecionado:</p>
              <p className="text-gray-800">{medicoSelecionado.nome} - {medicoSelecionado.especialidade}</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Digite a Data da Consulta</label>
              <form action="text" className="text-black">
              <input type="text" placeholder="dd mm aaaa" onChange={(e) => setDataSelecionada(e.target.value)} pattern="\d{2} \d{2} \d{4}" required />
              </form>
              {/* <select
                value={dataSelecionada}
                onChange={(e) => {
                  setDataSelecionada(e.target.value);
                  setHorarioSelecionado("");
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Selecione uma data</option>
                {horariosDisponiveis
                  .map((h) => (
                    <option key={h.id} value={h.data}>{h.data}</option>
                  ))}
              </select> */}
            </div>

            {dataSelecionada && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Digite o Horário</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                 <form action="text">
                  <input type="text" placeholder="hh:mm" pattern="\d{2}/\d{2}" onChange={(e) => setHorarioSelecionado(e.target.value)} required  className="text-black"/>
                 </form>
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