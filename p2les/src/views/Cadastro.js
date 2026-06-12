import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      setErro("");
      setSucesso("");

      // Busca usuários já cadastrados
      const response = await fetch("http://localhost:3001/users");
      const usuarios = await response.json();

      const usuarioExistente = usuarios.find(
        (u) => u.email === email
      );

      if (usuarioExistente) {
        setErro("Já existe uma conta cadastrada com este e-mail.");
        return;
      }

      const novoUsuario = {
        nome,
        email,
        telefone,
        senha,
      };

      // Cadastra o usuário
      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      setSucesso("Cadastro realizado com sucesso!");

      setNome("");
      setEmail("");
      setTelefone("");
      setSenha("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setErro("Erro ao realizar cadastro.");
      console.error(error);
    }
  };

  return (
    <main className="auth">
      <div className="auth-card">
  
        <div className="auth-header">
          <span className="section-tag">
            Cadastro
          </span>
  
          <h1 className="auth-title">
            Criar <span>Conta</span>
          </h1>
  
          <p className="auth-subtitle">
            Cadastre-se para realizar seus agendamentos.
          </p>
        </div>

        {erro && (
          <div className="auth-message auth-message--error">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="auth-message auth-message--success">
            {sucesso}
          </div>
        )}
        <form
          className="auth-form"
          onSubmit={handleCadastro}
        >
          <div className="auth-field">
            <label>Nome Completo</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
  
          <div className="auth-field">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="auth-field">
            <label>Telefone</label>
            <input
              type="tel"
              placeholder="(11) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
  
          <div className="auth-field">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
  
          <button
            className="auth-btn"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
  
        <div className="auth-footer">
          Já possui conta?
          <Link to="/login"> Entrar</Link>
        </div>
  
      </div>
    </main>
  );
};

export default Cadastro;