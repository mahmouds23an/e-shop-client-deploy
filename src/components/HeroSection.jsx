/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Timer, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_CONSTANTS, getTimeRemaining } from "./constants";

const HeroSection = ({
  title,
  description,
  imageUrl,
  endDate,
  currentIndex,
  totalEvents,
  onPrevClick,
  onNextClick,
  onDotClick,
}) => {
  const timeLeft = endDate ? getTimeRemaining(endDate) : null;

  return (
    <div
      className={`flex flex-col md:flex-row ${HERO_CONSTANTS.h} 
      ${HERO_CONSTANTS.w} relative overflow-hidden rounded-lg`}
    >
      {/* Hero Left */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-2 relative">
        <div className="text-[#2d2d2d]">
          <h3 className="font-bold text-3xl mb-3">{title}</h3>
          <p className="text-[#555555] text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
            {description}
          </p>
          <Link
            to="/collection"
            className="bg-black text-white font-semibold py-3 px-6 rounded-md hover:bg-[#333] text-center"
          >
            Shop Now
          </Link>
        </div>

        {/* Countdown Timer */}
        {timeLeft && (
          <div className="absolute top-4 right-4 px-6 py-2 bg-black/80 text-white rounded-lg shadow-lg">
            <Timer className="w-5 h-5 text-orange-300 mr-2 inline-block" />
            <span className="text-sm font-semibold">Limited Time: {timeLeft}</span>
          </div>
        )}
      </div>

      {/* Hero Right */}
      <div className="w-full md:w-1/2 relative flex justify-center items-center">
        <img
          className="rounded-bl-[100px] max-w-full h-auto object-cover md:w-auto lg:h-[600px]"
          src={imageUrl}
          alt="Fashion Model"
        />
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={onPrevClick}
          className="bg-white/80 hover:bg-white p-1.5 rounded-full shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 text-gray-800" />
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalEvents }).map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-black w-4" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={onNextClick}
          className="bg-white/80 hover:bg-white p-1.5 rounded-full shadow-lg transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
