import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users, Clock, Star, ChevronRight } from 'lucide-react';
import { useMedicalServiceController, useDoctorController } from '../controllers';
import ServiceIcon from '../components/ServiceIcon';
import '../resources/css/Home.css';

const STATS = [
  { value: '15+', label: 'Anos de experiência' },
  { value: '20k+', label: 'Pacientes atendidos' },
  { value: '12', label: 'Especialidades' },
  { value: '98%', label: 'Satisfação' },
];

const FEATURES = [
  { icon: Shield, title: 'Segurança & Privacidade', desc: 'Prontuário eletrônico e dados protegidos por criptografia de ponta.' },
  { icon: Award, title: 'Excelência Médica', desc: 'Profissionais com formação nas melhores instituições do Brasil e do exterior.' },
  { icon: Users, title: 'Atendimento Humanizado', desc: 'Cada paciente é único. Escutamos, diagnosticamos e cuidamos com empatia.' },
  { icon: Clock, title: 'Horários Flexíveis', desc: 'Atendimento de segunda a sábado, presencial ou por telemedicina.' },
];

const TESTIMONIALS = [
  { name: 'Mariana Costa', quote: 'A equipe é simplesmente incrível. Me senti acolhida desde a primeira consulta.', rating: 5 },
  { name: 'João Almeida', quote: 'Finalmente encontrei uma clínica que une tecnologia com um atendimento verdadeiramente humano.', rating: 5 },
  { name: 'Sandra Pires', quote: 'O Dr. Marcos resolveu meu problema em poucas consultas. Recomendo muito!', rating: 5 },
];

const Home = () => {
  const { services, loading: svcLoading } = useMedicalServiceController();
  const { doctors, loading: docLoading } = useDoctorController();

  return (
    <main className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
          <div className="hero__grid" />
        </div>
        <div className="hero__content container">
          <div className="hero__text">
            <span className="section-tag">Clínica Médica Vitae</span>
            <h1 className="hero__title">
              Saúde que<br />
              <em>transforma</em><br />
              vidas
            </h1>
            <p className="hero__desc">
              Cuidado médico de excelência, tecnologia avançada e um time de especialistas dedicados ao seu bem-estar. Agende sua consulta hoje.
            </p>
            <div className="hero__actions">
              <Link to="/agendamento" className="hero__btn-primary">
                Agendar Consulta
                <ArrowRight size={18} />
              </Link>
              <Link to="/sobre" className="hero__btn-secondary">
                Conheça a clínica
              </Link>
            </div>
          </div>
          <div className="hero__card-wrap">
            <div className="hero__card">
              <div className="hero__card-icon">+</div>
              <div className="hero__card-badge">Próxima consulta</div>
              <p className="hero__card-name">Dra. Ana Luísa Ferreira</p>
              <p className="hero__card-spec">Cardiologia</p>
              <div className="hero__card-time">
                <Clock size={14} />
                <span>Amanhã, 10:30</span>
              </div>
              <div className="hero__card-confirm">Confirmada ✓</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="hero__stats container">
          {STATS.map(({ value, label }) => (
            <div key={label} className="hero__stat">
              <span className="hero__stat-value">{value}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="services section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">O que oferecemos</span>
            <h2 className="section-title">Nossos <em>Serviços</em></h2>
            <p className="section-desc">
              Uma gama completa de serviços médicos para cuidar de você e da sua família em todas as fases da vida.
            </p>
          </div>
          <div className="services__grid">
            {svcLoading
              ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="card-skeleton" />)
              : services.map((svc) => (
                <div key={svc.id} className="service-card">
                  <div className="service-card__icon">
                    <ServiceIcon name={svc.icon} />
                  </div>
                  <h3 className="service-card__title">{svc.name}</h3>
                  <p className="service-card__desc">{svc.description}</p>
                  <span className="service-card__duration">
                    <Clock size={12} /> {svc.duration}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="features section-pad">
        <div className="container features__inner">
          <div className="features__text">
            <span className="section-tag">Por que nos escolher</span>
            <h2 className="section-title">Comprometidos com <em>sua saúde</em></h2>
            <p className="features__desc">
              Há mais de 15 anos unimos a mais alta competência técnica à atenção individualizada que você merece.
            </p>
            <Link to="/sobre" className="features__link">
              Saiba mais sobre nós <ChevronRight size={16} />
            </Link>
          </div>
          <div className="features__cards">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card">
                <div className="feature-card__icon"><Icon size={22} /></div>
                <div>
                  <h4 className="feature-card__title">{title}</h4>
                  <p className="feature-card__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Doctors preview ── */}
      <section className="doctors-preview section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Nossa equipe</span>
            <h2 className="section-title">Conheça os <em>Médicos</em></h2>
          </div>
          <div className="doctors-preview__grid">
            {docLoading
              ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="card-skeleton card-skeleton--tall" />)
              : doctors.map((doc) => (
                <div key={doc.id} className="doctor-card">
                  <div className="doctor-card__avatar">
                    {doc.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                  <div className="doctor-card__info">
                    <h3 className="doctor-card__name">{doc.name}</h3>
                    <p className="doctor-card__spec">{doc.specialty}</p>
                    <p className="doctor-card__crm">{doc.crm}</p>
                  </div>
                  <Link to="/agendamento" className="doctor-card__cta">
                    Agendar <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
          </div>
          <div className="doctors-preview__more">
            <Link to="/medicos" className="btn-outline">
              Ver todos os médicos <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Depoimentos</span>
            <h2 className="section-title">O que nossos <em>pacientes</em> dizem</h2>
          </div>
          <div className="testimonials__grid">
            {TESTIMONIALS.map(({ name, quote, rating }) => (
              <div key={name} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-card__quote">"{quote}"</p>
                <span className="testimonial-card__name">— {name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner container">
        <div className="cta-banner__inner">
          <div>
            <h2 className="cta-banner__title">Pronto para cuidar da sua saúde?</h2>
            <p className="cta-banner__sub">Agende sua consulta agora e dê o primeiro passo para uma vida mais saudável.</p>
          </div>
          <Link to="/agendamento" className="cta-banner__btn">
            Agendar Agora <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
