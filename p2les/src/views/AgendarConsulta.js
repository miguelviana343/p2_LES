import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../resources/css/Auth.css";

const TIMES = [
  "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

const AgendarConsulta = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "null");

    if (usuario) {
      setForm((prev) => ({
        ...prev,
        patientName: usuario.nome || "",
        patientEmail: usuario.email || "",
        patientPhone: usuario.telefone || "",
      }));
    }

    const carregarMedicos = async () => {
      try {
        const response = await fetch("http://localhost:3001/doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar a lista de médicos.");
      } finally {
        setCarregando(false);
      }
    };

    carregarMedicos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!form.patientName || !form.patientEmail || !form.doctorId || !form.date || !form.time) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await fetch("http://localhost:3001/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(),
          patientName: form.patientName,
          patientEmail: form.patientEmail,
          patientPhone: form.patientPhone,
          doctorId: form.doctorId,
          date: form.date,
          time: form.time,
          reason: form.reason,
          status: "pending",
          createdAt: new Date().toISOString(),
        }),
      });

      setSucesso("Consulta agendada com sucesso!");
      setForm((prev) => ({
        ...prev,
        doctorId: "",
        date: "",
        time: "",
        reason: "",
      }));
    } catch (error) {
      console.error(error);
      setErro("Não foi possível agendar a consulta.");
    }
  };

  return (
    <main className="auth">
      <div className="auth-card">
        <div className="auth-header">
          <span className="section-tag">Agendar Consulta</span>
          <h1 className="auth-title">Marcar <span>Consulta</span></h1>
          <p className="auth-subtitle">Escolha seu médico, data e horário usando o json-server.</p>
        </div>

        {erro && <div className="auth-message auth-message--error">{erro}</div>}
        {sucesso && <div className="auth-message auth-message--success">{sucesso}</div>}

        {carregando ? (
          <p className="auth-subtitle">Carregando médicos...</p>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Nome</label>
              <input name="patientName" value={form.patientName} onChange={handleChange} readOnly />
            </div>

            <div className="auth-field">
              <label>E-mail</label>
              <input type="email" name="patientEmail" value={form.patientEmail} onChange={handleChange} readOnly />
            </div>

            <div className="auth-field">
              <label>Telefone</label>
              <input name="patientPhone" value={form.patientPhone} onChange={handleChange} readOnly />
            </div>

            <div className="auth-field">
              <label>Médico</label>
              <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
                <option value="">Selecione um médico</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name} — {doctor.specialty}</option>
                ))}
              </select>
            </div>

            <div className="auth-field">
              <label>Data</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required />
            </div>

            <div className="auth-field">
              <label>Horário</label>
              <select name="time" value={form.time} onChange={handleChange} required>
                <option value="">Selecione</option>
                {TIMES.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="auth-field">
              <label>Motivo da consulta</label>
              <textarea name="reason" rows="4" value={form.reason} onChange={handleChange} placeholder="Descreva o motivo da consulta" />
            </div>

            <button className="auth-btn" type="submit">Agendar</button>
          </form>
        )}

        <div className="auth-footer">
          Voltar para <Link to="/medicos">médicos</Link>
        </div>
      </div>
    </main>
  );
};

export default AgendarConsulta;
