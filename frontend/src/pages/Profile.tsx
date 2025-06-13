import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { useToast } from '../components/ui/ToastProvider';

export default function Profile() {
  const { user, fetchProfile, logout, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    fetchProfile().catch(() => {
      showToast('Failed to fetch profile.', 'error');
    });
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully.', 'success');
    setTimeout(() => navigate('/login'), 1200);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Profile not found</h2>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <div className="space-y-2">
          <div><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</div>
          <div><span className="font-semibold">Email:</span> {user.email}</div>
          <div><span className="font-semibold">Role:</span> {user.role}</div>
          <div><span className="font-semibold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</div>
        </div>
        <Button className="mt-6" variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </div>
  );
} 