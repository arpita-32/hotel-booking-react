import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import BookingPage from './pages/BookingPage';
import Rooms from './pages/Rooms';

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
            <Route path="/rooms" element={<Rooms/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;