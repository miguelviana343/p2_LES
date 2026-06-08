// ============================================================
// CONTROLLERS — Lógica de negócio e orquestração entre
//               Services e Views
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import {
  DoctorService,
  MedicalServiceService,
  AppointmentService,
  ContactService,
} from '../services';

// ── useDoctorController ───────────────────────────────────────
export const useDoctorController = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    DoctorService.getAll()
      .then(setDoctors)
      .finally(() => setLoading(false));
  }, []);

  const selectDoctor = useCallback((id) => {
    DoctorService.getById(id).then(setSelected);
  }, []);

  const clearSelected = useCallback(() => setSelected(null), []);

  return { doctors, loading, selected, selectDoctor, clearSelected };
};

// ── useMedicalServiceController ──────────────────────────────
export const useMedicalServiceController = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MedicalServiceService.getAll()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
};

// ── useAppointmentController ──────────────────────────────────
export const useAppointmentController = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const loadAppointments = useCallback(() => {
    AppointmentService.getAll().then(setAppointments);
  }, []);

  useEffect(() => { loadAppointments(); }, [loadAppointments]);

  const createAppointment = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Validação de negócio
      if (!data.patientName || !data.patientEmail || !data.doctorId || !data.date || !data.time) {
        throw new Error('Preencha todos os campos obrigatórios.');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.patientEmail)) {
        throw new Error('E-mail inválido.');
      }
      await AppointmentService.create(data);
      setSuccess(true);
      loadAppointments();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [loadAppointments]);

  const cancelAppointment = useCallback(async (id) => {
    await AppointmentService.cancel(id);
    loadAppointments();
  }, [loadAppointments]);

  const resetForm = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { appointments, loading, error, success, createAppointment, cancelAppointment, resetForm };
};

// ── useContactController ──────────────────────────────────────
export const useContactController = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!data.name || !data.email || !data.message) {
        throw new Error('Preencha nome, e-mail e mensagem.');
      }
      await ContactService.send(data);
      setSuccess(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { loading, error, success, sendMessage, reset };
};