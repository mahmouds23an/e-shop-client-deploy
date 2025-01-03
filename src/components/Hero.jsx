/* eslint-disable react-hooks/exhaustive-deps */
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
    active: "yes",
  },
  {
    _id: "2",
    title: "New Arrivals",
    description: "Check out our latest collection",
    linkText: "Explore",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80",
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    active: "no",
  },
];

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const { backendUrl } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/event/get`);
      const data = await response.data;
      if (data.success) {
        const filteredEvents = data.events.filter(
          (event) =>
            !(
              new Date(event?.endDate) < Date.now() || event?.isActive === false
            )
        );
        setEvents(filteredEvents.length > 0 ? filteredEvents : fallbackEvents);
      } else {
        setEvents(fallbackEvents);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents(fallbackEvents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      events.forEach((event) => {
        if (event.endDate) {
          const difference = new Date(event?.endDate) - new Date();
          if (difference > 0) {
            newTimeLeft[event?._id] = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / (1000 * 60)) % 60),
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

  // if (events.length === 0) {
  //   return <div>Loading events...</div>;
  // }

  const currentEvent = events[currentSlide];
  const currentTimeLeft = timeLeft[currentEvent?._id];

  if (loading || events.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-16 w-16 border-t-2 
        border-b-2 border-black"
        ></div>
      </div>
    );
  }

  return (
    <div className="hero-container">
      <div className="event-slide">
        <img
          src={currentEvent?.imageUrl}
          alt={currentEvent?.title}
          className="event-image"
        />
        <div className="event-overlay" />
        <div className="event-content">
          <h2 className="event-title">{currentEvent?.title}</h2>
          <p className="event-description">{currentEvent?.description}</p>
          {currentEvent?.endDate && currentTimeLeft && (
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
            <button className="event-button">{currentEvent?.linkText}</button>
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
    </div>
  );
};

export default Hero;
