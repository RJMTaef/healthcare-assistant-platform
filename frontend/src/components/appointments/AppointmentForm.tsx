import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';
import { getDoctors } from '../../utils/api';
import { Toast } from '../ui/Toast';

interface AppointmentFormData {
  doctor_id: number;
  appointment_date: string;
  notes?: string;
}

interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  specialization?: string;
}

const initialFormData: AppointmentFormData = {
  doctor_id: 0,
  appointment_date: '',
  notes: '',
};

export function AppointmentForm() {
  const navigate = useNavigate();
  const { createAppointment, isLoading } = useAppointmentStore();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState<AppointmentFormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    setLoadingDoctors(true);
    getDoctors()
      .then((data) => setDoctors(data as Doctor[]))
      .catch(() => setError('Failed to load doctors'))
      .finally(() => setLoadingDoctors(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.doctor_id) {
      setError('Please select a doctor.');
      return;
    }
    if (!formData.appointment_date || isNaN(Date.parse(formData.appointment_date))) {
      setError('Please select a valid date and time.');
      return;
    }
    if (!user) {
      setError('You must be logged in to schedule an appointment.');
      return;
    }

    try {
      await createAppointment({
        ...formData,
        patient_id: user.id,
        status: 'scheduled',
      });
      setToast({ message: 'Appointment scheduled successfully!', type: 'success' });
      setTimeout(() => navigate('/appointments'), 1200);
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Failed to create appointment', type: 'error' });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="mx-auto max-w-2xl p-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Schedule Appointment</h2>
          <p className="mt-2 text-gray-600">
            Fill in the details to schedule your appointment
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-4 text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="doctor_id"
              className="block text-sm font-medium text-gray-700"
            >
              Select Doctor
            </label>
            {loadingDoctors ? (
              <div className="flex items-center gap-2 text-gray-500 text-sm py-2">
                <Spinner size="sm" /> Loading doctors...
              </div>
            ) : doctors.length === 0 ? (
              <div className="text-sm text-gray-500 py-2">No doctors available. Please try again later.</div>
            ) : (
              <select
                id="doctor_id"
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.first_name} {doctor.last_name}
                    {doctor.specialization ? ` - ${doctor.specialization}` : ''}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label
              htmlFor="appointment_date"
              className="block text-sm font-medium text-gray-700"
            >
              Appointment Date and Time
            </label>
            <div className="mt-1 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="date"
                  id="appointment_date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative flex-1">
                <input
                  type="time"
                  id="appointment_time"
                  name="appointment_time"
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':');
                    const date = new Date(formData.appointment_date);
                    date.setHours(parseInt(hours), parseInt(minutes));
                    setFormData((prev) => ({
                      ...prev,
                      appointment_date: date.toISOString(),
                    }));
                  }}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
                <Clock className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Add any additional notes or concerns..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/appointments')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Scheduling...
              </>
            ) : (
              'Schedule Appointment'
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
} 