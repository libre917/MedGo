"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [Idade, setIdade] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const adiocionarDados = async () => {
    try {
   

      const response = await axios.get("http://localhost:3000/Pacientes");
      const paciente = response.data;

      const user = paciente.find(
        (paciente) => paciente.email === email
      );
      if(Idade < 18){
        alert('Idade não permitida')
      } else {

      if (user) {
        alert('Email já cadastrado')
      } else {
        await axios.post("http://localhost:3000/Pacientes", {
          nome: nome,
          email: email,
          senha: senha,
          endereco: endereco,
          telefone: telefone,
          idade: Idade,
        });
        }
      const newResponse = await axios.get("http://localhost:3000/Pacientes");
      const newPaciente = newResponse.data;

      const newUser = newPaciente.find(
        (p) => p.email === email
      );
      localStorage.setItem("usuario", JSON.stringify(newUser));
      window.location.href = "/home";}
    } catch (err) {
      console.error("Erro ao comparar dados", err);
      alert("Erro ao conectar-se ao servidor.");
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row justify-center items-center h-screen ">
        <div className="hidden md:flex">
          <img
            src="/login-img/Wavy_Med.jpg"
            alt="Imagem ao lado dos inputs"
            className="rounded-4xl w-90 md:w-100  lg:w-[500px]"
          />
        </div>

        <form
          className="grid justify-center items-center gap-6 p-6 md:p-10 text-center "
          onSubmit={(e) => {
            e.preventDefault();
            adiocionarDados();
          }}
        >
          <img
            src="/MEDGO_logo.png"
            alt="Logo MedGo"
            className="w-32 md:w-40 mx-25 md:mx-30 mt-20 xl:mt-0"
          />
          <h1 className="text-black font-semibold text-2xl md:text-2xl text-center font-playfair">
            Faça o cadastro para continuar
          </h1>
          <p className="text-black text-center">
            Já possui conta?{" "}
            <Link href="/" className="text-blue-600">
              Login
            </Link>
          </p>

          <input
            placeholder="Nome completo:"
            type="text"
            name="nome"
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-80 md:w-100 sm:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          <input
            placeholder="Telefone:"
            type="text"
            name="tel"
            onChange={(e) => setTelefone(e.target.value)}
            required
            pattern="[0-9]{2}[0-9]{5}[0-9]{4}"
            className="w-80 md:w-100  sm:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          <input
            placeholder="Endereço:"
            type="text"
            name="endereco"
            onChange={(e) => setEndereco(e.target.value)}
            required
            className="w-80 md:w-100 sm:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          <input
            placeholder="Idade:"
            type="text"
            name="idade"
            onChange={(e) => setIdade(e.target.value)}
            required
            className="w-80 md:w-100 sm:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          <input
            placeholder="Email:"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-80 md:w-100 sm:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          <input
            placeholder="Senha:"
            type="password"
            name="password"
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-80 md:w-100 sm:w-100 border-b-2 border-black focus:outline-none focus:border-blue-500 text-black p-2"
          />

          <div className="text-black ">
            <input type="checkbox" required /> Li e entendi os termos da{" "}
            <Link className="text-blue-500" href="/politicadeprivacidade">
              Politica de Privacidade
            </Link>{" "}
            de Medgo.
            <div className="text-black">
            <button
              className="titulo-background-padrao-medgo hover-background-padrao-medgo text-white px-9 py-3 rounded-4xl transition mt-5"
              type="submit"
            >
              Cadastre-se
            </button>
          </div>
          </div>
        </form>
      </section>
    </>
  );
}
