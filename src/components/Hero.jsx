/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    id: "1",
    title: "First Order",
    description: "Your first order with 25% off with promo code firstorder25",
    linkText: "Shop Now",
    linkUrl: "/collection",
    imageUrl:
      "https://thumbs.dreamstime.com/b/sale-percent-off-red-stamp-sale-percent-off-red-stamp-isolated-white-background-97566534.jpg?w=1400",
    endDate: new Date("2025-02-27T23:59:59Z").toISOString(),
  },
  {
    id: "2",
    title: "Summer Collection",
    description: "Hurry up and shop our new summer collection",
    linkText: "Shop Now",
    linkUrl: "/collection/summer",
    imageUrl:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "3",
    title: "Shop now",
    description: "Hurry up and shop our collection",
    linkText: "View Collection",
    linkUrl: "/collection",
    imageUrl:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80",
  },
];

const Hero = function () {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      events.forEach((event) => {
        if (event.endDate) {
          const difference = new Date(event.endDate) - new Date();
          if (difference > 0) {
            newTimeLeft[event.id] = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            };
          }
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 15000);

    return () => clearInterval(autoSlideInterval);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((current) => (current + 1) % events.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((current) => (current - 1 + events.length) % events.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getSlideIndex = (index) => {
    return (index + events.length) % events.length;
  };

  const currentEvent = events[currentSlide];
  const currentTimeLeft = timeLeft[currentEvent?.id];
  const isUrgent = currentTimeLeft?.days === 0 && currentTimeLeft?.hours < 24;

  return (
    <div className="hero-slider">
      <button 
        onClick={prevSlide} 
        className="nav-button prev"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="slides-container">
        {[-1, 0, 1].map((offset) => {
          const index = getSlideIndex(currentSlide + offset);
          const event = events[index];
          return (
            <div
              key={event.id}
              className={`slide ${
                offset === 0 ? "active" : offset === -1 ? "prev" : "next"
              }`}
            >
              <div className="slide-image-container">
                <img src={event.imageUrl} alt={event.title} className="slide-image" />
                <div className="slide-overlay"></div>
              </div>
              
              {offset === 0 && (
                <div className="slide-content">
                  <h2 className="slide-title">{event.title}</h2>
                  <p className="slide-description">{event.description}</p>
                  
                  {currentTimeLeft && (
                    <div className="countdown-timer">
                      <div className={`timer-grid ${isUrgent ? "urgent" : ""}`}>
                        <div className="timer-unit">
                          <span className="timer-value">
                            {String(currentTimeLeft.days).padStart(2, "0")}
                          </span>
                          <span className="timer-label">Days</span>
                        </div>
                        <div className="timer-unit">
                          <span className="timer-value">
                            {String(currentTimeLeft.hours).padStart(2, "0")}
                          </span>
                          <span className="timer-label">Hours</span>
                        </div>
                        <div className="timer-unit">
                          <span className="timer-value">
                            {String(currentTimeLeft.minutes).padStart(2, "0")}
                          </span>
                          <span className="timer-label">Minutes</span>
                        </div>
                        <div className="timer-unit">
                          <span className="timer-value">
                            {String(currentTimeLeft.seconds).padStart(2, "0")}
                          </span>
                          <span className="timer-label">Seconds</span>
                        </div>
                      </div>
                      
                      {isUrgent && (
                        <p className="urgent-message">
                          Hurry up! Offer ends soon!
                        </p>
                      )}
                    </div>
                  )}
                  
                  <Link to={currentEvent.linkUrl} className="cta-button">
                    {currentEvent.linkText}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button 
        onClick={nextSlide} 
        className="nav-button next"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      <div className="slider-dots">
        {events.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;