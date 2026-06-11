import React from 'react';
import { Award, Heart, Shield, Users } from 'lucide-react';
import '../resources/css/Sobre.css';

const VALUES = [
  { icon: Heart, title: 'Cuidado Humanizado', desc: 'Cada paciente é tratado com atenção individual, empatia e respeito.' },
  { icon: Award, title: 'Excelência Técnica', desc: 'Profissionais com formação de ponta e atualização contínua.' },
  { icon: Shield, title: 'Segurança & Ética', desc: 'Privacidade dos dados e conduta ética em todos os atendimentos.' },
  { icon: Users, title: 'Equipe Multidisciplinar', desc: 'Integração entre especialidades para um cuidado completo.' },
];

const Sobre = () => (
  <main className="sobre">
    <div className="page-header">
      <div className="container">
        <span className="section-tag">Nossa história</span>
        <h1 className="section-title">Sobre a <em>Clínica Vitae</em></h1>
        <p className="page-header__sub">Mais de 15 anos cuidando de quem importa.</p>
      </div>
    </div>

    <div className="sobre__body container">
      {/* Mission */}
      <section className="sobre__mission">
        <div className="sobre__mission-text">
          <span className="section-tag">Nossa missão</span>
          <h2 className="section-title">Saúde com <em>propósito</em></h2>
          <p>
            A Clínica Vitae nasceu em 2008 com um propósito claro: oferecer atendimento médico de alta qualidade que coloca o paciente no centro de tudo. Fundada por um grupo de médicos com passagem pelos melhores centros de saúde do Brasil e do exterior, nossa clínica combina tecnologia de ponta com um atendimento verdadeiramente humano.
          </p>
          <p>
            Ao longo dos anos, expandimos nossas especialidades e nossa equipe, mantendo sempre o compromisso que nos define: tratar cada pessoa de forma única, com a atenção e o cuidado que ela merece.
          </p>
        </div>
        <div className="sobre__mission-numbers">
          {[['2008', 'Fundação'], ['12', 'Especialidades'], ['20.000+', 'Pacientes'], ['98%', 'Satisfação']].map(([n, l]) => (
            <div key={l} className="mission-number">
              <span className="mission-number__val">{n}</span>
              <span className="mission-number__label">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="sobre__values">
        <div className="section-header">
          <span className="section-tag">O que nos guia</span>
          <h2 className="section-title">Nossos <em>Valores</em></h2>
        </div>
        <div className="sobre__values-grid">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="value-card">
              <div className="value-card__icon"><Icon size={24} /></div>
              <h3 className="value-card__title">{title}</h3>
              <p className="value-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accreditations */}
      <section className="sobre__accreditations">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>
          Certificações & <em>Credenciamentos</em>
        </h2>
        <div className="accred-list">
          {['CFM — Conselho Federal de Medicina', 'CRM/SP — Conselho Regional de Medicina', 'ANS — Planos de Saúde credenciados', 'ISO 9001 — Gestão da Qualidade', 'Vigilância Sanitária — ANVISA', 'ONA — Organização Nacional de Acreditação'].map((a) => (
            <div key={a} className="accred-item">
              <span className="accred-dot" />
              {a}
            </div>
          ))}
        </div>
      </section>
    </div>
  </main>
);

export default Sobre;
