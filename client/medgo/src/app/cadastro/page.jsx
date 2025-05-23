"use client"
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";


export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [Idade, setIdade] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("")

  const adiocionarDados = async () => {
    try {
      
        await axios.post("http://localhost:3000/Pacientes", {
          nome: nome,
          email: email,
          senha: senha,
          telefone: telefone,
          idade: Idade
        })
        
        const response = await axios.get("http://localhost:3000/Pacientes")
        const paciente = response.data
  
        const user = paciente.find((paciente) => paciente.email === email && paciente.senha === senha)
        localStorage.setItem("usuario", JSON.stringify(user))
         window.location.href = "/home";
         
    } catch (err) {
      console.error('Erro ao comparar dados', err)
      alert("Erro ao conectar-se ao servidor.");

    }
  }

  return (

    <>
      <section className="flex justify-end items-center bg-slate-100 gap-50 ">
        <form className="grid justify-center items-center gap-6" onSubmit={(e) => { e.preventDefault(); adiocionarDados() }}>

          <img src="/MEDGO_logo.png" alt="" className="w-50" />

          <h1 className="text-black font-semi-bold text-3xl">Faça o cadastro para continuar</h1>
          <p className="text-black">Já possui conta? <Link href="/" className="text-blue-600">Login</Link></p>
          <div className="grid" >
            <label htmlFor="nome" className="text-black">Nome completo</label>
            <input type="text" name="nome" onChange={(e) => setNome(e.target.value)} required className="w-100 border-b-2 border-black text-black p-2" />
          </div>
          <div className="grid" >
            <label htmlFor="nome" className="text-black">Telefone</label>
            <input type="text" name="tel" onChange={(e) => setTelefone(e.target.value)} required pattern="[0-9]{2}[0-9]{5}[0-9]{4}" className="w-100 border-2 border-black rounded-2xl text-black p-2" />
          </div>
          <div className="grid" >
            <label htmlFor="nome" className="text-black">Idade</label>
            <input type="text" name="idade" onChange={(e) => setIdade(e.target.value)} required className="w-100 border-2 border-black rounded-2xl text-black p-2" />
          </div>

          <div className="grid" >
            <label htmlFor="email" className="text-black">Email</label>
            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required className="w-100 border-2 border-black rounded-2xl text-black p-2" />
          </div>

          <div className="grid">
            <label htmlFor="password" className="text-black">Senha</label>
            <input type="password" name="password" onChange={(e) => setSenha(e.target.value)} required className="w-100 border-2 border-black rounded-2xl text-black p-2" />
          </div>

          <div className="text-black">

            <input type="checkbox" required /> Li e entendi os termos da <Link className="text-blue-500" href="/politicadeprivacidade">Politica de Privacidade</Link> de Medgo.
            <button rel="stylesheet" type="submit" className="grid bg-transparent items-center text-black hover:bg-black font-semibold hover:text-white  border border-black hover:border-transparent rounded w-40 h-10 text-center">Cadastre-se</button>
          </div>

        </form>

        <div className="flex ">
          <img src="/login-img/Wavy_Med.jpg" alt="logo medgo" className="rounded-2xl w-5xl " />
        </div>
      </section>
    </>


  )

}