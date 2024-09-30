import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

interface IconProps {
  className?: string;
  corner: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';
}

const Icon: React.FC<IconProps> = ({ className, corner }) => {
  const getPath = (corner: string) => {
    switch (corner) {
      case 'top-left':
        return 'M18 6L6 6L6 18';
      case 'bottom-left':
        return 'M6 18L18 18L18 6';
      case 'bottom-right':
        return 'M18 18L6 18L6 6';
      case 'top-right':
      default:
        return 'M6 6L18 6L18 18';
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#334155"
      className={className}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d={getPath(corner)}
      />
    </svg>
  );
};

const Card: React.FC<CardProps> = ({ title, description, icon, children }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[20rem]"
    >
      <Icon corner="top-left" className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon corner="bottom-right" className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon corner="top-right" className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon corner="bottom-left" className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="absolute inset-0 flex items-center justify-center text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl mb-2 opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
        <p className="dark:text-white opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
