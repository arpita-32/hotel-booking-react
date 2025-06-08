import React from 'react';
import { FiStar } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand & Social */}
          <div>
            <div className="flex items-center mb-4">
              <FiStar className="text-orange-500 text-2xl mr-2" />
              <span className="text-xl font-bold">Luxury Haven</span>
            </div>
            <p className="text-gray-400 mb-4">
              Redefining luxury hospitality with exceptional service and unforgettable experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="/book" className="text-gray-400 hover:text-white">Book Now</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Luxury Avenue</li>
              <li>Beachfront District</li>
              <li>Coastal City 90210</li>
              <li>+1 (555) 123-4567</li>
              <li>info@luxuryhaven.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe for special offers</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md text-gray-800"
              />
              
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center px-4">
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Luxury Haven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;