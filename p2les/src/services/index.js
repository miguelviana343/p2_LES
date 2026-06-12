// ============================================================
// SERVICES — Camada de dados / API (simulada com localStorage)
// ============================================================

import { DoctorModel, AppointmentModel, ServiceModel } from '../models';

// ── Dados seed ────────────────────────────────────────────────
const SEED_DOCTORS = [
  DoctorModel.create({
    id: 'd1',
    name: 'Dra. Ana Luísa Ferreira',
    specialty: 'Cardiologia',
    crm: 'CRM/SP 123456',
    bio: 'Especialista em cardiologia preventiva com mais de 15 anos de experiência, formada pela USP com residência no Instituto do Coração.',
    image: null,
    schedule: ['Segunda', 'Quarta', 'Sexta'],
  }),
  DoctorModel.create({
    id: 'd2',
    name: 'Dr. Marcos Oliveira',
    specialty: 'Ortopedia',
    crm: 'CRM/SP 234567',
    bio: 'Ortopedista com foco em medicina esportiva e cirurgia minimamente invasiva, com fellowship nos EUA.',
    image: null,
    schedule: ['Terça', 'Quinta'],
  }),
  DoctorModel.create({
    id: 'd3',
    name: 'Dra. Camila Rocha',
    specialty: 'Dermatologia',
    crm: 'CRM/SP 345678',
    bio: 'Dermatologista clínica e estética com especialização em dermatoscopia e tratamentos a laser.',
    image: null,
    schedule: ['Segunda', 'Terça', 'Quinta'],
  }),
  DoctorModel.create({
    id: 'd4',
    name: 'Dr. Rafael Santos',
    specialty: 'Neurologia',
    crm: 'CRM/SP 456789',
    bio: 'Neurologista com expertise em enxaqueca, epilepsia e doenças neurodegenerativas, doutor pela UNICAMP.',
    image: null,
    schedule: ['Quarta', 'Sexta'],
  }),
];

const SEED_SERVICES = [
  ServiceModel.create({ id: 's1', name: 'Consultas Médicas', description: 'Atendimento clínico geral e especializado com os melhores profissionais.', icon: 'stethoscope', duration: '30–60 min' }),
  ServiceModel.create({ id: 's2', name: 'Exames Laboratoriais', description: 'Coleta e análise de exames com resultados rápidos e precisos.', icon: 'flask', duration: '15–30 min' }),
  ServiceModel.create({ id: 's3', name: 'Imagem & Diagnóstico', description: 'Ultrassom, raio-X e eletrocardiograma com laudos imediatos.', icon: 'scan', duration: '20–45 min' }),
  ServiceModel.create({ id: 's4', name: 'Telemedicina', description: 'Consultas online com a mesma qualidade e segurança do atendimento presencial.', icon: 'monitor', duration: '30 min' }),
  ServiceModel.create({ id: 's5', name: 'Check-up Preventivo', description: 'Avaliação completa da saúde com pacote personalizado de exames.', icon: 'clipboard', duration: '2–3 horas' }),
  ServiceModel.create({ id: 's6', name: 'Nutrição Clínica', description: 'Acompanhamento nutricional individualizado integrado ao tratamento médico.', icon: 'heart', duration: '45 min' }),
];

const API_BASE = 'http://localhost:3001';

// ── Helpers de storage ────────────────────────────────────────
const storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

// ── DoctorService ─────────────────────────────────────────────
export const DoctorService = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE}/doctors`);
      if (!response.ok) {
        throw new Error('Falha ao carregar médicos do servidor');
      }
      return await response.json();
    } catch (error) {
      console.warn('Usando médicos locais como fallback:', error);
      return SEED_DOCTORS;
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/doctors/${id}`);
      if (!response.ok) {
        throw new Error('Falha ao carregar médico do servidor');
      }
      return await response.json();
    } catch (error) {
      console.warn('Usando médico local como fallback:', error);
      return SEED_DOCTORS.find((d) => d.id === id) || null;
    }
  },
};

// ── ServiceService ────────────────────────────────────────────
export const MedicalServiceService = {
  getAll: () => Promise.resolve(SEED_SERVICES),
};

// ── AppointmentService ────────────────────────────────────────
const APPOINTMENTS_KEY = 'vitae_appointments';

export const AppointmentService = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE}/appointments`);
      if (!response.ok) {
        throw new Error('Falha ao carregar agendamentos do servidor');
      }
      return await response.json();
    } catch (error) {
      console.warn('Usando agendamentos locais como fallback:', error);
      const data = storage.get(APPOINTMENTS_KEY) || [];
      return data;
    }
  },

  create: async (data) => {
    try {
      const response = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          AppointmentModel.create({
            ...data,
            status: AppointmentModel.statuses.CONFIRMED,
          })
        ),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar agendamento no servidor');
      }

      return await response.json();
    } catch (error) {
      console.warn('Salvando agendamento localmente como fallback:', error);
      const appt = AppointmentModel.create(data);
      const existing = storage.get(APPOINTMENTS_KEY) || [];
      storage.set(APPOINTMENTS_KEY, [...existing, appt]);
      return appt;
    }
  },

  cancel: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: AppointmentModel.statuses.CANCELLED }),
      });

      if (!response.ok) {
        throw new Error('Falha ao cancelar agendamento no servidor');
      }

      return await response.json();
    } catch (error) {
      console.warn('Cancelando agendamento localmente como fallback:', error);
      const existing = storage.get(APPOINTMENTS_KEY) || [];
      const updated = existing.map((a) =>
        a.id === id ? { ...a, status: AppointmentModel.statuses.CANCELLED } : a
      );
      storage.set(APPOINTMENTS_KEY, updated);
      return true;
    }
  },
};

// ── ContactService ────────────────────────────────────────────
export const ContactService = {
  send: (data) => {
    // Em produção, dispararia uma chamada de API real
    console.info('[ContactService] Mensagem recebida:', data);
    return new Promise((res) => setTimeout(() => res({ success: true }), 800));
  },
};