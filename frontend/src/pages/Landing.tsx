import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { 
  Shield, 
  Clock, 
  Users, 
  Calendar, 
  MessageSquare, 
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Zap
} from 'lucide-react';

const Landing: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & HIPAA Compliant",
      description: "Enterprise-grade security with end-to-end encryption and HIPAA compliance for patient data protection."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Scheduling",
      description: "Instant appointment booking with real-time availability and automated reminders."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-role Platform",
      description: "Seamless experience for patients, doctors, and administrators with role-based access."
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Smart Calendar",
      description: "Intelligent scheduling with conflict detection and optimized time slot management."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Integrated Communication",
      description: "Built-in messaging system with notifications and appointment updates."
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Comprehensive quality metrics and patient satisfaction tracking."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Patients" },
    { number: "500+", label: "Healthcare Providers" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      content: "This platform has revolutionized how I manage my practice. The scheduling is seamless and my patients love the convenience.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content: "Booking appointments has never been easier. The interface is intuitive and the reminders are always on time.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">HealthCare Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link to="/register">
                <Button variant="primary" size="md">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
              <Zap className="h-4 w-4 mr-2" />
              Trusted by leading healthcare organizations
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Modern Healthcare
              <span className="text-blue-600"> Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your healthcare operations with our enterprise-grade platform. 
              Connect patients and providers seamlessly with advanced scheduling, 
              secure communication, and comprehensive care management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for modern healthcare
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with enterprise-grade security and designed for seamless user experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-blue-600">{feature.icon}</div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by healthcare professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about their experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="gradient">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your healthcare practice?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers who trust our platform for their daily operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">HealthCare Pro</span>
              </div>
              <p className="text-gray-400">
                Modern healthcare platform for the digital age.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HealthCare Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 