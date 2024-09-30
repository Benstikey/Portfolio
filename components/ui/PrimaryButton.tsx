import React from 'react';

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  scrollTo?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick, disabled = false, scrollTo }) => {
  const smoothScroll = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500; // Increased duration for more noticeable effect
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Cubic ease-in-out function
    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    requestAnimationFrame(animation);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (scrollTo) {
      event.preventDefault();
      smoothScroll(scrollTo);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full
        bg-[#334155]
        px-4 py-3 
        rounded-md 
        relative
        custom-border-button
        custom-backdrop-shadow-button
        custom-inner-shadow-button
        transition-all duration-300 ease-in-out
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-[#405372] hover:scale-105 hover:shadow-lg active:scale-100 active:shadow-md cursor-pointer'}
      `}
      style={{ position: 'relative' }}
    >
      <p className="text-white font-medium relative z-10">{text}</p>
      <div className="absolute inset-0 bg-white opacity-0 rounded-md transition-opacity duration-300 ease-in-out hover:opacity-10"></div>
    </button>
  );
};

export default PrimaryButton;