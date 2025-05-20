import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const cardInfos = [
    { id: "1", titulo: "Profissionais de Excelência", descricao: "Nossa equipe é formada por especialistas dedicados a oferecer um atendimento humano, ético e de alta qualidade.", path: "/home/card-img/equipe-de-jovens-medicos-especialistas-em-pe-no-corredor-hospital.jpg" },
    { id: "2", titulo: " Estrutura de Ponta", descricao: "Contamos com salas equipadas com tecnologia de última geração para garantir diagnósticos precisos e conforto no atendimento.", path: "/home/card-img/sala-de-hospital.png" }, 
    { id: "3", titulo: "Qualidade de atendimento", descricao: "Seja atendido por profissionais qualificados, que utilizam tecnologia avançada para oferecer um cuidado preciso e humanizado.", path: "/home/card-img/enfermeira-medindo-paciente-pressao-sangue.jpg" }]
  return (
    <>
      {/* Home main, titulo principal,subtitulo e imagem  */}
      <main className="w-full justify-center gap-15 grid mt-20">
        <div className="  grid gap-4  ">
          <h1 className="text-center xl:text-left md:text-center sm:text-center text-4xl titulo-cor-padrao-medgo font-semibold font-mono  ">Agendamento Online de Consultas</h1>
          <p className="text-black text-center text-sm lg:text-left   sm:w-5xl">Encontre horários disponíveis e garanta sua consulta com praticidade.</p>
        </div>

        <div className=" flex justify-left items-start w-full h-full">
          <img src="/home/imagem-hospital-generica.jpg" className=" rounded-sm w-4xl sm:w-6xl" alt="" />
        </div>


        {/* Section titulo,subtitulo, com cards e informações... */}
        <section className="w-full justify-center gap-2 grid mt-25 ">

          <div className="  mb-4 grid gap-4  ">
            <h1 className="text-center xl:text-left md:text-center sm:text-center text-4xl titulo-cor-padrao-medgo font-semibold font-mono  ">Agendamento Fácil com Clínicas de Excelência</h1>
            <p className="text-black text-center text-sm lg:text-left   sm:w-5xl">Nossa plataforma conecta você às melhores clínicas, garantindo um agendamento ágil e seguro para seu atendimento médico de qualidade.</p>
          </div>

          {/* Card */}
          <div className="grid justify-center w-full xl:flex xl:gap-3 ">
            {cardInfos.slice(0, 3).map((cardInfo) => (
              <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96" key={cardInfo.id}>
                <div className="p-4">

                  <h6 className="mb-2 text-slate-800 text-xl font-semibold titulo-cor-padrao-medgo">
                    {cardInfo.titulo}
                  </h6>


                  <p className="text-slate-600 leading-normal font-light">
                    {cardInfo.descricao}
                  </p>
                </div>
                <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                  <img src={cardInfo.path} alt="card-image" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section, anuncio do agendendamento */}
        <section className="shadow-2xs w-full grid h-200 md:h-150  md:flex justify-left  gap-20 mb-50 bg-slate-200 rounded-lg mt-10 ">

          <div className="w-sm xl:w-xl ">
            <img src="/home/card-img/medico-com-equipamento-no-ombro.jpg" className="w-full h-full rounded-sm object-cover" alt="" />
          </div>

          <div className=" w-sm grid items-center justify-items-center text-center md:justify-items-left gap-5 xl:ml-6 md:gap-0">
            <h1 className="text-center  xl:text-center  text-3xl titulo-cor-padrao-medgo font-semibold font-mono">Encontre o Melhor Horário para Você</h1>
            <p className=" truncate text-balance text-black  ">Simples, rápido e sem complicação. Agende sua consulta de forma prática e sem perder tempo.</p>
            <Link rel="stylesheet" href="/agendar" className="grid bg-transparent items-center text-black hover:bg-white font-semibold hover:text-black  border border-black hover:border-transparent rounded w-40 h-10 text-center">Agendar</Link>
          </div>

        </section>
      </main>
    </>
  );
}


