"use client";
import React from "react";

export default function SobreNos() {
  const userId = localStorage.getItem("usuario");
  if(!userId){
    window.location.href = "/";
    alert('Erro: Login ou cadastro necessário para funcionamento')
  }
  return (
    <div className="min-h-screen  from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 space-y-6 z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Clínica <span className="text-[#004aad]">Vida Plena</span>
            </h1>
            <p className="text-xl text-gray-600">
              Atendendo a comunidade de Parque Esperança com cuidado e excelência desde 2015.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-[#004aad]/10 px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#004aad]"></div>
                <span className="text-[#004aad] font-medium">+150 pacientes/semana</span>
              </div>
              <div className="bg-[#004aad]/10 px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#004aad]"></div>
                <span className="text-[#004aad] font-medium">Agendamento digital</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-200 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef" 
                alt="Recepção da Clínica Vida Plena" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Nossa <span className="text-[#004aad]">História</span>
              </h2>
              <p className="text-lg text-gray-600">
                Fundada em 2015 pela Enfermeira Carla Ribeiro, a Clínica Vida Plena surgiu para levar atendimento médico de qualidade ao bairro Parque Esperança, uma região carente de serviços de saúde.
              </p>
              <p className="text-lg text-gray-600">
                Em 2020, em parceria com a Escola Técnica Municipal, modernizamos nosso sistema de agendamento, substituindo os cadernos manuais por uma plataforma digital que reduziu em 90% os erros de marcação.
              </p>
              <div className="bg-[#004aad]/5 p-6 rounded-xl border-l-4 border-[#004aad]">
                <p className="text-[#004aad] italic">
                  "Nosso compromisso é unir tecnologia e humanização para oferecer o melhor atendimento à nossa comunidade."
                </p>
                <p className="mt-2 font-medium text-[#004aad]">- Enf. Carla Ribeiro, Fundadora</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#004aad]/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-[#004aad]">150+</p>
                <p className="text-gray-600">Pacientes atendidos semanalmente</p>
              </div>
              <div className="bg-[#004aad]/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-[#004aad]">12</p>
                <p className="text-gray-600">Profissionais de saúde</p>
              </div>
              <div className="bg-[#004aad]/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-[#004aad]">90%</p>
                <p className="text-gray-600">Redução de falhas no agendamento</p>
              </div>
              <div className="bg-[#004aad]/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-[#004aad]">8</p>
                <p className="text-gray-600">Anos servindo a comunidade</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dúvidas <span className="text-[#004aad]">Frequentes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços e atendimento
          </p>
        </div>

        <div className="space-y-4">
          {/* FAQ Item 1 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group" open>
              <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#004aad]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-900">Quais são os horários de funcionamento?</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 transform group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              <div className="p-4 bg-white">
                <p className="text-gray-600">
                  Atendemos de segunda a sexta das 7h às 19h, e aos sábados das 8h às 12h. Para emergências fora deste horário, entre em contato pelo telefone (11) 98765-4321.
                </p>
              </div>
            </details>
          </div>

          {/* FAQ Item 2 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#004aad]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-900">Como faço para marcar uma consulta?</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 transform group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              <div className="p-4 bg-white">
                <p className="text-gray-600">
                  Você pode marcar consultas de três formas: 1) Pelo nosso site, na seção "Agenda"; 2) Por telefone no (11) 1234-5678; ou 3) Presencialmente em nossa recepção. Recomendamos o agendamento prévio para melhor atendimento.
                </p>
              </div>
            </details>
          </div>


   {/* FAQ Item  */}

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#004aad]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-900">Como faço para marcar uma consulta?</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 transform group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              <div className="p-4 bg-white">
                <p className="text-gray-600">
                  Você pode marcar consultas de três formas: 1) Pelo nosso site, na seção "Agenda"; 2) Por telefone no (11) 1234-5678; ou 3) Presencialmente em nossa recepção. Recomendamos o agendamento prévio para melhor atendimento.
                </p>
              </div>
            </details>
          </div>

          {/* FAQ Item 3 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#004aad]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-900">Vocês aceitam meu plano de saúde?</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 transform group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              <div className="p-4 bg-white">
                <p className="text-gray-600">
                  Atendemos os principais convênios médicos da região, incluindo Amil, Unimed, Bradesco Saúde e SulAmérica. Para confirmar se seu plano é aceito, entre em contato conosco pelo telefone (11) 1234-5678 ou pelo fax (11) 1234-5679.
                </p>
              </div>
            </details>
          </div>

          {/* FAQ Item 4 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#004aad]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-900">Como posso enviar exames ou documentos?</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 transform group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              <div className="p-4 bg-white">
                <p className="text-gray-600">
                  Documentos podem ser enviados por três vias: 1) Presencialmente em nossa recepção; 2) Pelo fax (11) 1234-5679; ou 3) Digitalmente através do e-mail documentos@vidaplena.org.br. Para garantir a privacidade, documentos sensíveis devem ser entregues pessoalmente.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-[#004aad]/5 rounded-2xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossas <span className="text-[#004aad]">Especialidades</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça as áreas médicas que atendemos com excelência
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Clínica Geral */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#004aad]/10 p-3 rounded-lg">
                <img src="https://img.icons8.com/color/48/medical-doctor.png" alt="Clínica Geral" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Clínica Geral</h3>
            </div>
            <p className="text-gray-600">
              Atendimento completo para adultos e crianças, com foco em prevenção e diagnóstico precoce de doenças.
            </p>
          </div>

          {/* Pediatria */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#004aad]/10 p-3 rounded-lg">
                <img src="https://img.icons8.com/color/48/baby-feet.png" alt="Pediatria" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Pediatria</h3>
            </div>
            <p className="text-gray-600">
              Cuidados especializados para crianças e adolescentes, acompanhamento de crescimento e vacinação.
            </p>
          </div>

          {/* Ginecologia */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#004aad]/10 p-3 rounded-lg">
                <img src="https://img.icons8.com/color/48/women-health.png" alt="Ginecologia" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Ginecologia</h3>
            </div>
            <p className="text-gray-600">
              Saúde integral da mulher em todas as fases da vida, com atendimento humanizado e acolhedor.
            </p>
          </div>

          {/* Cardiologia */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#004aad]/10 p-3 rounded-lg">
                <img src="https://img.icons8.com/color/48/heart-health.png" alt="Cardiologia" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Cardiologia</h3>
            </div>
            <p className="text-gray-600">
              Prevenção, diagnóstico e tratamento de doenças cardiovasculares com acompanhamento personalizado.
            </p>
          </div>

          {/* Ortopedia */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#004aad]/10 p-3 rounded-lg">
                <img src="https://img.icons8.com/color/48/orthopedic.png" alt="Ortopedia" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Ortopedia</h3>
            </div>
            <p className="text-gray-600">
              Tratamento de problemas musculoesqueléticos com técnicas modernas e reabilitação especializada.
            </p>
          </div>

          {/* Geriatria */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#004aad]/10 p-3 rounded-lg">
                <img src="https://img.icons8.com/color/48/elderly-person.png" alt="Geriatria" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Geriatria</h3>
            </div>
            <p className="text-gray-600">
              Cuidados especializados para idosos, promovendo qualidade de vida e saúde na terceira idade.
            </p>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Venha nos <span className="text-[#004aad]">Visitar</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#004aad]/10 p-3 rounded-full flex-shrink-0">
                    <img src="https://img.icons8.com/ios-filled/50/004aad/marker.png" alt="Endereço" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Endereço</h4>
                    <p className="text-gray-600">Rua da Esperança, 123</p>
                    <p className="text-gray-600">Parque Esperança - São Paulo/SP</p>
                    <p className="text-gray-600">CEP: 12345-678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#004aad]/10 p-3 rounded-full flex-shrink-0">
                    <img src="https://img.icons8.com/ios-filled/50/004aad/clock.png" alt="Horário" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Horário de Atendimento</h4>
                    <p className="text-gray-600">Segunda a Sexta: 7h às 19h</p>
                    <p className="text-gray-600">Sábados: 8h às 12h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#004aad]/10 p-3 rounded-full flex-shrink-0">
                    <img src="https://img.icons8.com/ios-filled/50/004aad/phone.png" alt="Telefone" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Contato</h4>
                    <p className="text-gray-600"><strong>Telefone:</strong> (11) 1234-5678</p>
                    <p className="text-gray-600"><strong>WhatsApp:</strong> (11) 98765-4321</p>
                    <p className="text-gray-600"><strong>Fax:</strong> (11) 1234-5679</p>
                    <p className="text-gray-600"><strong>Email:</strong> contato@vidaplena.org.br</p>
                    <p className="text-gray-600"><strong>Documentos:</strong> documentos@vidaplena.org.br</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 h-96 rounded-xl overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0754267452926!2d-46.65342658440771!3d-23.565734367638793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1623868126984!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                title="Localização da Clínica Vida Plena"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}