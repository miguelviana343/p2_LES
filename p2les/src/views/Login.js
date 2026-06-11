import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../resources/css/Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
      (u) =>
        u.email === email &&
        u.senha === senha
    );

    if (!usuario) {
        setErro("E-mail ou senha inválidos.");
        return;
    }

    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(usuario)
    );

    navigate("/agendamento");
  };

  return (
    <main className="auth">
      <div className="auth-card">
  
        <div className="auth-header">
          <span className="section-tag">
            Acesso
          </span>
  
          <h1 className="auth-title">
            Entrar na <span>Clínica Vitae</span>
          </h1>
  
          <p className="auth-subtitle">
            Faça login para agendar sua consulta.
          </p>
        </div>

        {erro && (
        <div className="auth-message auth-message--error">
            {erro}
        </div>
        )}
        <form
          className="auth-form"
          onSubmit={handleLogin}
        >
          <div className="auth-field">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>
  
          <div className="auth-field">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
            />
          </div>
  
          <button
            className="auth-btn"
            type="submit"
          >
            Entrar
          </button>
        </form>
  
        <div className="auth-footer">
          Não possui conta?
          <a href="/cadastro"> Cadastre-se</a>
        </div>
  
      </div>
    </main>
  );
};

export default Login;