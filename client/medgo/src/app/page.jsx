import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const cardInfos = [{ id: "1", titulo: "lorem, ipsum", descricao: "lorem,ipsum", path: "/home/card-img/equipe-de-jovens-medicos-especialistas-em-pe-no-corredor-hospital.jpg" }, { id: "2", titulo: "lorem, ipsum", descricao: "lorem,ipsum", path: "/home/card-img/sala-de-hospital.png" }, { id: "3", titulo: "lorem, ipsum", descricao: "lorem,ipsum", path: "/home/card-img/enfermeira-medindo-paciente-pressao-sangue.jpg" }]
  return (
    <>
      {/* Home main, titulo principal,subtitulo e imagem  */}
      <main className="w-full justify-center gap-2 grid mt-32">
        <div className="  mb-4 grid gap-4  ">
          <h1 className="text-center xl:text-left md:text-center sm:text-center text-5xl titulo-cor-padrao-medgo font-semibold font-mono  "> Lorem ipsum </h1>
          <p className="text-black text-center text-sm lg:text-left   sm:w-5xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi et voluptates aspernatur dolores libero amet non reprehenderit, soluta voluptas rem, in quas eum ipsam? Quam consequatur natus ut vero quis.</p>
        </div>

        <div className=" flex justify-left  w-full">
          <img src="/home/imagem-hospital-generica.jpg" className="rounded-sm w-4xl sm:w-6xl" alt="" />
        </div>
      </main>

      {/* Section com cards,com informações... */}
      <section className="w-full justify-center gap-2 grid mt-10">

        <div className="  mb-4 grid gap-4  ">
          <h1 className="text-center xl:text-left md:text-center sm:text-center text-5xl titulo-cor-padrao-medgo font-semibold font-mono  "> Lorem ipsum </h1>
          <p className="text-black text-center text-sm lg:text-left   sm:w-5xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi et voluptates aspernatur dolores libero amet non reprehenderit, soluta voluptas rem, in quas eum ipsam? Quam consequatur natus ut vero quis.</p>
        </div>

        {/* Card */}
        {/* card1 */}
        <div className="grid justify-center w-full xl:flex xl:gap-3 ">
          {cardInfos.slice(0, 3).map((cardInfo) => (
            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96" key={cardInfo.id}>
              <div className="p-4">

                <h6 className="mb-2 text-slate-800 text-xl font-semibold">
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
    </>
  );
}
