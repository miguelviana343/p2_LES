import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../resources/css/Auth.css";

const CadastrarMedico = () => {
  const [form, setForm] = useState({
    nome: "",
    especialidade: "",
    crm: "",
    email: "",
    telefone: "",
    descricao: "",
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      if (!form.nome || !form.especialidade || !form.crm) {
        setErro("Preencha nome, especialidade e CRM para cadastrar o médico.");
        return;
      }

      const response = await fetch("http://localhost:3001/doctors");
      const medicos = await response.json();

      const jaExiste = medicos.some(
        (medico) => medico.crm.toLowerCase() === form.crm.toLowerCase()
      );

      if (jaExiste) {
        setErro("Já existe um médico cadastrado com esse CRM.");
        return;
      }

      await fetch("http://localhost:3001/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(),
          name: form.nome,
          specialty: form.especialidade,
          crm: form.crm,
          email: form.email,
          phone: form.telefone,
          bio: form.descricao || "Médico cadastrado via painel administrativo.",
          schedule: ["Segunda", "Quarta", "Sexta"],
        }),
      });

      setSucesso("Médico cadastrado com sucesso!");
      setForm({
        nome: "",
        especialidade: "",
        crm: "",
        email: "",
        telefone: "",
        descricao: "",
      });
    } catch (error) {
      console.error(error);
      setErro("Não foi possível cadastrar o médico.");
    }
  };

  return (
    <main className="auth">
      <div className="auth-card">
        <div className="auth-header">
          <span className="section-tag">Cadastro de Médico</span>
          <h1 className="auth-title">Cadastrar <span>Médico</span></h1>
          <p className="auth-subtitle">Adicione profissionais no banco do json-server.</p>
        </div>

        {erro && <div className="auth-message auth-message--error">{erro}</div>}
        {sucesso && <div className="auth-message auth-message--success">{sucesso}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Nome completo</label>
            <input name="nome" value={form.nome} onChange={handleChange} required />
          </div>

          <div className="auth-field">
            <label>Especialidade</label>
            <input name="especialidade" value={form.especialidade} onChange={handleChange} required />
          </div>

          <div className="auth-field">
            <label>CRM</label>
            <input name="crm" value={form.crm} onChange={handleChange} required />
          </div>

          <div className="auth-field">
            <label>E-mail</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="auth-field">
            <label>Telefone</label>
            <input name="telefone" value={form.telefone} onChange={handleChange} />
          </div>

          <div className="auth-field">
            <label>Descrição</label>
            <textarea name="descricao" rows="4" value={form.descricao} onChange={handleChange} placeholder="Resumo da formação e especialidade" />
          </div>

          <button className="auth-btn" type="submit">Salvar Médico</button>
        </form>

        <div className="auth-footer">
          Voltar para <Link to="/agendamento">agendamento</Link>
        </div>
      </div>
    </main>
  );
};

export default CadastrarMedico;
