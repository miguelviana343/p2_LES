import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useMedicalServiceController } from '../controllers';
import ServiceIcon from '../components/ServiceIcon';
import '../resources/css/Especialidades.css';

const Especialidades = () => {
  const { services, loading } = useMedicalServiceController();

  return (
    <main className="especialidades">
      <div className="page-header">
        <div className="container">
          <span className="section-tag">O que oferecemos</span>
          <h1 className="section-title">Nossas <em>Especialidades</em></h1>
          <p className="page-header__sub">Cobertura completa em cuidados médicos para toda a família.</p>
        </div>
      </div>

      <div className="especialidades__body container">
        {loading ? (
          <div className="especialidades__grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-skeleton" style={{ height: 260 }} />
            ))}
          </div>
        ) : (
          <div className="especialidades__grid">
            {services.map((svc) => (
              <div key={svc.id} className="esp-card">
                <div className="esp-card__icon">
                  <ServiceIcon name={svc.icon} size={28} />
                </div>
                <h3 className="esp-card__title">{svc.name}</h3>
                <p className="esp-card__desc">{svc.description}</p>
                <div className="esp-card__footer">
                  <span className="esp-card__duration">
                    <Clock size={13} /> {svc.duration}
                  </span>
                  <Link to="/agendamento" className="esp-card__link">
                    Agendar <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Especialidades;
