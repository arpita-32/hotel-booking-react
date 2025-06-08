import Footer from '../components/common/Footer';
import Navbar from '../components/common/NavBar';
import ReviewSlider from '../components/common/ReviewSlider';
import ContactDetails from '../components/core/ContactPage/ContactDetails';
import ContactForm from '../components/core/ContactPage/ContactForm';
import React from 'react';

const ContactUs = () => {
  return (
    <div className='overflow-x-hidden bg-richblack-900 text-richblack-100'>
      <Navbar />
      
      {/* Hero Section - Tightened spacing */}
      <div className='bg-richblack-800 pt-12 pb-6 sm:pt-16 sm:pb-8'> {/* Reduced bottom padding */}
        <div className='w-11/12 max-w-maxContent mx-auto text-center'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-1'> {/* Reduced margin-bottom */}
            Get in <span className='text-orange-400'>Touch</span>
          </h1>
          <p className='text-richblack-200 max-w-2xl mx-auto mt-2'> {/* Added mt-2 instead of default margin */}
            Our concierge team is available 24/7 to assist with reservations, special requests, or any inquiries about your stay.
          </p>
        </div>
      </div>

      {/* Contact Content - Removed top margin completely */}
      <div className='w-11/12 max-w-maxContent mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 justify-center px-2 sm:px-4'>
        <ContactDetails 
          address="123 Luxury Avenue, Beachfront District, Coastal City 90210"
          phone="+1 (555) 123-4567"
          email="info@luxuryhaven.com"
          hours={[
            { day: "Monday - Friday", time: "8:00 AM - 10:00 PM" },
            { day: "Saturday - Sunday", time: "9:00 AM - 11:00 PM" }
          ]}
        />
        <ContactForm 
          title="Send Us a Message"
          subtitle="We typically respond within 2 hours during business days"
        />
      </div>

    

      {/* Guest Reviews */}
      <div className="w-11/12 max-w-maxContent mx-auto my-12 sm:my-16 flex flex-col items-center justify-between gap-6 sm:gap-8 bg-richblack-800 text-black px-6 py-8 sm:py-10 rounded-xl">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold">
          What Our Guests Say
        </h1>
        <ReviewSlider 
          reviews={[
            { 
              text: "The concierge service was exceptional! They arranged everything from dinner reservations to theater tickets.", 
              author: "Sarah K." 
            },
            { 
              text: "Best hotel experience we've ever had. The staff remembered our names and preferences throughout our stay.", 
              author: "Michael & Emma" 
            },
            { 
              text: "Impeccable attention to detail. We'll definitely be returning for our anniversary next year.", 
              author: "James L." 
            }
          ]}
        />
      </div>

      <Footer />
    </div>
  )
}

export default ContactUs;