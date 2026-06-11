import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';
import '../resources/css/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__top container">
      {/* Brand */}
      <div className="footer__brand">
        <div className="footer__logo">
          <span className="footer__logo-mark">V</span>
          <div>
            <span className="footer__logo-main">Vitae</span>
            <span className="footer__logo-sub">Clínica Médica</span>
          </div>
        </div>
        <p className="footer__tagline">
          Cuidando da sua saúde com excelência, empatia e tecnologia de ponta desde 2008.
        </p>
        <div className="footer__social">
          <a href="https://instagram.com" aria-label="Instagram">
            <Instagram size={18} />
          </a>

          <a href="https://facebook.com" aria-label="Facebook">
            <Facebook size={18} />
          </a>

          <a href="https://linkedin.com" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="footer__col">
        <h4 className="footer__col-title">Navegação</h4>
        <ul>
          {[['/', 'Início'], ['/sobre', 'Sobre nós'], ['/especialidades', 'Especialidades'], ['/medicos', 'Médicos'], ['/agendamento', 'Agendar Consulta'], ['/contato', 'Contato']].map(([to, label]) => (
            <li key={to}><Link to={to}>{label}</Link></li>
          ))}
        </ul>
      </div>

      {/* Specialties */}
      <div className="footer__col">
        <h4 className="footer__col-title">Especialidades</h4>
        <ul>
          {['Cardiologia', 'Ortopedia', 'Dermatologia', 'Neurologia', 'Clínica Geral', 'Nutrição Clínica'].map((s) => (
            <li key={s}><span>{s}</span></li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="footer__col">
        <h4 className="footer__col-title">Informações</h4>
        <div className="footer__info">
          <div className="footer__info-item">
            <Phone size={15} />
            <span>(11) 3456-7890</span>
          </div>
          <div className="footer__info-item">
            <Mail size={15} />
            <span>contato@clinicavitae.com.br</span>
          </div>
          <div className="footer__info-item">
            <MapPin size={15} />
            <span>Av. Paulista, 1000 — Bela Vista, São Paulo/SP</span>
          </div>
          <div className="footer__info-item">
            <Clock size={15} />
            <span>Seg–Sex: 7h–20h &nbsp;|&nbsp; Sáb: 8h–14h</span>
          </div>
        </div>
      </div>
    </div>

    <div className="footer__bottom container">
      <p>© {new Date().getFullYear()} Clínica Vitae. Todos os direitos reservados.</p>
      <p>CFM · CRM/SP · Registro Sanitário nº 00000-SP</p>
    </div>
  </footer>
);

export default Footer;
