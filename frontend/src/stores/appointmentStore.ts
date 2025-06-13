import { create } from 'zustand';
import { api } from '../utils/api';

export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
  doctor?: {
    id: number;
    first_name: string;
    last_name: string;
    specialization: string;
  };
}

interface AppointmentStore {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  fetchAppointments: () => Promise<void>;
  createAppointment: (appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateAppointment: (id: number, status: Appointment['status']) => Promise<void>;
  cancelAppointment: (id: number) => Promise<void>;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [],
  isLoading: false,
  error: null,

  fetchAppointments: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/appointments');
      set({ appointments: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch appointments', isLoading: false });
    }
  },

  createAppointment: async (appointmentData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/appointments', appointmentData);
      set((state) => ({
        appointments: [...state.appointments, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create appointment', isLoading: false });
      throw error;
    }
  },

  updateAppointment: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.patch(`/appointments/${id}`, { status });
      set((state) => ({
        appointments: state.appointments.map((apt) =>
          apt.id === id ? response.data : apt
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update appointment', isLoading: false });
      throw error;
    }
  },

  cancelAppointment: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/appointments/${id}`);
      set((state) => ({
        appointments: state.appointments.filter((apt) => apt.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to cancel appointment', isLoading: false });
      throw error;
    }
  },
})); 