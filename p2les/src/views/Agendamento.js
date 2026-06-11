import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Calendar, User, Mail, Phone, FileText, Clock } from 'lucide-react';
import { useAppointmentController, useDoctorController } from '../controllers';
import '../resources/css/Agendamento.css';

const TIMES = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];

const INITIAL = {
  patientName: '', patientEmail: '', patientPhone: '',
  doctorId: '', date: '', time: '', reason: '',
};

const Agendamento = () => {
  const { doctors } = useDoctorController();
  const { loading, error, success, createAppointment, resetForm } = useAppointmentController();
  const [form, setForm] = useState(INITIAL);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (success) { setStep(3); }
  }, [success]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    createAppointment(form);
  };

  const handleReset = () => {
    setForm(INITIAL);
    setStep(1);
    resetForm();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <main className="agendamento">
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <span className="section-tag">Consultas</span>
          <h1 className="section-title">Agendar <em>Consulta</em></h1>
          <p className="page-header__sub">Escolha seu médico, data e horário. É rápido e fácil.</p>
        </div>
      </div>

      <div className="agendamento__body container">
        {/* Progress */}
        <div className="agendamento__progress">
          {[['1', 'Dados Pessoais'], ['2', 'Consulta'], ['3', 'Confirmação']].map(([n, label], i) => (
            <React.Fragment key={n}>
              <div className={`progress-step ${step >= Number(n) ? 'progress-step--active' : ''} ${step > Number(n) ? 'progress-step--done' : ''}`}>
                <span className="progress-step__num">{n}</span>
                <span className="progress-step__label">{label}</span>
              </div>
              {i < 2 && <div className={`progress-line ${step > i + 1 ? 'progress-line--done' : ''}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        {step < 3 ? (
          <div className="agendamento__card">
            <form onSubmit={handleNext} noValidate>

              {step === 1 && (
                <div className="form-section">
                  <h2 className="form-section__title">Seus dados</h2>
                  <div className="form-grid">
                    <div className="form-field form-field--full">
                      <label htmlFor="patientName"><User size={14} /> Nome completo *</label>
                      <input id="patientName" name="patientName" type="text" placeholder="João da Silva" value={form.patientName} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="patientEmail"><Mail size={14} /> E-mail *</label>
                      <input id="patientEmail" name="patientEmail" type="email" placeholder="joao@email.com" value={form.patientEmail} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="patientPhone"><Phone size={14} /> Telefone</label>
                      <input id="patientPhone" name="patientPhone" type="tel" placeholder="(11) 91234-5678" value={form.patientPhone} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-section">
                  <h2 className="form-section__title">Detalhes da consulta</h2>
                  <div className="form-grid">
                    <div className="form-field form-field--full">
                      <label htmlFor="doctorId"><User size={14} /> Médico *</label>
                      <select id="doctorId" name="doctorId" value={form.doctorId} onChange={handleChange} required>
                        <option value="">Selecione um médico</option>
                        {doctors.map((d) => (
                          <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-field">
                      <label htmlFor="date"><Calendar size={14} /> Data *</label>
                      <input id="date" name="date" type="date" min={today} value={form.date} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="time"><Clock size={14} /> Horário *</label>
                      <select id="time" name="time" value={form.time} onChange={handleChange} required>
                        <option value="">Selecione</option>
                        {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="form-field form-field--full">
                      <label htmlFor="reason"><FileText size={14} /> Motivo da consulta</label>
                      <textarea id="reason" name="reason" rows={4} placeholder="Descreva brevemente o motivo da consulta..." value={form.reason} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="form-alert form-alert--error">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="form-actions">
                {step > 1 && (
                  <button type="button" className="form-btn form-btn--back" onClick={() => setStep(s => s - 1)}>
                    Voltar
                  </button>
                )}
                <button type="submit" className="form-btn form-btn--primary" disabled={loading}>
                  {loading ? 'Aguarde...' : step === 1 ? 'Próximo →' : 'Confirmar Agendamento'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success state */
          <div className="agendamento__success">
            <div className="success-icon"><CheckCircle size={52} /></div>
            <h2>Consulta agendada!</h2>
            <p>Recebemos seu agendamento. Você receberá uma confirmação no e-mail <strong>{form.patientEmail}</strong>.</p>
            <div className="success-summary">
              <div className="success-row">
                <span>Paciente</span><strong>{form.patientName}</strong>
              </div>
              <div className="success-row">
                <span>Médico</span>
                <strong>{doctors.find(d => d.id === form.doctorId)?.name}</strong>
              </div>
              <div className="success-row">
                <span>Data</span>
                <strong>{new Date(form.date + 'T12:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</strong>
              </div>
              <div className="success-row">
                <span>Horário</span><strong>{form.time}</strong>
              </div>
            </div>
            <button className="form-btn form-btn--primary" onClick={handleReset}>
              Novo Agendamento
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Agendamento;
