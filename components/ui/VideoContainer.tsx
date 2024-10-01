import React, { useRef, useEffect, useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Attempt autoplay on all devices
          await videoRef.current.play();
        } catch (error) {
          console.error("Autoplay failed:", error);
        }
      }
    };

    playVideo();

    const handleVisibilityChange = () => {
      if (videoRef.current) {
        if (document.hidden) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(error => {
            console.error("Resume playback failed:", error);
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const marginClasses = `${mobileMarginTop} ${mobileMarginBottom} ${desktopMarginTop} ${desktopMarginBottom}`;

  return (
    <div 
      className={`relative block w-full rounded-xl overflow-hidden shadow-custom ${marginClasses} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? "blur-sm" : ""}`}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h2 className="text-white font-bold text-xl">Visit the website</h2>
        </div>
      )}
      <a
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">Visit website</span>
      </a>
    </div>
  );
};

export default VideoContainer;