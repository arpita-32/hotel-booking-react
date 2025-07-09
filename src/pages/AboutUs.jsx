import HighlightText from '../components/common/HighlightText';
import React from 'react'
import Footer from '../components/common/Footer';
import Navbar from '../components/common/NavBar';
import ReviewSlider from '../components/common/ReviewSlider';
import AmenitiesGrid from '../components/core/AboutPage/AmenitiesGrid';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import Quote from '../components/core/AboutPage/Quote';
import Stats from '../components/core/AboutPage/Stats';

const AboutUs = () => {
  // Image URLs
  const images = [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  ];

  return (
<div className="overflow-x-hidden bg-black text-yellow-50">
        <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gray-900 pt-22 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Redefining Luxury Hospitality for a <br className="hidden sm:block" />
            <HighlightText text="Memorable Stay" />
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
            Luxury Haven is at the forefront of hospitality excellence. We're passionate about creating unforgettable experiences through impeccable service, world-class amenities, and attention to every detail.
          </p>
        </div>
      </section>

      {/* Images Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {images.slice(0, 3).map((img, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <img 
                src={img} 
                alt="" 
                className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quote Section */}
      <div className="container text-yellow-400 mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16">
        <Quote 
          text="True luxury is not about being served, but about being remembered." 
          author="— Giovanni Rana, General Manager"
        />
      </div>

      {/* Divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-10 md:my-12">
        <div className="h-px bg-gray-400 opacity-30 w-full"></div>
      </div>

      {/* Founding Story Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Our Heritage
            </h2>
            <div className="space-y-4 text-gray-400 text-sm sm:text-base">
              <p>
                Luxury Haven was born from a vision to redefine hospitality. Established in 1995 by hotelier James Wilson, we began as a small boutique property with just 20 rooms. Our founder believed luxury wasn't about opulence, but about creating personalized experiences that guests would cherish forever.
              </p>
              <p>
                Over the years, we've grown into an award-winning hotel chain while maintaining our commitment to authentic hospitality. Each property reflects the local culture while delivering the consistent excellence that has become our hallmark.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img 
                src={images[3]} 
                alt="Historic hotel photo"
                className="w-full h-auto object-cover hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 md:mt-24">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-b from-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-4 sm:mb-6">
              Our Promise
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              We promise more than just a place to stay. Every detail - from our signature scent in the lobby to the thread count of your sheets - is carefully curated to create a sense of belonging. Our staff are trained not just to serve, but to anticipate your needs before you express them.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6">
              Sustainability Commitment
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Luxury and responsibility go hand in hand. We've reduced our carbon footprint by 40% through initiatives like solar power, zero-waste kitchens, and partnerships with local artisans. Our green roof gardens supply our restaurants, and we've eliminated single-use plastics across all properties.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container bg-gray-900 mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 md:mt-24">
        <Stats 
          stats={[
            { number: "25+", label: "Years in Hospitality" },
            { number: "10K+", label: "Happy Guests Yearly" },
            { number: "150+", label: "Awards Won" },
            { number: "100%", label: "Locally Sourced Cuisine" }
          ]}
        />
      </section>

      {/* Amenities Section */}
      <section className="container bg-gray-900 mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 md:mt-24">
        <AmenitiesGrid 
          amenities={[
            { icon: "🏊", title: "Infinity Pool", desc: "With panoramic city views" },
            { icon: "🍽️", title: "Michelin-Star Dining", desc: "3 signature restaurants" },
            { icon: "💆", title: "Luxury Spa", desc: "Using organic products" },
            { icon: "🏋️", title: "Fitness Center", desc: "Open 24/7" },
            { icon: "👶", title: "Kids Club", desc: "Supervised activities" },
            { icon: "🚗", title: "Valet Parking", desc: "Complimentary for guests" }
          ]}
        />
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 md:mt-24">
        <ContactFormSection 
          title="Planning Your Stay?"
          subtitle="Our concierge team is ready to personalize your experience"
        />
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-900 py-12 sm:py-16 md:py-20 mt-16 sm:mt-20 md:mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            What Our Guests Say
          </h2>
          <ReviewSlider 
            reviews={[
              { text: "The service was impeccable. They remembered our anniversary!", author: "Sarah K." },
              { text: "Best hotel bed I've ever slept in. Already planning our return!", author: "Michael T." },
              { text: "Attention to detail is unmatched. True luxury experience.", author: "Emma & John" }
            ]}
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutUs;