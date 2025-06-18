import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/common/Footer';
import NavBar from './components/common/NavBar';
import OpenRoute from './components/core/Auth/OpenRoute';
import AboutUs from './pages/AboutUs';
import BookingPage from './pages/BookingPage';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Setting from './components/core/Dashboard/Settings';
import Profile from './components/core/Dashboard/customer/Profile';

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

            
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="dashboard/settings" element={<Setting />} />
        <Route path="dashboard/my-profile" element={<Profile />} />

          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};



export default App;