import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import BookingPage from './pages/BookingPage';

const App = () => {
  return (
    <Router>
      <div className="font-sans text-gray-800 min-h-screen flex flex-col">
      
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/book" element={<BookingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;