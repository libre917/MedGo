"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useState } from "react";


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const compararDados = async () => {
    try {
  
      const response = await axios.get("http://localhost:3000/Pacientes")
      const paciente = response.data

      const user = paciente.find((paciente) => paciente.email === email && paciente.senha === senha)

      if (user) {
        localStorage.setItem("usuario", JSON.stringify(user))
        window.location.href = "/home"; 
      } else  {
        alert('Email ou senha incorreto(s)')
      } 
    } catch (err) {
      console.error('Erro ao comparar dados', err)
      alert("Erro ao conectar-se ao servidor.");

    }
  }

  return (

    <>
      <section className="flex justify-end items-center bg-slate-100 gap-50">
        <form className="grid justify-center items-center gap-6" onSubmit={(e) => { e.preventDefault(); compararDados() }}>

          <img src="/MEDGO_logo.png" alt="" className="w-50" />

          <h1 className="text-black font-semi-bold text-3xl">Faça o login para continuar</h1>
          <p className="text-black">Não tem conta? <Link href="/cadastro" className="text-blue-600">Cadastre-se</Link></p>
          <div className="grid" >
            <label htmlFor="email" className="text-black">Email</label>
            <input type="email" name="email"  required  onChange={(e) => setEmail(e.target.value)} className="w-100 border border-black rounded-2xl text-black p-2" />
          </div>

          <div className="grid">
            <label htmlFor="password" className="text-black">Senha</label>
            <input type="password" name="password" required  onChange={(e) => setSenha(e.target.value)} className="w-100 border border-black rounded-2xl text-black p-2" />
          </div>

          <div className="text-black">

           
            <button className="grid bg-transparent items-center text-black hover:bg-black font-semibold hover:text-white  border border-black hover:border-transparent rounded w-40 h-10 text-center" type="submit">Log In</button>
          </div>

        </form>

        <div className="flex ">
          <img src="/login-img/Wavy_Med.jpg" alt="imagem do lado dos inputs" className="rounded-4xl w-5xl " />
        </div>
      </section>
    </>


  )

}