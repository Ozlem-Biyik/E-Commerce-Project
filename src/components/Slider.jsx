import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    let slideInterval;
    
    if (autoPlay) {
      slideInterval = setInterval(() => {
        goToNext();
      }, 5000);
    }
    
    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [currentIndex, autoPlay]);

  const handleMouseEnter = () => setAutoPlay(false);
  const handleMouseLeave = () => setAutoPlay(true);

  return (
    <div 
      className="relative h-[50vh] w-full rounded-lg overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slider görselleri */}
      <div 
        className="w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, display: 'flex' }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="min-w-full h-full flex-shrink-0 relative"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center' 
            }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center">
              <div className="container mx-auto px-4 md:px-10">
                <div className="max-w-md text-white">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{slide.title}</h2>
                  <p className="mb-4 md:mb-8 text-sm md:text-base">{slide.description}</p>
                  {slide.buttonText && (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium transition-colors duration-300">
                      {slide.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sol/Sağ Navigasyon Butonları */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button 
          onClick={goToPrevious}
          className="p-2 rounded-full bg-white/50 hover:bg-white/80 text-gray-800 transition-colors duration-300"
          aria-label="Önceki"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={goToNext}
          className="p-2 rounded-full bg-white/50 hover:bg-white/80 text-gray-800 transition-colors duration-300"
          aria-label="Sonraki"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Navigasyon */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                currentIndex === idx ? "w-8 bg-white" : "w-2.5 bg-white/50"
              }`}
              aria-label={`Slider ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider; 