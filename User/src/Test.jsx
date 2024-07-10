import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img className='w-full h-[600px] object-cover' src="https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" onDragStart={handleDragStart} alt="slide1" />,
  <img className='w-full h-[600px] object-cover' src="https://kidstyle.com.vn/images/blog/5/AOTHUNTRONBANNER.jpg" onDragStart={handleDragStart} alt="slide2" />,

];

const Gallery = () => {
  return <AliceCarousel mouseTracking infinite items={items} autoPlay animationDuration={600} disableButtonsControls disableDotsControls autoPlayInterval={2000} />;
};

export default Gallery;
