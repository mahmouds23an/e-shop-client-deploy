/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import HeroSection from "./HeroSection";

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [timers, setTimers] = useState({});
  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/event/get");
        const activeEvents = response.data.events.filter(
          (event) =>
            event.isActive &&
            (!event.endDate || new Date(event.endDate) > new Date())
        );
        setEvents(activeEvents);

        activeEvents.forEach((event, index) => {
          if (event.endDate) {
            startCountdown(index, event.endDate);
          }
        });
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchEventData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      changeEvent((currentEventIndex + 1) % events.length);
    }, 10000); 

    return () => clearInterval(intervalId);
  }, [events, currentEventIndex]);

  const changeEvent = (index) => {
    setCurrentEventIndex(index);
    const event = events[index];

    if (event.endDate) {
      startCountdown(index, event.endDate);
    }
  };

  const startCountdown = (index, endDate) => {
    const end = new Date(endDate);

    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = end - now;

      if (timeDifference <= 0) {
        setTimers((prev) => ({
          ...prev,
          [index]: "Event has ended",
        }));
        return;
      }

      let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      let seconds = Math.floor((timeDifference / 1000) % 60);

      const newTimeLeft = [
        days > 0 ? `${days}d` : "",
        days > 0 || hours > 0 ? `${hours}h` : "",
        `${minutes}m`,
        `${seconds}s`,
      ]
        .filter(Boolean)
        .join(" ");

      setTimers((prev) => ({
        ...prev,
        [index]: newTimeLeft,
      }));
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  };

  if (events.length === 0) return <HeroSection />;

  const currentEvent = events[currentEventIndex];

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 h-[700px] w-full sm:h-[600px] relative overflow-hidden">
      {/* Hero Left */}
      <div
        className="w-full flex-col sm:w-1/2 h-[400px] md:h-auto flex items-center 
      justify-center py-10 sm:py-0 relative"
      >
        <div className="text-[#414141] transition-opacity duration-500">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              {currentEvent.title}
            </h1>
          </div>
          <p className="font-medium text-sm md:text-base">
            {currentEvent.description}
          </p>
          <div className="flex items-center gap-2">
            <button className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              {currentEvent.linkText || "SHOP NOW"}
            </button>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>

        {/* Countdown Timer Styled as Blocks */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {timers[currentEventIndex] && (
            <>
              {timers[currentEventIndex].split(" ").map((part, index) => (
                <div
                  key={index}
                  className="bg-black text-white px-2 py-1 rounded-md font-medium text-center"
                >
                  {part}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 hidden md:flex space-x-2">
          {events.map((_, index) => (
            <div
              key={index}
              onClick={() => changeEvent(index)} // Change event on dot click
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentEventIndex ? "bg-black" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Hero Right */}
      <img
        className={`w-full sm:w-1/2 h-full object-cover transition-opacity duration-500`}
        src={currentEvent.imageUrl}
        alt="Event"
      />

      {/* Arrows */}
      <button
        className="absolute left-14 top-8 transform md:px-2 py-0.5 -translate-y-1/2 
        bg-white text-black border text-xl rounded-full p-2 shadow hover:opacity-70 transition"
        onClick={() => changeEvent((currentEventIndex + 1) % events.length)}
      >
        &gt; {/* Right Arrow Icon */}
      </button>
      <button
        className="absolute left-4 top-8 transform -translate-y-1/2 bg-white border text-xl 
        md:px-2 py-0.5 text-black rounded-full p-2 shadow hover:opacity-70 transition"
        onClick={() => changeEvent((currentEventIndex - 1 + events.length) % events.length)}
      >
        &lt; {/* Left Arrow Icon */}
      </button>
    </div>
  );
};

export default Hero;
