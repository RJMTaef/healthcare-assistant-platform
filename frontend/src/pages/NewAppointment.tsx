import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { AppointmentForm } from '../components/appointments/AppointmentForm';

export function NewAppointment() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Appointment</h1>
        <p className="mt-2 text-gray-600">
          Schedule a new appointment with one of our healthcare providers
        </p>
      </div>

      <AppointmentForm />
    </div>
  );
} 