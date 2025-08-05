import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Calendar, 
  Clock, 
  Users, 
  MessageSquare, 
  Plus,
  TrendingUp,
  TrendingDown,
  User
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [notifications] = useState([
    { id: 1, message: 'New appointment scheduled for tomorrow', time: '2 min ago', unread: true },
    { id: 2, message: 'Patient feedback received', time: '1 hour ago', unread: true },
    { id: 3, message: 'System maintenance completed', time: '3 hours ago', unread: false }
  ]);

  const stats = [
    {
      title: 'Total Appointments',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: 'Active Patients',
      value: '2,847',
      change: '+8%',
      trend: 'up',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'Pending Reviews',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      title: 'Avg. Response Time',
      value: '2.4h',
      change: '-15%',
      trend: 'down',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: 'Today, 2:30 PM',
      type: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'Michael Chen',
      time: 'Tomorrow, 10:00 AM',
      type: 'Consultation',
      status: 'pending'
    },
    {
      id: 3,
      patient: 'Emily Davis',
      time: 'Tomorrow, 3:15 PM',
      type: 'Check-up',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Appointments</CardTitle>
                  <CardDescription>Your upcoming and recent appointments</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.patient}</p>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent activity and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg ${notification.unread ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm ${notification.unread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">Schedule Appointment</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">View Patients</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span className="text-sm">Send Message</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <User className="h-6 w-6 mb-2" />
                <span className="text-sm">My Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 