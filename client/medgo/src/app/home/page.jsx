"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./home.css";

export default function Home() {
  const userId = localStorage.getItem("usuario");
  if (!userId) {
    alert('Erro: Login ou cadastro necessário para funcionamento')
    window.location.href = "/";
  }
  const cardInfos = [
    {
      id: "1",
      titulo: "Agende com facilidade",
      descricao:
        "Com o MedGo, pacientes marcam consultas direto do celular ou computador, de forma rápida e sem complicações.",
      path: "/home/card-img/grandparent-learning-use-technology.jpg",
    },
    {
      id: "2",
      titulo: "Organização para sua clínica",
      descricao:
        "Profissionais de saúde controlam seus horários em tempo real, reduzindo conflitos e otimizando o atendimento.",
      path: "/home/card-img/equipe-de-jovens-medicos-especialistas-em-pe-no-corredor-hospital.jpg",
    },
    {
      id: "3",
      titulo: "Acesso à saúde onde mais precisa",
      descricao:
        "O MedGo nasceu para facilitar o atendimento em clínicas comunitárias, promovendo mais inclusão e agilidade.",
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
      <main className="w-full justify-center  grid mt-12 md:mt-0 text-center ">
        {/* texto banner */}
        <div className="relative w-full md:flex grid  items-center justify-between gap-6  ">
          <div className="w-full px-8 grid xl:justify-end justify-items-center md:justify-items sm:items-center ">
            <h1 className="text-3xl font-playfair font-bold  text-black mb-4">
              <span className="titulo-cor-padrao-medgo">Agendamento Online</span> de Consultas
            </h1>
            <p className="text-gray-700 text-base md:text-lg mb-6 " >
              Encontre horários disponíveis e garanta sua consulta com
              praticidade.
            </p>
            <Link href="/marcar-consulta">
              <button className="titulo-background-padrao-medgo hover-background-padrao-medgo text-white px-6 py-4.5 rounded-4xl cursor-pointer transition ">
                Agendar Agora
              </button>
            </Link>
          </div>
          {/* imagem banner */}
          <div className="w-full hidden md:flex ">
            <img
              src="/home/OM-homepage_transparent_bg_Mobile_425.original.png"
              alt="Mulher usando laptop"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Section titulo,subtitulo, com cards e informações... */}
        <section className="w-full justify-center gap-2 grid  xl:-mt-10 ">
          {/* Card */}
          <div className="grid justify-center w-full xl:flex xl:gap-10 ">
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

                  <p className="text-slate-900 leading-normal font-light">
                    {cardInfo.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Especialidades*/}
        <section className=" grid justify-center mb-20 mt-10 md:mx-45 md:justify-center  md:text-start  lg:text-center xl:mx-45 2xl:mx-10  relative">
        <div className="container mx-auto px-4 grid gap-10 ">
  <h2 className="xl:text-3xl text-2xl font-playfair font-bold text-black mb-4">
    Agendamento Online de Consultas na{" "}
    <span className="titulo-cor-padrao-medgo">MedGo</span>
  </h2>
  <p className="text-lg text-black mb-4">
    Encontre horários disponíveis e garanta sua consulta com praticidade.
  </p>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
    <div className="w-full h-auto rounded-4xl text-center bg-blue-50 hover:bg-blue-200 transition duration-150 ease-in-out px-4 py-6">
      <h3 className="text-xl font-bold text-black mb-2">
        Fácil e rápido
      </h3>
      <p className="text-md text-black">
        Com MedGo, você agenda consultas diretamente do celular ou computador, sem complicações.
      </p>
    </div>
    <div className="w-full h-auto rounded-4xl text-center bg-blue-50 hover:bg-blue-200 transition duration-150 ease-in-out px-4 py-6">
      <h3 className="text-xl font-bold text-black mb-2">
        Organização para clínicas
      </h3>
      <p className="text-md text-black">
        Profissionais de saúde gerenciam seus horários em tempo real, reduzindo conflitos e otimizando o atendimento.
      </p>
    </div>
    <div className="w-full h-auto rounded-4xl text-center bg-blue-50 hover:bg-blue-200 transition duration-150 ease-in-out px-4 py-6">
      <h3 className="text-xl font-bold text-black mb-2">
        Inclusão e acessibilidade
      </h3>
      <p className="text-md text-black">
        O MedGo facilita o atendimento em clínicas comunitárias, promovendo mais inclusão e agilidade.
      </p>
    </div>
  </div>
</div>

        </section>

      </main>
    </>
  );
}
