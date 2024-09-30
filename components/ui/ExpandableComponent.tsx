import React, { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import CustomIcon from "@/components/ui/CustomIcon";

interface ExpandableComponentProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  statusText: string;
  dotColor: string;
  link?: string;
  stack?: string[];
}

const ExpandableComponent: React.FC<ExpandableComponentProps> = ({
  icon,
  title,
  subtitle,
  description,
  statusText,
  dotColor,
  link,
  stack,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLAnchorElement & HTMLDivElement>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    setIsExpanded(isMobile);
  }, [isMobile]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (cursorRef.current && componentRef.current && link && !isMobile) {
      const rect = componentRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [link, isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsExpanded(true);
      setIsHovered(true);
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsExpanded(false);
      setIsHovered(false);
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (isHovered && link && !isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, handleMouseMove, link, isMobile]);

  const commonProps = {
    ref: componentRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: `w-full flex flex-col items-start justify-start gap-4 border-b border-black/10 transition-all duration-500 ease-in-out relative ${link && isHovered && !isMobile ? 'cursor-none' : ''}`,
  };

  const content = (
    <>
      <div className="flex flex-row items-start w-full gap-4">
        {/* Icon */}
        <div className="hidden w-12 h-12 md:block p-1 flex-shrink-0">
          {icon}
        </div>

        {/* Title and Subtitle */}
        <div className="flex flex-col w-full gap-2">
          <h2 className="font-normal">{title}</h2>
          <p className="text-gray-500">{subtitle}</p>
        </div>

        {/* Dot and Text */}
        <div className="flex items-center flex-shrink-0 bg-white gap-2 border rounded-3xl px-4 py-1">
          <div
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: dotColor }}
          ></div>
          <p className="font-medium text-sm text-gray-700 mb-[2px]">{statusText}</p>
        </div>
      </div>

      {/* Description and Stack Icons */}
      <div className={`mt-0 ml-0 md:max-w-xl md:ml-16 transition-all duration-500 ease-in-out 
        ${isMobile ? 'block opacity-100 max-h-[1000px]' : 
          isExpanded ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <p className="text-sm text-gray-700 mb-2 max-w-[90%]">{description}</p>
        {stack && stack.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3 mb-4">
            {stack.map((iconSlug, index) => (
              <CustomIcon key={index} iconSlug={iconSlug} size={24} />
            ))}
          </div>
        )}
      </div>

      {/* Custom Cursor (Link Icon) - Only render if there's a link and not on mobile */}
      {link && !isMobile && (
        <div 
          ref={cursorRef}
          className="absolute pointer-events-none"
          style={{
            opacity: 0,
            transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
          }}
        >
          <div className="bg-white p-2 rounded-full border border-gray-300">
            <ExternalLink className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      )}

      {/* Fixed External Link Icon for Mobile */}
      {link && isMobile && (
        <div className="absolute bottom-4 right-0 bg-white p-2 rounded-full border border-gray-300">
          <ExternalLink className="w-4 h-4 text-gray-500" />
        </div>
      )}
    </>
  );

  return link ? (
    <a
      {...commonProps}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <div {...commonProps}>
      {content}
    </div>
  );
};

export default ExpandableComponent;