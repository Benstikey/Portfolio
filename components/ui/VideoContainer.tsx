import React, { useRef, useEffect, useState } from "react";
import Image from 'next/image';

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this value as needed
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Autoplay prevented:", error);
          // Set poster image as fallback
          video.poster = `${videoSrc}#t=0.001`;
        });
      }
    }
  }, [videoSrc]);

  const marginClasses = `${mobileMarginTop} ${mobileMarginBottom} ${desktopMarginTop} ${desktopMarginBottom}`;

  return (
    <div className={`relative w-full rounded-xl overflow-hidden shadow-custom ${marginClasses} ${className} group`}>
      {isMobile ? (
        <Image
          src={`${videoSrc}#t=0.001`}
          alt="Video Poster"
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-all duration-300 md:group-hover:blur-sm"
          loop
          muted
          playsInline
          preload="none"
          poster={`${videoSrc}#t=0.001`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <h2 className="text-white font-bold text-xl">Visit the website</h2>
      </div>
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