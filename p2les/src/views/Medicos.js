import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { useDoctorController } from '../controllers';
import '../resources/css/Medicos.css';

const Medicos = () => {
  const { doctors, loading } = useDoctorController();

  return (
    <main className="medicos">
      <div className="page-header">
        <div className="container">
          <span className="section-tag">Nossa equipe</span>
          <h1 className="section-title">Nossos <em>Médicos</em></h1>
          <p className="page-header__sub">
            Profissionais altamente qualificados, dedicados ao seu cuidado.
          </p>
        </div>
      </div>

      <div className="medicos__body container">
        {loading ? (
          <div className="medicos__grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card-skeleton" style={{ height: 340 }} />
            ))}
          </div>
        ) : (
          <div className="medicos__grid">
            {doctors.map((doc) => (
              <div key={doc.id} className="medico-card">
                <div className="medico-card__top">
                  <div className="medico-card__avatar">
                    {doc.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="medico-card__name">{doc.name}</h3>
                    <p className="medico-card__spec">{doc.specialty}</p>
                    <p className="medico-card__crm">{doc.crm}</p>
                  </div>
                </div>
                <p className="medico-card__bio">{doc.bio}</p>
                <div className="medico-card__schedule">
                  <span className="medico-card__sched-label">
                    <Calendar size={13} /> Atende:
                  </span>
                  <div className="medico-card__days">
                    {doc.schedule.map((day) => (
                      <span key={day} className="medico-card__day">{day}</span>
                    ))}
                  </div>
                </div>
                <Link to="/agendamento" className="medico-card__cta">
                  Agendar consulta <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Medicos;
