import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { Appointments } from './pages/Appointments';
import { NewAppointment } from './pages/NewAppointment';
import Patients from './pages/Patients';
import Messages from './pages/Messages';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuthStore } from './stores/authStore';

function App() {
  const initializeAuth = useAuthStore(s => s.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments/new"
            element={
              <ProtectedRoute>
                <NewAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Other Routes */}
        <Route element={<MainLayout />}>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
