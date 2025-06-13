import { useState, useEffect } from 'react';
import { Card, Button, Modal, Input } from '../components';
import { HeartPulse, LogOut, Calendar, MessageSquare, List, FileText } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { getDemoAppointments } from '../utils/api';

export default function Dashboard() {
  const logout = useUserStore(s => s.logout);
  const user = useUserStore(s => s.user);
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [viewAppointmentsModalOpen, setViewAppointmentsModalOpen] = useState(false);
  const [healthRecordsModalOpen, setHealthRecordsModalOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [appointments, setAppointments] = useState<Array<{ id: string; date: string; reason: string; status: string; }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Demo: Appointment booked for ${appointmentDate} with reason: ${appointmentReason}`);
    setAppointmentModalOpen(false);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Demo: Chat message sent: ${chatMessage}`);
    setChatModalOpen(false);
  };

  const handleViewAppointments = async () => {
    if (!user?.token) return;
    setViewAppointmentsModalOpen(true);
    setLoading(true);
    setError('');
    try {
      const { appointments: demoAppointments } = await getDemoAppointments(user.token);
      setAppointments(demoAppointments);
    } catch (err: any) {
      setError(err.message || 'Failed to load appointments');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-xl text-center">
        <div className="flex flex-col items-center gap-4">
          <HeartPulse className="w-10 h-10 text-primary mb-2" />
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Your Dashboard</h1>
          <p className="text-muted mb-6">Here you can manage appointments, chat with doctors, and view your health records.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button variant="primary" className="w-full sm:w-auto" icon={<Calendar className="w-5 h-5" />} onClick={() => setAppointmentModalOpen(true)}>Book Appointment</Button>
            <Button variant="secondary" className="w-full sm:w-auto" icon={<MessageSquare className="w-5 h-5" />} onClick={() => setChatModalOpen(true)}>Chat with Doctor</Button>
            <Button variant="outline" className="w-full sm:w-auto" icon={<List className="w-5 h-5" />} onClick={handleViewAppointments}>View Appointments</Button>
            <Button variant="outline" className="w-full sm:w-auto" icon={<FileText className="w-5 h-5" />} onClick={() => setHealthRecordsModalOpen(true)}>Health Records</Button>
            <Button variant="outline" className="w-full sm:w-auto" icon={<LogOut className="w-5 h-5" />} onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </Card>

      {/* Demo Appointment Modal */}
      <Modal open={appointmentModalOpen} onClose={() => setAppointmentModalOpen(false)} title="Book an Appointment (Demo)">
        <form onSubmit={handleBookAppointment} className="flex flex-col gap-4">
          <Input label="Date" type="date" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} required />
          <Input label="Reason" type="text" placeholder="Brief reason for appointment" value={appointmentReason} onChange={e => setAppointmentReason(e.target.value)} required />
          <Button type="submit" variant="primary">Book (Demo)</Button>
        </form>
      </Modal>

      {/* Demo Chat Modal */}
      <Modal open={chatModalOpen} onClose={() => setChatModalOpen(false)} title="Chat with Doctor (Demo)">
        <form onSubmit={handleSendChat} className="flex flex-col gap 4">
          <Input label="Message" type="text" placeholder="Type your message..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} required />
          <Button type="submit" variant="primary">Send (Demo)</Button>
        </form>
      </Modal>

      {/* Demo View Appointments Modal */}
      <Modal open={viewAppointmentsModalOpen} onClose={() => setViewAppointmentsModalOpen(false)} title="Your Appointments (Demo)">
        {loading ? (
          <div className="text-center">Loading appointments...</div>
        ) : error ? (
          <div className="text-danger text-center">{error}</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {appointments.map((appt: { id: string; date: string; reason: string; status: string }) => (
              <li key={appt.id} className="py-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{appt.date}</span>
                  <span className="text-muted">{appt.status}</span>
                </div>
                <div className="text-sm text-muted">{appt.reason}</div>
              </li>
            ))}
          </ul>
        )}
      </Modal>

      {/* Demo Health Records Modal (placeholder) */}
      <Modal open={healthRecordsModalOpen} onClose={() => setHealthRecordsModalOpen(false)} title="Health Records (Demo)">
        <div className="text-center">Your health records (demo) are coming soon.</div>
      </Modal>
    </div>
  );
} 