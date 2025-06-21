import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import OpenRoute from "./components/core/Auth/OpenRoute"
import AboutUs from "./pages/AboutUs"
import BookingPage from "./pages/BookingPage"
import ContactUs from "./pages/ContactUs"
import Dashboard from "./pages/Dashboard"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Rooms from "./pages/Rooms"
import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail"
import Settings from "./components/core/Dashboard/Settings"
import AddRoomForm from "./components/core/Dashboard/admin/AddRoomForm"
import AllRooms from "./components/core/Dashboard/admin/AllRooms"
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import MyProfile from "./components/core/Dashboard/customer/MyProfile"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import { Navigate } from "react-router-dom"

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
            
            {/* Auth Routes */}
            <Route path="/login" element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            } />
            <Route path="/signup" element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            } />
            <Route path="/forgot-password" element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            } />
            <Route path="/update-password/:id" element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            } />
            <Route path="/verify-email" element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            } />

            {/* Admin Dashboard */}
            <Route path="/admin/dashboard" element={
              <PrivateRoute allowedRoles={['admin']}>
                <Dashboard />
              </PrivateRoute>
            }>
              <Route index element={<Navigate to="my-profile" replace />} />
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="add-room" element={<AddRoomForm />} />
              <Route path="all-rooms" element={<AllRooms />} />
              <Route path="*" element={<Navigate to="my-profile" replace />} />
            </Route>

            {/* Customer Dashboard */}
            <Route path="/dashboard" element={
              <PrivateRoute allowedRoles={['customer']}>
                <Dashboard />
              </PrivateRoute>
            }>
              <Route index element={<Navigate to="my-profile" replace />} />
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="my-profile" replace />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App