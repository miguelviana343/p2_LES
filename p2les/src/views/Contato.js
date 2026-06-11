import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useContactController } from '../controllers';
import '../resources/css/Contato.css';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

const Contato = () => {
  const { loading, error, success, sendMessage, reset } = useContactController();
  const [form, setForm] = useState(INITIAL);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(form);
  };

  const handleReset = () => { setForm(INITIAL); reset(); };

  return (
    <main className="contato">
      <div className="page-header">
        <div className="container">
          <span className="section-tag">Fale conosco</span>
          <h1 className="section-title">Entre em <em>Contato</em></h1>
          <p className="page-header__sub">Estamos aqui para responder suas dúvidas e agendar sua consulta.</p>
        </div>
      </div>

      <div className="contato__body container">
        {/* Info cards */}
        <div className="contato__info">
          {[
            { icon: Phone, label: 'Telefone', value: '(11) 3456-7890', sub: 'Seg–Sex 7h–20h, Sáb 8h–14h' },
            { icon: Mail, label: 'E-mail', value: 'contato@clinicavitae.com.br', sub: 'Resposta em até 24h' },
            { icon: MapPin, label: 'Endereço', value: 'Av. Paulista, 1000 — Bela Vista', sub: 'São Paulo/SP — CEP 01310-100' },
            { icon: Clock, label: 'Horário', value: 'Seg–Sex: 7h–20h', sub: 'Sábado: 8h–14h' },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="info-card">
              <div className="info-card__icon"><Icon size={20} /></div>
              <div>
                <p className="info-card__label">{label}</p>
                <p className="info-card__value">{value}</p>
                <p className="info-card__sub">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="contato__form-wrap">
          {success ? (
            <div className="contato__success">
              <CheckCircle size={48} />
              <h3>Mensagem enviada!</h3>
              <p>Entraremos em contato em breve. Obrigado por nos escrever, {form.name}!</p>
              <button className="form-btn form-btn--primary" onClick={handleReset}>
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form className="contato__form" onSubmit={handleSubmit} noValidate>
              <h2 className="contato__form-title">Envie uma mensagem</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="cname">Nome *</label>
                  <input id="cname" name="name" type="text" placeholder="Seu nome" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label htmlFor="cemail">E-mail *</label>
                  <input id="cemail" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label htmlFor="cphone">Telefone</label>
                  <input id="cphone" name="phone" type="tel" placeholder="(11) 91234-5678" value={form.phone} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="csubject">Assunto</label>
                  <input id="csubject" name="subject" type="text" placeholder="Assunto da mensagem" value={form.subject} onChange={handleChange} />
                </div>
                <div className="form-field form-field--full">
                  <label htmlFor="cmessage">Mensagem *</label>
                  <textarea id="cmessage" name="message" rows={5} placeholder="Escreva sua mensagem aqui..." value={form.message} onChange={handleChange} required />
                </div>
              </div>

              {error && (
                <div className="form-alert form-alert--error" style={{ marginTop: 16 }}>
                  {error}
                </div>
              )}

              <button type="submit" className="form-btn form-btn--primary contato__submit" disabled={loading}>
                {loading ? 'Enviando...' : <><Send size={16} /> Enviar mensagem</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Contato;
