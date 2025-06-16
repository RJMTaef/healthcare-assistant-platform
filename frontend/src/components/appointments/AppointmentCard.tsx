import { format } from 'date-fns';
import { Calendar, Clock, User, X, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Appointment } from '../../stores/appointmentStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: number) => void;
  onComplete?: (id: number) => void;
  className?: string;
}

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export function AppointmentCard({
  appointment,
  onCancel,
  onComplete,
  className,
}: AppointmentCardProps) {
  const appointmentDate = new Date(appointment.date);
  const formattedDate = format(appointmentDate, 'MMMM d, yyyy');
  const formattedTime = format(appointmentDate, 'h:mm a');

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium">{formattedTime}</span>
          </div>
          {appointment.doctor && (
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <div>
                <span className="font-medium">
                  Dr. {appointment.doctor.first_name} {appointment.doctor.last_name}
                </span>
                <p className="text-sm text-gray-600">{appointment.doctor.specialization}</p>
              </div>
            </div>
          )}
          {appointment.reason && (
            <p className="text-sm text-gray-600">{appointment.reason}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={cn(
              'rounded-full px-3 py-1 text-sm font-medium',
              statusColors[appointment.status]
            )}
          >
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
          {appointment.status === 'scheduled' && (
            <div className="flex gap-2">
              {onComplete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onComplete(appointment.id)}
                  className="flex items-center gap-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  Complete
                </Button>
              )}
              {onCancel && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onCancel(appointment.id)}
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
} 