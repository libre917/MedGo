"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons';
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
      const response = await axios.get("http://localhost:3000/Pacientes");
      const paciente = response.data;

      const user = paciente.find(
        (paciente) => paciente.email === email && paciente.senha === senha
      );

      if (user) {
        localStorage.setItem("usuario", JSON.stringify(user));
        window.location.href = "/home";
      } else {
        alert("Email ou senha incorreto(s)");
      }
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
            className="w-32 md:w-40 mx-25  "
          />

          <h1 className="text-black font-semibold text-2xl md:text-3xl text-center font-playfair ">
            Faça o login para continuar
          </h1>


          <p className="text-black text-center">
            Não tem conta? <Link href="/cadastro" className="text-blue-600">
              Cadastre-se
            </Link>
          </p>

         <p className='text-black'>
          É medico?<Link href="/login-medico">Login</Link> 
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


          <div className="text-black">
            <button
              className="titulo-background-padrao-medgo hover-background-padrao-medgo text-white px-9 py-3 rounded-4xl transition"
              type="submit"
            >
              Log In
            </button>
          </div>




        </form>
      </section>
    </>
  );
}
