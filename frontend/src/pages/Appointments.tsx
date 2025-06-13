import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAppointmentStore } from '../stores/appointmentStore';
import { useAuthStore } from '../stores/authStore';
import { AppointmentCard } from '../components/appointments/AppointmentCard';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Toast } from '../components/ui/Toast';

export function Appointments() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    appointments,
    isLoading,
    error,
    fetchAppointments,
    updateAppointment,
    cancelAppointment,
  } = useAppointmentStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchAppointments();
    // eslint-disable-next-line
  }, [user, navigate]);

  const handleComplete = async (id: number) => {
    try {
      setIsUpdating(true);
      await updateAppointment(id, 'completed');
      setToast({ message: 'Appointment marked as completed.', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to complete appointment.', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      setIsUpdating(true);
      await cancelAppointment(id);
      setToast({ message: 'Appointment cancelled.', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to cancel appointment.', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => fetchAppointments()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="mt-2 text-gray-600">
            Manage your healthcare appointments
          </p>
        </div>
        <Button
          onClick={() => navigate('/appointments/new')}
          className="flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          New Appointment
        </Button>
      </div>

      {appointments.length === 0 ? (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold">No appointments found</h2>
          <p className="mt-2 text-gray-600">
            Schedule your first appointment to get started
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/appointments/new')}
          >
            Schedule Appointment
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onComplete={handleComplete}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
} 