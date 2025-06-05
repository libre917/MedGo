"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function Cadastro() {
  console.log(new Date())
  localStorage.clear();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const dataAtual = new Date()

  const adiocionarDados = async () => {
    try {


      const response = await axios.get("http://localhost:3000/pacientes");
      const paciente = response.data;

      const [dia, mes, ano] = dataNascimento.split("/")
      const anoAtual = dataAtual.getFullYear()
      const user = paciente.find(
        (paciente) => paciente.email === email
      );
      const idade = anoAtual - ano
      if(endereco.length < 5){
        alert("Endereço inválido")
        return
      }
      if (dia > 30) {
        alert("Dia inválido")
        return
      }
      if (mes > 12) {
        alert("Mês inválido")
        return
      }
      if (ano > anoAtual || idade > 120) {
        alert('Ano inválido')
        return
      }
      if (senha.length < 6) {
        alert("A senha deve ter mais de 6 caracteres")
        return
      }
      if (idade < 18) {
        alert("Maioridade necessária")
        return
      } else {
        if (user) {
          alert('Email já cadastrado')
          return
        } else {
          await axios.post("http://localhost:3000/pacientes", {
            nome: nome,
            email: email,
            senha: senha,
            endereco: endereco,
            telefone: telefone,
            dataNascimento: dataNascimento
          });
        }
        const response = await axios.post("http://localhost:3000/auth/login", { email: email, senha: senha });
        const paciente = response.data;

        localStorage.setItem("usuario", JSON.stringify(paciente));
        window.location.href = "/home";
      }
    } catch (err) {
      console.error("Erro ao comparar dados", err);
      alert("Erro ao conectar-se ao servidor.");
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row justify-center items-center h-screen ">
        <div className="hidden md:flex ">
          <img
            src="/login-img/Wavy_Med.jpg"
            alt="Imagem ao lado dos inputs"
            className="rounded-4xl w-90 md:w-100  lg:w-[500px]"
          />
        </div>

        <form
          className="grid justify-center items-center gap-6 p-6 md:p-10 text-center justify-items-center"
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
            placeholder="data de nascimento:"
            type="text"
            name="dataNascimento"
            pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
            onChange={(e) => setDataNascimento(e.target.value)}
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
            <Link className="text-blue-500" href="/politicadeprivacdataNascimento">
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
