import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "New Lego Collections",
    subtitle: "Explore the latest sets and exclusive releases",
    buttonText: "Shop Now",
    buttonLink: "/category/lego",
    image: "https://images.pexels.com/photos/3661927/pexels-photo-3661927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bgColor: "bg-blue-100"
  },
  {
    id: 2,
    title: "Outdoor Summer Fun",
    subtitle: "Get ready for adventure with outdoor toys",
    buttonText: "Explore",
    buttonLink: "/category/outdoor",
    image: "https://images.pexels.com/photos/1166473/pexels-photo-1166473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bgColor: "bg-green-100"
  },
  {
    id: 3,
    title: "Board Game Sale",
    subtitle: "Up to 30% off on family board games",
    buttonText: "View Deals",
    buttonLink: "/category/board-games",
    image: "https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bgColor: "bg-yellow-100"
  }
];

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(current => (current + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide(current => (current + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide(current => (current - 1 + slides.length) % slides.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex items-center transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          } ${slide.bgColor}`}
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl opacity-80 mb-4 md:mb-6">
                {slide.subtitle}
              </p>
              <Link 
                to={slide.buttonLink}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg font-medium transition-colors"
              >
                {slide.buttonText}
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-h-[250px] md:max-h-[300px] lg:max-h-[400px] rounded-lg object-cover shadow-lg transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md transition-colors"
        aria-label="Previous slide"
      >
        <ArrowLeft size={20} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md transition-colors"
        aria-label="Next slide"
      >
        <ArrowRight size={20} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-blue-600' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;