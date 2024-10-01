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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
          setIsVideoPlaying(true);
        } catch (error) {
          console.error("Autoplay failed:", error);
          setIsVideoPlaying(false);
        }
      }
    };

    playVideo();

    const handleVisibilityChange = () => {
      if (videoRef.current) {
        if (document.hidden) {
          videoRef.current.pause();
          setIsVideoPlaying(false);
        } else {
          videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(error => {
            console.error("Resume playback failed:", error);
            setIsVideoPlaying(false);
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
      {isMobile && !isVideoPlaying && (
        <img 
          src={`${videoSrc}#t=0.001`} 
          alt="Video thumbnail" 
          className="w-full h-full object-cover"
        />
      )}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? "blur-sm" : ""} ${isMobile && !isVideoPlaying ? "hidden" : ""}`}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        poster={`${videoSrc}#t=0.001`}
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