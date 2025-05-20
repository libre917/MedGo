import React from "react";
import Link from "next/link";


export default function Login() {
  return (

    <>
      <section className="flex justify-end items-center bg-slate-100 gap-50">
        <form className="grid justify-center items-center gap-6">

          <img src="/MEDGO_logo.png" alt="" className="w-50" />

          <h1 className="text-black font-semi-bold text-3xl">Faça o login para continuar</h1>
          <p className="text-black">Não tem conta? <Link href="/cadastro" className="text-blue-600">Cadastre-se</Link></p>
          <div className="grid" >
            <label htmlFor="email" className="text-black">Email</label>
            <input type="email" name="email" placeholder="Email" required className="w-100 border border-black rounded-2xl text-black" />
          </div>

          <div className="grid">
            <label htmlFor="password" className="text-black">Senha</label>
            <input type="password" name="password" placeholder="Password" required className="w-100 border border-black rounded-2xl text-black" />
          </div>

          <div className="text-black">

            <input type="checkbox" />Li e entendi os termos da <Link className="text-blue-500" href="/politicadeprivacidade">Politica de Privacidade</Link> de Medgo.
            <Link rel="stylesheet" href="/" className="grid bg-transparent items-center text-black hover:bg-black font-semibold hover:text-white  border border-black hover:border-transparent rounded w-40 h-10 text-center">Log In</Link>
          </div>

        </form>

        <div className="flex ">
          <img src="/login-img/Wavy_Med.jpg" alt="logo medgo" className="rounded-2xl w-5xl " />
        </div>
      </section>
    </>


  )

}