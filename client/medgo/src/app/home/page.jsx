import Image from "next/image";
import Link from "next/link";

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
  return (
    <>
      {/* Home main, titulo principal,subtitulo e imagem  */}
      <main className="w-full justify-center  grid ">

        {/* principal novo baseado em https://www.onemedical.com/ */}
        <div className="relative w-full md:flex grid  items-center justify-between gap-6  ">
          <div className="w-full 2 px-6 ">
            <h1 className="text-3xl font-playfair font-bold  titulo-cor-padrao-medgo mb-4">
              Agendamento Online de Consultas
            </h1>
            <p className="text-gray-700 text-base md:text-lg mb-6">
              Encontre horários disponíveis e garanta sua consulta com
              praticidade.
            </p>
            <Link href="/marcar-consulta" >
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

        {/* Section, anuncio do agendendamento mobile */}
        {/* <section className="grid md:flex justify-center w-full mt-10 mb-10">

          <div className="w-400px grid justify-center ">
            <h1 className="text-3xl font-playfair font-bold  titulo-cor-padrao-medgo mb-4">
            Com o MedGo você pode :
            </h1>
            <div className="flex">
              <p>a</p>
              <p>a</p>
            </div>
            <div className="flex">
              <p>a</p>
              <p>a</p>
            </div>
            <p>a</p>
          </div>



          <div className="w-md h-300px items-center grid justify-center bg-amber-200 ">
            <img src="/home/woman-laptop (2).png" className="w-sm rounded-2xl" alt="" />
          </div>

        </section> */}
      </main>
    </>
  );
}
