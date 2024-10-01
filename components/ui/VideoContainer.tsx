import React, { useState, useRef, useEffect } from "react";

interface VideoContainerProps {
  videoSrc: string;
  linkHref: string;
  className?: string;
  mobileMarginTop?: string;
  mobileMarginBottom?: string;
  desktopMarginTop?: string;
  desktopMarginBottom?: string;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  videoSrc,
  linkHref,
  className = "",
  mobileMarginTop = "mt-0",
  mobileMarginBottom = "mb-0",
  desktopMarginTop = "md:mt-0",
  desktopMarginBottom = "md:mb-0",
}) => {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (videoRef.current) {
              videoRef.current.play().catch((error) => {
                console.error("Autoplay failed:", error);
              });
            }
          } else {
            setIsVisible(false);
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current && isVisible) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  };

  const marginClasses = `${mobileMarginTop} ${mobileMarginBottom} ${desktopMarginTop} ${desktopMarginBottom}`;

  return (
    <a
      ref={containerRef}
      href={linkHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative w-full rounded-xl overflow-hidden shadow-custom ${marginClasses} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <video
          ref={videoRef}
          src={videoSrc}
          className={`w-full h-full object-cover transition-all duration-300 ${
            hovered ? "blur-sm" : ""
          }`}
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
      {hovered && (
        <h2 className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold">
          Visit the website
        </h2>
      )}
    </a>
  );
};

export default VideoContainer;