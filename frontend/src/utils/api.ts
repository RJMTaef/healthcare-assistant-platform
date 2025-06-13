import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
}

export async function register(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}) {
  const response = await api.post('/auth/register', data);
  return response.data;
}

export async function getProfile() {
  const response = await api.get('/auth/profile');
  return response.data;
}

export async function getDemoAppointments(token: string) {
  // Simulate a delay (e.g. 1.5 s) to mimic a real API call.
  await new Promise(resolve => setTimeout(resolve, 1500));
  const demoAppointments = [
    { id: '1', date: '2025-06-15', reason: 'Annual Checkup', status: 'scheduled' },
    { id: '2', date: '2025-07-20', reason: 'Follow-up', status: 'pending' },
    { id: '3', date: '2025-08-10', reason: 'Consultation', status: 'scheduled' }
  ];
  return { appointments: demoAppointments };
}

export async function getDoctors() {
  const response = await api.get('/doctors');
  return response.data;
} 