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
import Settings from './components/core/Dashboard/Settings';
import Profile from './components/core/Dashboard/customer/Profile';
import AddRoomForm from './components/core/Dashboard/admin/AddRoomForm';
import AllRooms from './components/core/Dashboard/admin/AllRooms';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';

const App = () => {
  return (
    <Router>
      <div className="font-sans text-gray-800 min-h-screen flex flex-col">
        
        
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
            <Route path="/my-profile" element={<Profile/>} />
           <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
      <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
            
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
      
<Route path="/admin/dashboard" element={<Dashboard />}>
  <Route path="my-profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
  <Route path="add-room" element={<AddRoomForm />} />
  <Route path="all-rooms" element={<AllRooms />} />
</Route>

<Route path="/dashboard" element={<Dashboard />}>
  <Route path="my-profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
          </Routes>
        </main>
        
      
      </div>
    </Router>
  );
};



export default App;