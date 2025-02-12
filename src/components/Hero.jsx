import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const events = [
  {
    id: "1",
    title: "Summer Collection",
    description: "Get up to 50% off on summer essentials",
    linkText: "Shop Now",
    imageUrl: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1920&q=80",
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Autumn Arrivals",
    description: "Discover our latest autumn collection",
    linkText: "Explore",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80",
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Winter Special",
    description: "Cozy winter wear at amazing prices",
    linkText: "View Collection",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80",
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "Spring Preview",
    description: "Be the first to shop our spring collection",
    linkText: "Preview Now",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80",
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const Hero = function () {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      events.forEach((event) => {
        const difference = new Date(event.endDate) - new Date();
        if (difference > 0) {
          newTimeLeft[event.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % events.length);
    }, 15000);

    return () => clearInterval(autoSlideInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((current) => (current - 1 + events.length) % events.length);
  };

  const getSlideIndex = (index) => {
    return (index + events.length) % events.length;
  };

  const currentEvent = events[currentSlide];
  const currentTimeLeft = timeLeft[currentEvent?.id];
  const isUrgent = currentTimeLeft?.days === 0 && currentTimeLeft?.hours < 24;

  return (
    <div className="slider-container">
      <button onClick={prevSlide} className="nav-button prev">
        <FaChevronLeft />
      </button>
      
      <div className="slides-wrapper">
        {[-1, 0, 1].map((offset) => {
          const index = getSlideIndex(currentSlide + offset);
          const event = events[index];
          return (
            <div
              key={event.id}
              className={`slide ${offset === 0 ? 'active' : offset === -1 ? 'prev' : 'next'}`}
            >
              <img src={event.imageUrl} alt={event.title} />
              {offset === 0 && (
                <div className="slide-content">
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                  {currentTimeLeft && (
                    <div className="timer">
                      <div className={`timer-items ${isUrgent ? 'urgent' : ''}`}>
                        <div className="timer-item">
                          <span>{String(currentTimeLeft.days).padStart(2, '0')}</span>
                          <p>Days</p>
                        </div>
                        <div className="timer-item">
                          <span>{String(currentTimeLeft.hours).padStart(2, '0')}</span>
                          <p>Hours</p>
                        </div>
                        <div className="timer-item">
                          <span>{String(currentTimeLeft.minutes).padStart(2, '0')}</span>
                          <p>Minutes</p>
                        </div>
                        <div className="timer-item">
                          <span>{String(currentTimeLeft.seconds).padStart(2, '0')}</span>
                          <p>Seconds</p>
                        </div>
                      </div>
                      {isUrgent && <p className="urgent-message">Hurry up! Offer ends soon!</p>}
                    </div>
                  )}
                  <button className="cta-button">{event.linkText}</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button onClick={nextSlide} className="nav-button next">
        <FaChevronRight />
      </button>

      <div className="dots">
        {events.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;