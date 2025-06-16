import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { useToast } from '../components/ui/ToastProvider';
import { Input } from '../components/ui/Input';

export default function Profile() {
  const { user, fetchProfile, logout, isLoading, editProfile } = useAuthStore();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchProfile().catch(() => {
        showToast('Failed to fetch profile.', 'error');
      });
    } else {
      setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    }
    // eslint-disable-next-line
  }, [user]);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully.', 'success');
    setTimeout(() => navigate('/login'), 1200);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setFormError('All fields are required.');
      setFormLoading(false);
      return;
    }
    try {
      await editProfile(form);
      showToast('Profile updated!', 'success');
      setEditOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Failed to update profile');
    } finally {
      setFormLoading(false);
    }
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
        <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            Edit Profile
          </Button>
          <Button className="" variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <Card className="max-w-md w-full p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setEditOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleEdit} className="space-y-4">
              <Input
                label="First Name"
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                required
              />
              <Input
                label="Last Name"
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                required
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              {formError && <div className="text-destructive text-sm">{formError}</div>}
              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? <Spinner size="sm" className="mr-2" /> : null}
                  {formLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
} 