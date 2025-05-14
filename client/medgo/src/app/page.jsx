import Image from "next/image";


export default function Home() {
  return (
    <>
    <main className="grid justify-center w-full ">
      <div>
        <div className="text-left ">
        <h1 className="text-6xl">Agenda medica</h1>
        </div>
     
      <div className="justify-center">
      <img src="/MEDGO_logo.png" className="rounded-sm" alt="" />
      </div>

      </div>
    </main>
    </>
  );
}
