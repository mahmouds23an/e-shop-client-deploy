import { useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const fallbackEvents = [
  {
    _id: "1",
    title: "Summer Sale",
    description: "Get up to 50% off on summer collection",
    linkText: "Shop Now",
    imageUrl:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1920&q=80",
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "2",
    title: "New Arrivals",
    description: "Check out our latest collection",
    linkText: "Explore",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80",
  },
];

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/event/get`);
      const data = await response.data;
      if (data.success) {
        setEvents(data.events.length > 0 ? data.events : fallbackEvents);
      } else {
        setEvents(fallbackEvents);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents(fallbackEvents);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      events.forEach((event) => {
        if (event.endDate) {
          const difference = new Date(event.endDate) - new Date();
          if (difference > 0) {
            newTimeLeft[event._id] = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            };
          }
        }
      });
      setTimeLeft(newTimeLeft);
    }, 10000);

    return () => clearInterval(timer);
  }, [events]);

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(autoSlideInterval);
  }, [currentSlide, events.length]);

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((current) => (current - 1 + events.length) % events.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (events.length === 0) return null;

  const currentEvent = events[currentSlide];
  const currentTimeLeft = timeLeft[currentEvent._id];

  return (
    <div className="hero-container">
      <div className="event-slide">
        <img
          src={currentEvent.imageUrl}
          alt={currentEvent.title}
          className="event-image"
        />
        <div className="event-overlay" />
        <div className="event-content">
          <h2 className="event-title">{currentEvent.title}</h2>
          <p className="event-description">{currentEvent.description}</p>
          {currentEvent.endDate && currentTimeLeft && (
            <div className="event-timer">
              <div className="timer-item">
                <span>{String(currentTimeLeft.days).padStart(2, "0")}</span>
                <p>Days</p>
              </div>
              <div className="timer-item">
                <span>{String(currentTimeLeft.hours).padStart(2, "0")}</span>
                <p>Hours</p>
              </div>
              <div className="timer-item">
                <span>{String(currentTimeLeft.minutes).padStart(2, "0")}</span>
                <p>Minutes</p>
              </div>
              <div className="timer-item">
                <span>{String(currentTimeLeft.seconds).padStart(2, "0")}</span>
                <p>Seconds</p>
              </div>
            </div>
          )}
          <Link to="/collection">
            <button className="event-button">{currentEvent.linkText}</button>
          </Link>
        </div>
      </div>

      {events.length > 1 && (
        <>
          <button onClick={prevSlide} className="nav-button prev">
            <FaChevronLeft />
          </button>
          <button onClick={nextSlide} className="nav-button next">
            <FaChevronRight />
          </button>
          <div className="dots">
            {events.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      )}

      <style>{`
        .hero-container {
          width: 100%;
          max-width: 100vw;
          height: 500px;
          position: relative;
          overflow: hidden;
        }

        .event-slide {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 10%;
        }

        .event-image {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease;
        }

        .event-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.2) 100%
          );
        }

        .event-content {
          position: relative;
          z-index: 2;
          color: white;
          text-align: left;
          padding: 30px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          border-radius: 15px;
          max-width: 500px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .event-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .event-description {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .event-timer {
          display: flex;
          justify-content: flex-start;
          gap: 20px;
          margin-bottom: 1.5rem;
        }

        .timer-item {
          background: rgba(255, 255, 255, 0.15);
          padding: 12px;
          border-radius: 8px;
          min-width: 70px;
          text-align: center;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .timer-item span {
          font-size: 1.8rem;
          font-weight: bold;
          display: block;
        }

        .timer-item p {
          font-size: 0.9rem;
          margin: 0;
          opacity: 0.9;
        }

        .event-button {
          background: #ff4444;
          color: white;
          border: none;
          padding: 14px 35px;
          border-radius: 30px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .event-button:hover {
          background: #ff2222;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          z-index: 3;
          transition: all 0.3s ease;
        }

        .nav-button:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: translateY(-50%) scale(1.1);
        }

        .prev {
          left: 20px;
        }

        .next {
          right: 20px;
        }

        .dots {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 20px;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.5);
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .dot.active {
          background: white;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
  .hero-container {
    height: 450px;
  }

  .event-image {
          width: 100%;
        }

  .event-slide {
    padding-left: 0;
    justify-content: center;
  }

  .event-content {
    padding: 25px;
    max-width: 90%;
    margin: 0 auto;
    text-align: center;
  }

  .event-title {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  .event-description {
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
  }

  .event-timer {
    justify-content: center;
    gap: 15px;
    margin-bottom: 1.2rem;
  }

  .timer-item {
    min-width: 65px;
    padding: 10px;
  }

  .timer-item span {
    font-size: 1.6rem;
  }

  .timer-item p {
    font-size: 0.8rem;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .hero-container {
    height: 400px;
  }

  .event-content {
    padding: 20px;
    max-width: 95%;
    background: rgba(0, 0, 0, 0.75);
  }

  .event-title {
    font-size: 1.6rem;
    margin-bottom: 0.6rem;
  }

  .event-description {
    font-size: 0.95rem;
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .event-timer {
    gap: 8px;
    margin-bottom: 1rem;
  }

  .timer-item {
    min-width: 55px;
    padding: 8px 5px;
  }

  .timer-item span {
    font-size: 1.3rem;
  }

  .timer-item p {
    font-size: 0.7rem;
  }

  .event-button {
    padding: 12px 25px;
    font-size: 0.9rem;
  }

  .nav-button {
    width: 35px;
    height: 35px;
    opacity: 0.8;
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }

  .dots {
    bottom: 15px;
    padding: 6px 12px;
    gap: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 360px) {
  .hero-container {
    height: 350px;
  }

  .event-content {
    padding: 15px;
  }

  .event-title {
    font-size: 1.4rem;
  }

  .event-description {
    font-size: 0.9rem;
  }

  .timer-item {
    min-width: 45px;
    padding: 6px 4px;
  }

  .timer-item span {
    font-size: 1.1rem;
  }

  .event-button {
    padding: 10px 20px;
    font-size: 0.85rem;
  }
        }
      `}</style>
    </div>
  );
};

export default Hero;
