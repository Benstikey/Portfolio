import React, { useState, useRef } from "react";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.play(); // Resume the video
    }
  };

  const marginClasses = `${mobileMarginTop} ${mobileMarginBottom} ${desktopMarginTop} ${desktopMarginBottom}`;

  return (
    <a
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
          autoPlay
          muted
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