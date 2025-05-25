"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./home.css";

export default function Home() {
  const cardInfos = [
    {
      id: "1",
      titulo: "Profissionais de Excelência",
      descricao:
        "Nossa equipe é formada por especialistas dedicados a oferecer um atendimento humano, ético e de alta qualidade.",
      path: "/home/card-img/equipe-de-jovens-medicos-especialistas-em-pe-no-corredor-hospital.jpg",
    },
    {
      id: "2",
      titulo: " Estrutura de Ponta",
      descricao:
        "Contamos com salas equipadas com tecnologia de última geração para garantir diagnósticos precisos e conforto no atendimento.",
      path: "/home/card-img/sala-de-hospital.png",
    },
    {
      id: "3",
      titulo: "Qualidade de atendimento",
      descricao:
        "Seja atendido por profissionais qualificados, que utilizam tecnologia avançada para oferecer um cuidado preciso e humanizado.",
      path: "/home/card-img/enfermeira-medindo-paciente-pressao-sangue.jpg",
    },
  ];
  const [especialidades, setEspecialidades] = useState([
    { nome: "Clínico Geral", icon: "/icons/farmacia.png" },
    { nome: "Cardiologia", icon: "/icons/coracao.png" },
    { nome: "Dermatologia", icon: "/icons/dermatologia.png" },
    { nome: "Pediatria", icon: "/icons/pediatria.png" },
    { nome: "Ortopedia", icon: "/icons/ortopedia.png" },
    { nome: "Ginecologia", icon: "/icons/saude-sexual.png" },
    { nome: "Neurologia", icon: "/icons/neurologia.png" },
    { nome: "Psiquiatria", icon: "/icons/psiquiatria.png" },
    { nome: "Endocrinologia", icon: "/icons/endocrinologia.png" },
    { nome: "Urologia", icon: "/icons/urologia.png" },
  ]);
  return (
    <>
      {/* Home main, titulo principal,subtitulo e imagem  */}
      <main className="w-full justify-center  grid ">
        {/* principal novo baseado em https://www.onemedical.com/ */}
        <div className="relative w-full md:flex grid  items-center justify-between gap-6  ">
          <div className="w-full 2 px-6 ">
            <h1 className="text-3xl font-playfair font-bold  text-black mb-4">
             <span className="titulo-cor-padrao-medgo">Agendamento Online</span> de Consultas
            </h1>
            <p className="text-gray-700 text-base md:text-lg mb-6">
              Encontre horários disponíveis e garanta sua consulta com
              praticidade.
            </p>
            <Link href="/marcar-consulta">
              <button className="titulo-background-padrao-medgo hover-background-padrao-medgo text-white px-6 py-4.5 rounded-4xl pointer transition">
                Agendar Agora
              </button>
            </Link>
          </div>

          <div className="w-full ">
            <img
              src="/home/OM-homepage_transparent_bg_Mobile_425.original.png"
              alt="Mulher usando laptop"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Section titulo,subtitulo, com cards e informações... */}
        <section className="w-full justify-center gap-2 grid  ">
          {/* Card */}
          <div className="grid justify-center w-full xl:flex xl:gap-3 -mt-12">
            {cardInfos.slice(0, 3).map((cardInfo) => (
              <div
                className="relative flex flex-col my-6  rounded-lg w-96"
                key={cardInfo.id}
              >
                <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                  <img src={cardInfo.path} alt="card-image" />
                </div>
                <div className="p-4">
                  <h6 className="mb-2 text-slate-800 text-xl font-semibold titulo-cor-padrao-medgo">
                    {cardInfo.titulo}
                  </h6>

                  <p className="text-slate-600 leading-normal font-light">
                    {cardInfo.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/*Section especialidades*/}
        <section className="grid justify-center mb-20 mt-10 md:mx-45 md:justify-center  md:text-start  lg:text-center xl:mx-45 2xl:mx-10   relative">
          <div className="container mx-auto px-4 grid gap-10">
            <h2 className="xl:text-3xl text-xl font-playfair font-bold text-black mb-4">
              <span className="titulo-cor-padrao-medgo ">Especialidades</span>{" "}
              disponíveis em MedGo
            </h2>
            <div className="grid grid-cols-2 justify-center gap-3 md:grid-cols-4 md:gap-10 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
              {especialidades.map((especialidade, index) => (
                <div
                  key={index}
                  className="w-full h-40px rounded-4xl grid place-items-center text-center"
                >
                  <img className="w-10 h-10" src={especialidade.icon} alt="" />
                  <h3 className="text-lg text-black font-semi-bold mb-2">
                    {especialidade.nome}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
