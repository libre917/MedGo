import React from "react";

export default function SobreNos() {
  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10">
      <section className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-10 flex flex-col md:flex-row gap-10 items-center">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-blue-600 text-sm uppercase tracking-widest font-semibold">Quem somos</h2>
          <h1 className="text-3xl font-bold text-slate-800">Construindo soluções com empatia e tecnologia</h1>
          <p className="text-slate-600 text-base">
            Acreditamos que a saúde pode ser mais humana e acessível com o uso inteligente da tecnologia. Nossa equipe é formada por profissionais apaixonados por inovação e cuidado.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
          alt="Equipe minimalista"
          className="rounded-xl shadow-md md:w-1/2"
        />
      </section>

      <section className="max-w-2xl mx-auto p-4 bg-white rounded-2xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Perguntas Frequentes</h2>

        <details className="group p-4 border border-slate-200 rounded-xl">
          <summary className="flex items-center cursor-pointer gap-4 font-semibold text-slate-700 transition-colors group-hover:text-blue-600 [&::-webkit-details-marker]:hidden">
            <img src="https://img.icons8.com/ios/50/calendar--v1.png" alt="Agendamento" className="w-6 h-6" />
            Como posso marcar uma consulta?
            <svg className="ml-auto h-4 w-4 transition group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </summary>
          <p className="mt-2 text-slate-600">
            Basta clicar na aba <strong>Agenda</strong> e escolher um dos horários disponíveis para agendar sua consulta rapidamente.
          </p>
        </details>

        <details className="group p-4 border border-slate-200 rounded-xl">
          <summary className="flex items-center cursor-pointer gap-4 font-semibold text-slate-700 transition-colors group-hover:text-blue-600 [&::-webkit-details-marker]:hidden">
            <img src="https://img.icons8.com/color/48/paint-palette.png" alt="Customização" className="w-6 h-6" />
            Os componentes estão disponíveis apenas em verde?
            <svg className="ml-auto h-4 w-4 transition group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </summary>
          <p className="mt-2 text-slate-600">
            Não! Todos os componentes são facilmente customizáveis para atender ao seu projeto com qualquer cor ou estilo.
          </p>
        </details>

        <details className="group p-4 border border-slate-200 rounded-xl">
          <summary className="flex items-center cursor-pointer gap-4 font-semibold text-slate-700 transition-colors group-hover:text-blue-600 [&::-webkit-details-marker]:hidden">
            <img src="https://img.icons8.com/fluency/48/source-code.png" alt="Código aberto" className="w-6 h-6" />
            O WindUI é open source?
            <svg className="ml-auto h-4 w-4 transition group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </summary>
          <p className="mt-2 text-slate-600">
            Ainda não é um projeto open source, mas planejamos isso para o futuro. Fique ligado!
          </p>
        </details>

        <details className="group p-4 border border-slate-200 rounded-xl">
          <summary className="flex items-center cursor-pointer gap-4 font-semibold text-slate-700 transition-colors group-hover:text-blue-600 [&::-webkit-details-marker]:hidden">
            <img src="https://img.icons8.com/ios-filled/50/000000/idea.png" alt="Ideias" className="w-6 h-6" />
            Como posso ajudar a melhorar o WindUI?
            <svg className="ml-auto h-4 w-4 transition group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </summary>
          <p className="mt-2 text-slate-600">
            Envie feedbacks e sugestões no nosso canal do Discord. Sua opinião é muito importante para nós!
          </p>
        </details>
      </section>
    </div>
  );
}
