import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PrimaryButtonProps {
  text?: string;
  onClick?: () => void;
  scrollTo?: string;
  icon?: LucideIcon;
  iconSize?: number;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  text = 'Contact me', 
  onClick,
  scrollTo,
  icon: Icon,
  iconSize = 20,
  disabled = false
}) => {
  const smoothScroll = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    requestAnimationFrame(animation);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
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
      className="
        bg-[#f5f5f5] 
        text-[#343434]
        text-sm
        px-6
        py-1.5 
        rounded-md 
        transition-all 
        duration-300 
        ease-in-out 
        hover:bg-[#e5e5e5]
        hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)]
        flex
        items-center
        gap-3
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      "
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
        border: '1px solid #e0e0e0'
      }}
    >
      {text}
      {Icon && <Icon size={iconSize} color="#a3a3a3" />}
    </button>
  );
};

export default PrimaryButton;