"use client";
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faXmark, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const API_URL = "http://localhost:3001"

import { useState } from "react";
import { useEffect } from "react";

async function listarClinicas() {
  try {
    const response = await axios.get(`${API_URL}/clinicas`);
    return response.data;
  } catch (err) {
    console.error("Erro ao exibir clinicas");
    return [];
  }
}

async function listarMedicos() {
  try {
    const response = await axios.get(`${API_URL}/medicos`)
    return response.data
  } catch (err) {
    console.error("Erro ao exibir medicos");
    return [];
  }
}

async function listarHorarios() {
  try {
    const response = await axios.get(`${API_URL}/horarios`)
    return response.data
  } catch (err) {
    console.error('Erro ao exibir horarios');
    return []
  }
}

export default function MarcarConsulta() {
  const userId = localStorage.getItem("usuario");
  if (!userId) {
    setMensagemErro('Erro: Login ou cadastro necessário para funcionamento');
    setMostrarModal(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }

  const user = JSON.parse(userId)
  const [clinicas, setClinicas] = useState([]);
  const [medicos, setMedicos] = useState([])
  const [horarios, setHorarios] = useState([])

  // Estados para o modal de erro
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const fecharModal = () => {
    setMostrarModal(false);
  };

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
      setMensagemErro("Por favor, selecione uma opção antes de continuar");
      setMostrarModal(true);
    }
  };

  const finalizarAgendamento = async () => {
    if (!clinicaSelecionada || !medicoSelecionado || !dataSelecionada || !horarioSelecionado) {
      setMensagemErro("Preencha todos os campos antes de agendar.");
      setMostrarModal(true);
      return;
    }

    try {
      const id = JSON.parse(localStorage.getItem('usuario'));
      const [dia, mes] = dataSelecionada.split("/");
      const ano = new Date().getFullYear()
      const status = "a marcar";
      function verificarData(dia, mes, ano) {
        const data = new Date(ano, mes - 1, dia);
        return data.getFullYear() == ano &&
          data.getMonth() + 1 == mes &&
          data.getDate() == dia;
      }

      if (!verificarData(dia, mes, ano)) {
        setMensagemErro('Data inválida');
        setMostrarModal(true);
        return;
      }

      const consultaDate = new Date(ano, mes - 1, dia);
      if (consultaDate <= new Date()) {
        setMensagemErro('A data da consulta deve ser futura');
        setMostrarModal(true);
        return;
      }

      if (horarioSelecionado == "00:00") {
        setMensagemErro('Horário inválido');
        setMostrarModal(true);
        return
      }

      const consulta = {
        id_clinica: clinicaSelecionada.id,
        id_medico: medicoSelecionado.id,
        id_paciente: id.id,
        data: `${ano}-${mes}-${dia}`,
        hora: `${horarioSelecionado}`,
        status: status
      };

      const responseCompare = await axios.get(`${API_URL}/agendamentos`)
      const compare = responseCompare.data
      const conflito = compare.some(agenda =>
        agenda.id_medico === medicoSelecionado.id &&
        agenda.data === `${ano}-${mes}-${dia}T03:00:00.000Z` &&
        agenda.hora === horarioSelecionado
      );

      if (!conflito) {
        await axios.post(`${API_URL}/agendamentos`, consulta);
        setMensagemErro(" Agendamento realizado com sucesso! Você será redirecionado para a agenda.");
        setMostrarModal(true);
        setTimeout(() => {
          window.location.href = "/agenda";
        }, 2000);
      } else {
        setMensagemErro('Horário indisponível');
        setMostrarModal(true);
      }
    } catch (err) {
      console.error('Erro ao agendar:', err);
      setMensagemErro("Erro ao realizar o agendamento. Tente novamente.");
      setMostrarModal(true);
    }
  };

  return (
    <>
      {/* Modal de erro - VERSÃO ALTAMENTE ESTILIZADA */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          {/* Container do modal com efeito de elevação e borda sutil */}
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative border border-red-100">

            {/* Ícone de fechar (canto superior direito) */}
            <button
              onClick={fecharModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>

            {/* Cabeçalho com ícone de alerta */}
            <div className="flex flex-col items-center mb-6">
              <div className={`p-3 rounded-full mb-4 ${mensagemErro.includes('sucesso') ? 'bg-green-100/80' : 'bg-red-100/80'}`}>
                <FontAwesomeIcon
                  icon={mensagemErro.includes('sucesso') ? faCheckCircle : faTriangleExclamation}
                  className={`text-3xl ${mensagemErro.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {mensagemErro.includes('sucesso') ? 'Sucesso!' : 'Ops, algo deu errado!'}
              </h3>
            </div>

            {/* Mensagem de erro */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">{mensagemErro}</p>
              <div className="mt-4 h-1 w-20 bg-red-100 mx-auto rounded-full"></div>
            </div>

            {/* Botão de ação */}
            <div className="flex justify-center">
              <button
                onClick={fecharModal}
                className={`px-6 py-2.5 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${mensagemErro.includes('sucesso')
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-green-400'
                  : 'bg-red-600 hover:bg-red-700 focus:ring-red-400'
                  }`}
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold titulo-cor-padrao-medgo mb-2">Agendar Consulta</h1>
            <p className="text-md text-black ">Preencha as informações passo a passo</p>
          </div>

          {/* Indicador de Passos */}
          <div className="flex justify-between mb-8 relative">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${passo >= step ? "titulo-background-padrao-medgo" : "bg-gray-300"
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
                    onClick={() => {
                      setClinicaSelecionada(clinica)
                  
                    }}
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
                    onClick={() => {
                      setMedicoSelecionado(medico)
                    
                    }}
                    className={`p-3 border rounded-md cursor-pointer transition-all ${medicoSelecionado?.id === medico.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                      }`}
                  >
                    <h3 className="font-semibold text-gray-800">{medico.nome}</h3>
                    <p className="text-sm titulo-cor-padrao-medgo">{medico.especialidade}</p>
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
                <p className="font-medium titulo-cor-padrao-medgo">Médico selecionado:</p>
                <p className="text-gray-800">{medicoSelecionado.nome} - {medicoSelecionado.especialidade}</p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm">Data da Consulta</label>
                <input
                  type="text"
                  placeholder="dd/mm"
                  onChange={(e) => setDataSelecionada(e.target.value)}
                  maxLength="5"
                  pattern="\d{2}/\d{2}"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                />
              </div>


              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">Horário</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" type="text" onChange={(e) => setHorarioSelecionado(e.target.value)}>
                  {horarios.map((horario) => (
                    <option key={horario.id} value={horario.hora}>{horario.hora.slice(0, 5)}</option>
                  ))}
                </select>
              </div>

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
                  <p className=" text-black font-semibold">{dataSelecionada} às {horarioSelecionado.slice(0, 5)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navegação entre passos */}
          <div className="mt-6 flex justify-between">
            {passo > 1 && (
              <button
                onClick={() => setPasso(passo - 1)}
                className="px-4 py-2 titulo-cor-padrao-medgo cursor-pointer font-medium rounded-md hover:bg-indigo-50 transition text-sm"
              >
                Voltar
              </button>
            )}

            {passo < 4 ? (
              <button
                onClick={proximoPasso}
                className="px-4 py-2 titulo-background-padrao-medgo text-white font-medium rounded-4xl cursor-pointer hover:bg-indigo-700 transition ml-auto text-sm"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={finalizarAgendamento}
                className="px-4 py-2 bg-green-800 text-white font-medium rounded-md cursor-pointer hover:bg-green-600 transition ml-auto text-sm"
              >
                Confirmar Agendamento
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}