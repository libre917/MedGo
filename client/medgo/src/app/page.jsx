import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const cardInfos = [{ id: "1", titulo: "lorem, ipsum", descricao: "lorem,ipsum", path: "/home/card-img/equipe-de-jovens-medicos-especialistas-em-pe-no-corredor-hospital.jpg" }, { id: "2", titulo: "lorem, ipsum", descricao: "lorem,ipsum", path: "/home/card-img/sala-de-hospital.png" }, { id: "3", titulo: "Qualidade de atendimento", descricao: "Seja atendido por profissionais qualificados, usando equipamentos de alta tecnologia, com alta precisão", path: "/home/card-img/enfermeira-medindo-paciente-pressao-sangue.jpg" }]
  return (
    <>
      {/* Home main, titulo principal,subtitulo e imagem  */}
      <main className="w-full justify-center gap-2 grid mt-30">
        <div className="  mb-4 grid gap-4  ">
          <h1 className="text-center xl:text-left md:text-center sm:text-center text-5xl titulo-cor-padrao-medgo font-semibold font-mono  "> Lorem ipsum </h1>
          <p className="text-black text-center text-sm lg:text-left   sm:w-5xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi et voluptates aspernatur dolores libero amet non reprehenderit, soluta voluptas rem, in quas eum ipsam? Quam consequatur natus ut vero quis.</p>
        </div>

        <div className=" flex justify-left  w-full">
          <img src="/home/imagem-hospital-generica.jpg" className="rounded-sm w-4xl sm:w-6xl" alt="" />
        </div>
      </main>

      {/* Section titulo,subtitulo, com cards e informações... */}
      <section className="w-full justify-center gap-2 grid mt-25 ">

        <div className="  mb-4 grid gap-4  ">
          <h1 className="text-center xl:text-left md:text-center sm:text-center text-5xl titulo-cor-padrao-medgo font-semibold font-mono  "> Lorem ipsum </h1>
          <p className="text-black text-center text-sm lg:text-left   sm:w-5xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi et voluptates aspernatur dolores libero amet non reprehenderit, soluta voluptas rem, in quas eum ipsam? Quam consequatur natus ut vero quis. </p>
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
      <section className=" grid  xl:flex justify-center gap-6 mt-25 mb-25">
        
          <img src="/home/card-img/medico-com-equipamento-no-ombro.jpg" className="xl:w-xl w-md rounded-lg " alt="" />
        
        <div className=" grid justify-center mb-10">
          <h1 className="text-center xl:text-left md:text-center sm:text-center text-4xl titulo-cor-padrao-medgo font-semibold font-mono ">Lorem ipsum</h1>
          
          <p className="w-full xl:w-xl h-15 text-black mb-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, explicabo cum, nemo quam praesentium quas perferendis aliquam ipsa accusantium, nesciunt libero ullam veniam beatae facilis reprehenderit asperiores incidunt obcaecati hic.</p>
          
          <Link rel="stylesheet" className="text-black" href="" ><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Choose plan
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button></Link>

        </div>

      </section>

    </>
  );
}
