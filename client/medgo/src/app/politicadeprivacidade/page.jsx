"use client";
import { useState } from "react";
import Link from "next/link";

export default function PoliticaPrivacidade() {
  
  const [abrirSecao, setAbrirSecao] = useState(null);

  const toggleSecao = (secao) => {
    setAbrirSecao(abrirSecao === secao ? null : secao);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        {/* Cabeçalho */}
        <button><Link href="/cadastro" className="titulo-background-padrao-medgo hover-background-padrao-medgo text-white px-2 py-2 md:px-3 md:py-3 rounded-4xl pointer transition">Voltar</Link></button>
        <div className="text-center mb-10 mt-6">
          <h1 className="text-3xl font-bold titulo-cor-padrao-medgo mb-2">Política de Privacidade</h1>
          <p className="text-lg text-gray-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        {/* Introdução */}
        <section className="mb-8">
          <p className="text-black mb-4">
            A MedGo valoriza a privacidade e a segurança dos dados dos seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossos serviços de agendamento médico.
          </p>
          <p className="text-black">
            Ao utilizar nosso site e serviços, você concorda com os termos desta Política de Privacidade.
          </p>
        </section>

        {/* Seções expansíveis */}
        <div className="space-y-4">
          {/* Seção 1 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSecao(1)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <h2 className="text-xl font-semibold titulo-cor-padrao-medgo">1. Informações que Coletamos</h2>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${abrirSecao === 1 ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {abrirSecao === 1 && (
              <div className="p-6 space-y-3">
                <p className="text-gray-700">Coletamos os seguintes tipos de informações:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>Dados pessoais:</strong> Nome completo, CPF, data de nascimento, telefone, e-mail, endereço</li>
                  <li><strong>Dados médicos:</strong> Histórico de agendamentos, especialidades procuradas</li>
                  <li><strong>Dados de acesso:</strong> Endereço IP, tipo de navegador, páginas visitadas</li>
                  <li><strong>Dados de pagamento:</strong> Apenas quando necessário para cobrança de serviços</li>
                </ul>
              </div>
            )}
          </div>

          {/* Seção 2 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSecao(2)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <h2 className="text-xl font-semibold titulo-cor-padrao-medgo">2. Como Usamos Suas Informações</h2>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${abrirSecao === 2 ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {abrirSecao === 2 && (
              <div className="p-6 space-y-3">
                <p className="text-gray-700">Utilizamos seus dados para:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Fornecer e melhorar nossos serviços de agendamento</li>
                  <li>Comunicar-se sobre consultas e serviços relacionados</li>
                  <li>Personalizar sua experiência na plataforma</li>
                  <li>Cumprir obrigações legais e regulatórias</li>
                  <li>Prevenir fraudes e garantir a segurança</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Não compartilhamos seus dados médicos sem sua autorização explícita, exceto quando exigido por lei.
                </p>
              </div>
            )}
          </div>

          {/* Seção 3 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSecao(3)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <h2 className="text-xl font-semibold titulo-cor-padrao-medgo">3. Compartilhamento de Dados</h2>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${abrirSecao === 3 ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {abrirSecao === 3 && (
              <div className="p-6 space-y-3">
                <p className="text-gray-700">Seus dados podem ser compartilhados com:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Profissionais de saúde e clínicas parceiras para agendamento de consultas</li>
                  <li>Prestadores de serviços que auxiliam na operação da plataforma (com contratos de confidencialidade)</li>
                  <li>Autoridades competentes quando exigido por lei</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Não vendemos ou alugamos seus dados pessoais para terceiros não relacionados aos serviços médicos.
                </p>
              </div>
            )}
          </div>

          {/* Seção 4 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSecao(4)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <h2 className="text-xl font-semibold titulo-cor-padrao-medgo">4. Segurança dos Dados</h2>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${abrirSecao === 4 ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {abrirSecao === 4 && (
              <div className="p-6 space-y-3">
                <p className="text-gray-700">Implementamos medidas de segurança robustas:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Criptografia de dados em trânsito e em repouso</li>
                  <li>Controle de acesso restrito às informações</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Backups regulares</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Apesar de nossos esforços, nenhum sistema é 100% seguro. Recomendamos que você proteja suas credenciais de acesso e não compartilhe senhas.
                </p>
              </div>
            )}
          </div>

          {/* Seção 5 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSecao(5)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <h2 className="text-xl font-semibold titulo-cor-padrao-medgo">5. Seus Direitos</h2>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${abrirSecao === 5 ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {abrirSecao === 5 && (
              <div className="p-6 space-y-3">
                <p className="text-gray-700">De acordo com a LGPD, você tem direito a:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir informações incompletas ou desatualizadas</li>
                  <li>Solicitar a exclusão de dados (exceto quando a retenção for obrigatória por lei)</li>
                  <li>Revogar consentimentos dados</li>
                  <li>Solicitar a portabilidade de dados</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Para exercer esses direitos, entre em contato através do e-mail: <strong>privacidade@medgo.com.br</strong>
                </p>
              </div>
            )}
          </div>

          {/* Seção 6 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSecao(6)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <h2 className="text-xl font-semibold titulo-cor-padrao-medgo">6. Alterações na Política</h2>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${abrirSecao === 6 ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {abrirSecao === 6 && (
              <div className="p-6">
                <p className="text-gray-700">
                  Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos os usuários sobre mudanças significativas através do e-mail cadastrado ou por meio de aviso em nosso site. A data da última atualização sempre será indicada no topo deste documento.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contato */}
        <section className="mt-10 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold titulo-cor-padrao-medgo mb-3">Dúvidas e Contato</h2>
          <p className="text-gray-700">
            Para quaisquer questões sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados (DPO):
          </p>
          <ul className="mt-3 space-y-1 text-gray-700">
            <li><strong>E-mail:</strong> dpo@medgo.com.br</li>
            <li><strong>Telefone:</strong> (11) 1234-5678</li>
            <li><strong>Endereço:</strong> Av. Paulista, 1000 - São Paulo/SP</li>
          </ul>
        </section>
      </div>
    </div>
  );
}