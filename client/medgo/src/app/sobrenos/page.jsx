"use client";
import React from "react";

export default function SobreNos() {
  const userId = localStorage.getItem("usuario");
  if (!userId) {
    window.location.href = "/";
    alert('Erro: Login ou cadastro necessário para funcionamento')
  }

  const faqs = [
    { id: 1, title: "O que é o MedGo?", description: "O MedGo é um sistema digital de agendamento médico, desenvolvido para facilitar a marcação e organização de consultas em clínicas e consultórios." },
    { id: 2, title: "Quem pode usar o MedGo?", description: "Pequenas clínicas, consultórios comunitários e profissionais de saúde que desejam gerenciar seus horários de forma prática e online." },
    { id: 3, title: "Como funciona o agendamento pelo MedGo?", description: "Os médicos cadastram suas disponibilidades no sistema e os pacientes marcam consultas pelo celular ou computador, de forma rápida e segura." },
    { id: 4, title: "O MedGo substitui o agendamento manual?", description: "Sim! O MedGo elimina o uso de cadernos e planilhas, reduzindo erros, conflitos de horário e perda de informações." },
    { id: 5, title: "Posso usar o MedGo em qualquer região?", description: "Sim, o sistema pode ser utilizado por clínicas e consultórios de diversas regiões, desde que tenham acesso à internet." },
    { id: 6, title: "O MedGo é fácil de usar?", description: "Sim! Nossa plataforma foi desenvolvida para ser simples e intuitiva para profissionais e pacientes." },
    { id: 7, title: "O sistema permite cancelamento e reagendamento?", description: "Sim, tanto pacientes quanto profissionais podem cancelar ou reagendar consultas facilmente pelo sistema." },
    { id: 8, title: "Como o MedGo protege os dados dos pacientes?", description: "Utilizamos protocolos de segurança para garantir a privacidade e proteção das informações pessoais e médicas." },
    { id: 9, title: "Posso integrar o MedGo com outros sistemas?", description: "Atualmente, o MedGo funciona como uma plataforma independente, mas estamos avaliando integrações futuras conforme a demanda." },
    { id: 10, title: "Existe suporte para dúvidas ou problemas técnicos?", description: "Sim, nossa equipe de suporte está disponível para ajudar em qualquer dúvida ou dificuldade." },
    { id: 11, title: "É necessário treinamento para usar o MedGo?", description: "O sistema é muito intuitivo, mas oferecemos orientações e materiais para facilitar a adaptação de todos os usuários." },
    { id: 12, title: "Como posso contratar o MedGo para minha clínica?", description: "Basta entrar em contato conosco pelo site ou telefone para receber informações sobre planos e implantação." }
  ]

  return (

    <div className="min-h-screen  from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 space-y-6 z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              <span className="text-black">MED<span className="titulo-cor-padrao-medgo">GO</span></span>
            </h1>
            <p className="text-xl text-gray-600">
              Um sistema de agendamento médico digital, criado para clínicas e consultórios que buscam mais organização, agilidade e eficiência no dia a dia.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-[#004aad]/10 px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#004aad]"></div>
                <span className="text-[#004aad] font-medium">Centenas de agendamentos por semana</span>
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
                O <strong>MedGo</strong>  surgiu para resolver um problema comum em pequenas clínicas e consultórios:  o agendamento manual de consultas, feito em cadernos ou planilhas, que frequentemente causava atrasos, conflitos de horário e perda de dados.
              </p>
              <p className="text-lg text-gray-600">
                <strong>Nossa história</strong> começou com a Clínica Comunitária Vida Plena, no bairro fictício de Parque Esperança, que atende mais de 150 pacientes por semana. Enfrentando dificuldades com agendamentos manuais, a coordenadora <strong>Enfermeira Carla Ribeiro</strong>  buscou a Escola Técnica Municipal de Aplicação para criar uma solução simples e acessível.
              </p>
              <p className="text-lg text-gray-600">
                Assim <strong>nasceu</strong> o  <strong>MedGo</strong>: um sistema digital que permite a médicos e pacientes gerenciar consultas de forma rápida, online e organizada — pelo celular ou computador.
              </p>
              <p className="text-lg text-gray-600">
                Com o <strong>sucesso na Vida Plena</strong>, o MedGo se expandiu para outras clínicas, facilitando centenas de agendamentos por semana e ajudando mais instituições de saúde a modernizar seus processos.
                Seguimos com a mesma <strong> missão</strong>: tornar o agendamento médico mais <strong>simples, eficiente e acessível</strong>  para todos.
              </p>
              <div className="bg-[#004aad]/5 p-6 rounded-xl border-l-4 border-[#004aad]">
                <p className="text-[#004aad] italic">
                  “O MedGo transformou nossa rotina. Antes, perdíamos tempo com remarcações e desencontros. Agora, tudo é mais organizado e conseguimos focar no que realmente importa: o cuidado com os pacientes.”
                </p>
                <p className="mt-2 font-medium text-[#004aad]">- Enf. Carla Ribeiro</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#004aad]/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-[#004aad]">200+</p>
                <p className="text-gray-600">Pacientes atendidos por semana
                  com agendamentos organizados e mais agilidade no atendimento.</p>
              </div>
              <div className="bg-[#004aad]/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-[#004aad]">12+</p>
                <p className="text-gray-600">Profissionais de saúde utilizando o MedGo para gerenciar horários de forma prática e eficiente.</p>
              </div>
              <div className="bg-[#004aad]/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-[#004aad]">90%</p>
                <p className="text-gray-600">Redução de falhas no agendamento</p>
              </div>
              <div className="bg-[#004aad]/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-[#004aad]">2</p>
                <p className="text-gray-600">Anos servindo a comunidade</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dúvidas <span className="text-[#004aad]">Frequentes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços e atendimento
          </p>
        </div>

        <div className="space-y-4">
          {/* FAQ Item  */}

          {faqs.map((faq, index) => (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <details className="group" >



                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3" >


                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#004aad]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-gray-900">{faq.title}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 transform group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <div className="p-4 bg-white">
                  <p className="text-gray-600">
                    {faq.description}
                  </p>
                </div>

              </details>
            </div>

          ))}
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
                style={{ border: 0 }}
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