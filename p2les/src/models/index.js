// ============================================================
// MODELS — Definições de entidades e estruturas de dados
// ============================================================

export const DoctorModel = {
  create: ({ id, name, specialty, crm, bio, image, schedule }) => ({
    id,
    name,
    specialty,
    crm,
    bio,
    image,
    schedule: schedule || [],
  }),
};

export const AppointmentModel = {
  create: ({ id, patientName, patientEmail, patientPhone, doctorId, date, time, reason, status }) => ({
    id: id || Date.now().toString(),
    patientName,
    patientEmail,
    patientPhone,
    doctorId,
    date,
    time,
    reason,
    status: status || 'pending',
    createdAt: new Date().toISOString(),
  }),
  statuses: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
  },
};

export const ServiceModel = {
  create: ({ id, name, description, icon, duration }) => ({
    id,
    name,
    description,
    icon,
    duration,
  }),
};

export const ContactModel = {
  create: ({ name, email, phone, subject, message }) => ({
    name,
    email,
    phone,
    subject,
    message,
    sentAt: new Date().toISOString(),
  }),
};