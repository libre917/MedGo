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
      <section className="w-full justify-center gap-2 grid mt-10">

        <div className="  mb-4 grid gap-4  ">
          <h1 className="text-center xl:text-left md:text-center sm:text-center text-5xl titulo-cor-padrao-medgo font-semibold font-mono  "> Lorem ipsum </h1>
          <p className="text-black text-center text-sm lg:text-left   sm:w-5xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi et voluptates aspernatur dolores libero amet non reprehenderit, soluta voluptas rem, in quas eum ipsam? Quam consequatur natus ut vero quis.</p>
        </div>

        <div className=" flex justify-left  w-full">


          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg" src="/home/MEDGO_logo.png" alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>

        </div>

      </section>
    </>
  );
}
