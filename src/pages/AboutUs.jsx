import React from 'react';
import HighlightText from '../components/core/HomePage/HighlightText';

import Quote from '../components/core/AboutPage/Quote';
import Stats from '../components/core/AboutPage/Stats';
import AmenitiesGrid from '../components/core/AboutPage/AmenitiesGrid';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

// Placeholder image URLs
const image1 = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
const image2 = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
const image3 = "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
const image4 = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
const AboutUs = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="relative mx-auto flex flex-col items-center w-11/12 max-w-maxContent text-black">
      <Navbar/>
        {/* Hero Section */}
        <div className='bg-richblack-700 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-screen'>
          <div className='flex flex-col items-center justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-[90px] gap-3 w-[90%] sm:w-[85%] mx-auto text-center'>
            <div className='font-semibold text-2xl sm:text-3xl lg:text-4xl'>
              Redefining Luxury Hospitality for a
              <HighlightText text="Memorable Stay"/>
            </div>
            <div className='text-richblack-200 opacity-90 text-xs sm:text-sm md:text-base'>
              Luxury Haven is at the forefront of hospitality excellence. We're passionate about creating unforgettable experiences through impeccable service, world-class amenities, and attention to every detail.
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div className='relative lg:absolute grid grid-cols-3 gap-2 sm:gap-3 md:gap-5 lg:gap-8 mt-12 sm:mt-16 lg:mt-[290px] px-2 sm:px-4'>
          <img src={image1} className='w-full h-auto max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-none rounded-lg' alt="hotel lobby"/>
          <img src={image2} className='w-full h-auto max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-none rounded-lg' alt="hotel pool"/>
          <img src={image3} className='w-full h-auto max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-none rounded-lg' alt="hotel suite"/>
        </div>

        <Quote 
          text="True luxury is not about being served, but about being remembered." 
          author="— Giovanni Rana, General Manager"
        />

        <div className='mt-4 sm:mt-6 md:mt-8 bg-richblack-400 h-[1px] w-screen opacity-30'></div>

        {/* Founding Story Section */}
        <div className='relative flex flex-col lg:flex-row mx-auto gap-6 md:gap-10 lg:gap-15 justify-between items-center mt-12 sm:mt-14 md:mt-16 lg:mt-[90px] px-4'>
          <div className='w-full lg:w-[50%] gap-4 sm:gap-6 md:gap-8 flex flex-col'>
            <div className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-2xl sm:text-3xl lg:text-4xl font-semibold text-transparent'>
              Our Heritage
            </div>
            <div className='text-richblack-200 opacity-90 flex flex-col gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base'>
              <p>
                Luxury Haven was born from a vision to redefine hospitality. Established in 1995 by hotelier James Wilson, we began as a small boutique property with just 20 rooms. Our founder believed luxury wasn't about opulence, but about creating personalized experiences that guests would cherish forever.
              </p>
              <p>
                Over the years, we've grown into an award-winning hotel chain while maintaining our commitment to authentic hospitality. Each property reflects the local culture while delivering the consistent excellence that has become our hallmark.
              </p>
            </div>
          </div>

          <img 
            src={image4} 
            className='w-full lg:w-auto max-w-[300px] sm:max-w-[400px] md:max-w-[500px] mt-6 sm:mt-8 lg:mt-0 shadow-[0_0_20px_0] shadow-[#FC6767] rounded-lg' 
            alt="Historic hotel photo"
          />
        </div>

        {/* Vision and Mission Section */}
        <div className='flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 mt-12 sm:mt-14 md:mt-16 lg:mt-[120px] justify-between mx-auto px-4'>
          <div className='flex flex-col gap-4 sm:gap-6 md:gap-8 w-full lg:w-[40%]'>
            <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold text-2xl sm:text-3xl lg:text-4xl">
              Our Promise
            </span>
            <p className='text-richblack-200 opacity-90 text-xs sm:text-sm md:text-base'>
              We promise more than just a place to stay. Every detail - from our signature scent in the lobby to the thread count of your sheets - is carefully curated to create a sense of belonging. Our staff are trained not just to serve, but to anticipate your needs before you express them.
            </p>
          </div>

          <div className='flex flex-col gap-4 sm:gap-6 md:gap-8 w-full lg:w-[40%] mt-6 sm:mt-8 lg:mt-0'>
            <HighlightText text={"Sustainability Commitment"}/>
            <p className='text-richblack-200 opacity-90 text-xs sm:text-sm md:text-base'>
              Luxury and responsibility go hand in hand. We've reduced our carbon footprint by 40% through initiatives like solar power, zero-waste kitchens, and partnerships with local artisans. Our green roof gardens supply our restaurants, and we've eliminated single-use plastics across all properties.
            </p>
          </div>
        </div>

        <Stats 
          stats={[
            { number: "25+", label: "Years in Hospitality" },
            { number: "10K+", label: "Happy Guests Yearly" },
            { number: "150+", label: "Awards Won" },
            { number: "100%", label: "Locally Sourced Cuisine" }
          ]}
        />

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

        <ContactFormSection 
          title="Planning Your Stay?"
          subtitle="Our concierge team is ready to personalize your experience"
        />

        <div className="relative mx-auto my-8 sm:my-10 md:my-12 lg:my-16 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-4 sm:gap-6 md:gap-8 bg-richblack-900 text-black px-4 py-6 sm:py-8 rounded-lg">
          <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
            What Our Guests Say
          </h1>
          <ReviewSlider 
            reviews={[
              { text: "The service was impeccable. They remembered our anniversary!", author: "Sarah K." },
              { text: "Best hotel bed I've ever slept in. Already planning our return!", author: "Michael T." },
              { text: "Attention to detail is unmatched. True luxury experience.", author: "Emma & John" }
            ]}
          />
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default AboutUs;