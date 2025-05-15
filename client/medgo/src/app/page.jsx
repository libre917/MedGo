import Image from "next/image";
import Link from "next/link"; 

export default function Home() {
  return (
    <>
      {/* Home main, titulo principal,subtitulo e imagem  */}
      <main className="w-full justify-center gap-2 grid mt-10">
        <div className="  mb-4 grid gap-4  ">
          <h1 className="text-center xl:text-left md:text-center sm:text-center text-5xl titulo-cor-padrao-medgo font-semibold font-mono  "> Lorem ipsum </h1>
          <p className="text-black text-center text-sm lg:text-left   sm:w-5xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi et voluptates aspernatur dolores libero amet non reprehenderit, soluta voluptas rem, in quas eum ipsam? Quam consequatur natus ut vero quis.</p>
        </div>

        <div className=" flex justify-left  w-full">
          <img src="/home/imagem-hospital-generica.jpg" className="rounded-sm w-4xl sm:w-6xl" alt="" />
        </div>
      </main>

      {/* Section com cards,com informações... */}
      <section className="w-full grid justify-center">
        <div className="w-full ">
          <h1 className=" text-center xl:text-left md:text-center sm:text-center text-4xl  font-semibold font-mono titulo-cor-padrao-medgo ">Lorem ipsum </h1>
        </div>
      </section>
    </>
  );
}
