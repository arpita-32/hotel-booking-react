import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import BookingPage from './pages/BookingPage';
import Rooms from './pages/Rooms';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './page/CustomerDashboard';
import AdminBookings from './components/core/Dashboard/admin/Dashboard';
import AdminRooms from './components/core/Dashboard/admin/Rooms';
import AddRoom from './components/core/Dashboard/admin/AddRoom';
import CustomerProfile from './components/core/Dashboard/customer/Profile';
import CustomerBookings from './pages/dashboard/customer/Bookings';
import Settings from './pages/dashboard/Settings';
import ProtectedRoute from './components/core/Auth/ProtectedRoute';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="font-sans text-gray-800 min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard Redirect */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard/redirect" replace />
                </ProtectedRoute>
              }
            />

            {/* Admin Dashboard Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="rooms" element={<AdminRooms />} />
              <Route path="add-room" element={<AddRoom />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Customer Dashboard Routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<CustomerProfile />} />
              <Route path="profile" element={<CustomerProfile />} />
              <Route path="bookings" element={<CustomerBookings />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Role-based redirect */}
            <Route
              path="/dashboard/redirect"
              element={
                <ProtectedRoute>
                  <DashboardRedirect />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

// Component to redirect based on user role
function DashboardRedirect() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'Admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  }, [user, navigate]);

  return <div className="flex justify-center items-center h-screen">Loading...</div>;
}

export default App;