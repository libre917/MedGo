"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
const API_URL = "http://localhost:3001"

export default function LoginMedico() {
  localStorage.clear();
  const [email, setEmail] = useState("");
  const [crm, setCrm] = useState("");
  const [senha, setSenha] = useState("");

      const router = useRouter()

  const compararDados = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/medLogin`,{
        email: email,
        senha: senha,
        crm: crm
      });
      const medicos = response.data;

      
        localStorage.setItem("usuario", JSON.stringify(medicos));
     router.push('/home-medico')
   
    } catch (err) {
      console.error("Erro ao comparar dados", err);
      alert("Erro ao conectar-se ao servidor.");
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row justify-center items-center h-screen overflow-hidden text-center">
        <div className="hidden md:flex">
          <img
            src="/login-img/Wavy_Med.jpg"
            alt="Imagem ao lado dos inputs"
            className="rounded-4xl w-72 md:w-96 lg:w-[500px]"
          />
        </div>

        <form
          className="grid justify-center items-center gap-6 p-6 md:p-10"
          onSubmit={(e) => {
            e.preventDefault();
            compararDados();
          }}
        >
          <img
            src="/MEDGO_logo.png"
            alt="Logo MedGo"
            className="w-32 md:w-40 mx-25"
          />

          <h1 className="text-black font-semibold text-2xl md:text-3xl text-center font-playfair">
          <span className="titulo-cor-padrao-medgo">Área Médica </span> - Faça o <span className="titulo-cor-padrao-medgo">login</span> 
          </h1>

          <p className="text-black text-center ">
            Não tem cadastro médico?{" "}
            <Link href="/cadastro-medico" className="text-blue-600">
              Cadastre-se
            </Link>
          </p>

          <p className="text-black text-center text-sm">
            Sou Paciente?{" "}
            <Link href="/" className="text-blue-600">
              Login Paciente
            </Link>
          </p>

          <div className="grid">
            <input
              placeholder="Email:"
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
            />
          </div>

          <div className="grid">
            <input
              placeholder="Senha:"
              type="password"
              name="password"
              required
              onChange={(e) => setSenha(e.target.value)}
              className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
            />
          </div>

          <div className="grid">
            <input
              placeholder="CRM:"
              type="text"
              name="crm"
              pattern="^\d{6}-[A-Z]{2}$"
              required
              onChange={(e) => setCrm(e.target.value)}
              className="w-80 md:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
            />
          </div>



          <div className="text-black">
            <button
              className="titulo-background-padrao-medgo hover-background-padrao-medgo text-white px-9 py-3 rounded-4xl transition"
              type="submit"
            >
              Acessar Área Médica
            </button>
          </div>
        </form>
      </section>
    </>
  );
}