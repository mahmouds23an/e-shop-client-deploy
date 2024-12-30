// constants.js
export const HERO_CONSTANTS = {
    h: "h-auto lg:h-[600px]",
    w: "w-full",
  };
  
  export const getTimeRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const timeDifference = end - now;
  
    if (timeDifference <= 0) {
      return "Event has ended";
    }
  
    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    let seconds = Math.floor((timeDifference / 1000) % 60);
  
    return [
      days > 0 ? `${days}d` : "",
      days > 0 || hours > 0 ? `${hours}h` : "",
      `${minutes}m`,
      `${seconds}s`,
    ]
      .filter(Boolean)
      .join(" ");
  };
  