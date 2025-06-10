import Footer from '../components/common/Footer';
import Navbar from '../components/common/NavBar';
import ReviewSlider from '../components/common/ReviewSlider';
import ContactForm from '../components/core/ContactPage/ContactForm';
import React from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import HighlightText from '../components/common/HighlightText';

const ContactUs = () => {
  return (
    <div className="bg-richblack-900 text-richblack-100 min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-richblack-800 w-full py-12 md:py-16 lg:py-20 pt-22">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
          >
            Get in <HighlightText text="Touch" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-richblack-200 mx-auto max-w-2xl text-base sm:text-lg md:text-xl"
          >
            Our concierge team is available 24/7 to assist with reservations, special requests, or any inquiries about your stay.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16">
            {/* Contact Details */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-richblack-800 rounded-xl p-6 sm:p-8 md:p-10 h-full"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-500">Contact Information</h2>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <FiMapPin className="text-orange-500 mt-1 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Address</h3>
                      <p className="text-richblack-200">123 Luxury Avenue, Beachfront District<br />Coastal City 90210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <FiPhone className="text-orange-500 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone</h3>
                      <a href="tel:+15551234567" className="text-richblack-200 hover:text-orange-500 transition">+1 (555) 123-4567</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <FiMail className="text-orange-500 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <a href="mailto:info@luxuryhaven.com" className="text-richblack-200 hover:text-orange-500 transition">info@luxuryhaven.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <FiClock className="text-orange-500 mt-1 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                      <ul className="space-y-2 text-richblack-200">
                        <li className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>8:00 AM - 10:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Saturday - Sunday</span>
                          <span>9:00 AM - 11:00 PM</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Contact Form */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <ContactForm 
                  title="Send Us a Message"
                  subtitle="We typically respond within 2 hours during business days"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Testimonials */}
      <section className="bg-richblack-800 w-full py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
          >
            What Our Guests Say
          </motion.h2>
          <ReviewSlider 
            reviews={[
              { 
                text: "The concierge service was exceptional! They arranged everything from dinner reservations to theater tickets.", 
                author: "Sarah K.",
                rating: 5
              },
              { 
                text: "Best hotel experience we've ever had. The staff remembered our names and preferences throughout our stay.", 
                author: "Michael & Emma",
                rating: 5
              },
              { 
                text: "Impeccable attention to detail. We'll definitely be returning for our anniversary next year.", 
                author: "James L.",
                rating: 5
              }
            ]}
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactUs;