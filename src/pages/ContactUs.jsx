import Footer from '../components/common/Footer';
import Navbar from '../components/common/NavBar';
import ReviewSlider from '../components/common/ReviewSlider';
import ContactDetails from '../components/core/ContactPage/ContactDetails';
import ContactForm from '../components/core/ContactPage/ContactForm';
import React from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <div className='overflow-x-hidden bg-richblack-900 text-richblack-100 min-h-screen flex flex-col'>
      <Navbar />
      
      {/* Hero Section */}
      <section className='bg-richblack-800 py-12 sm:py-16 md:py-20 lg:py-24'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6'
          >
            Get in <span className='text-orange-400'>Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='text-richblack-200 max-w-3xl mx-auto text-base sm:text-lg md:text-xl'
          >
            Our concierge team is available 24/7 to assist with reservations, special requests, or any inquiries about your stay.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className='flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20'>
        <div className='flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12 xl:gap-16'>
          {/* Contact Details */}
          <div className='w-full lg:w-1/2'>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='bg-richblack-800 rounded-xl p-6 sm:p-8 md:p-10 shadow-lg h-full'
            >
              <h2 className='text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-orange-400'>Contact Information</h2>
              
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <FiMapPin className='text-orange-400 mt-1 text-xl flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-lg mb-1'>Address</h3>
                    <p className='text-richblack-200'>123 Luxury Avenue, Beachfront District<br />Coastal City 90210</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-4'>
                  <FiPhone className='text-orange-400 text-xl flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-lg mb-1'>Phone</h3>
                    <a href="tel:+15551234567" className='text-richblack-200 hover:text-orange-400 transition'>+1 (555) 123-4567</a>
                  </div>
                </div>
                
                <div className='flex items-center gap-4'>
                  <FiMail className='text-orange-400 text-xl flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-lg mb-1'>Email</h3>
                    <a href="mailto:info@luxuryhaven.com" className='text-richblack-200 hover:text-orange-400 transition'>info@luxuryhaven.com</a>
                  </div>
                </div>
                
                <div className='flex items-start gap-4'>
                  <FiClock className='text-orange-400 mt-1 text-xl flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-lg mb-2'>Business Hours</h3>
                    <ul className='space-y-2 text-richblack-200'>
                      <li className='flex justify-between max-w-xs'>
                        <span>Monday - Friday</span>
                        <span>8:00 AM - 10:00 PM</span>
                      </li>
                      <li className='flex justify-between max-w-xs'>
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
          <div className='w-full lg:w-1/2'>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ContactForm 
                title="Send Us a Message"
                subtitle="We typically respond within 2 hours during business days"
              />
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className='mt-12 sm:mt-16 md:mt-20 rounded-xl overflow-hidden shadow-xl'
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209132773!2d-73.987844924533!3d40.74844047138911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTQuMiJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
            width="100%" 
            height="400"
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            className='w-full h-64 sm:h-80 md:h-96 lg:h-[400px]'
            title="Hotel Location Map"
          ></iframe>
        </motion.div>
      </section>

      {/* Guest Reviews */}
      <section className='bg-richblack-800 py-12 sm:py-16 md:py-20 lg:py-24'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12'
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