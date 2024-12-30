import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import HeroSection from "./HeroSection";

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const { backendUrl } = useContext(ShopContext);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/event/get`);
        const activeEvents = response?.data?.events.filter(
          (event) =>
            event?.isActive &&
            (!event?.endDate || new Date(event?.endDate) > new Date())
        );
        setEvents(activeEvents);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchEventData();
  }, [backendUrl]);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length);
    }, 10000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [events]);

  const changeEvent = (index) => setCurrentEventIndex(index);

  if (!events.length) return null;

  const currentEvent = events[currentEventIndex];

  return (
    <HeroSection
      title={currentEvent.title}
      description={currentEvent.description}
      imageUrl={currentEvent.imageUrl}
      endDate={currentEvent.endDate}
      currentIndex={currentEventIndex}
      totalEvents={events.length}
      onPrevClick={() =>
        setCurrentEventIndex(
          currentEventIndex === 0 ? events.length - 1 : currentEventIndex - 1
        )
      }
      onNextClick={() => setCurrentEventIndex((currentEventIndex + 1) % events.length)}
      onDotClick={changeEvent}
    />
  );
};

export default Hero;
