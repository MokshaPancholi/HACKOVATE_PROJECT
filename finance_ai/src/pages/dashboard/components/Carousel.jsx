
import React, { useState, useRef } from 'react';

const Carousel = ({ children }) => {
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState([0]);
  const total = React.Children.count(children);
  const lastNav = useRef(0);
  const NAV_DELAY = 600; // ms, faster navigation

  const goTo = (idx) => {
    setCurrent((prev) => {
      if (prev === idx) return prev;
      setVisited((v) => v.includes(idx) ? v : [...v, idx]);
      return idx;
    });
  };

  const canNavigate = () => {
    const now = Date.now();
    if (now - lastNav.current > NAV_DELAY) {
      lastNav.current = now;
      return true;
    }
    return false;
  };

  const handlePrev = () => {
    if (current > 0 && canNavigate()) goTo(current - 1);
  };
  const handleNext = () => {
    if (current < total - 1 && canNavigate()) goTo(current + 1);
  };

  return (
    <div className="relative w-full flex items-center">
      {/* Left Arrow OUTSIDE */}
      <div className="flex-shrink-0 flex items-center h-full">
        <button
          className="z-20 p-2 bg-white/80 rounded-full shadow -ml-8 disabled:opacity-30"
          style={{ position: 'relative' }}
          onClick={handlePrev}
          disabled={current === 0}
          aria-label="Previous"
        >
          <span>&larr;</span>
        </button>
      </div>
      {/* Main Carousel Content */}
      <div className="flex-1 overflow-x-hidden w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {React.Children.map(children, (child, idx) => (
            <div className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
      {/* Right Arrow OUTSIDE */}
      <div className="flex-shrink-0 flex items-center h-full">
        <button
          className="z-20 p-2 bg-white/80 rounded-full shadow -mr-8 disabled:opacity-30"
          style={{ position: 'relative' }}
          onClick={handleNext}
          disabled={current === total - 1}
          aria-label="Next"
        >
          <span>&rarr;</span>
        </button>
      </div>
  <div className="absolute bottom-6 left-0 w-full flex justify-center space-x-2">
        {Array.from({ length: total }).map((_, idx) => {
          let dotClass = 'w-2 h-2 rounded-full transition-colors duration-200 border border-gray-300 ';
          if (current === idx) {
            dotClass += 'bg-primary';
          } else if (visited.includes(idx)) {
            dotClass += 'bg-muted-foreground/60';
          } else {
            dotClass += 'bg-black';
          }
          return (
            <button
              key={idx}
              className={dotClass}
              style={{ opacity: 1 }}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
