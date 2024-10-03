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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
        playPromise
          .then(() => {
            setIsLoading(false);
          })
          .catch(error => {
            console.error("Autoplay prevented:", error);
            video.poster = `${videoSrc}#t=0.001`;
            setIsLoading(false);
          });
      }
    }
  }, [videoSrc]);

  const marginClasses = `${mobileMarginTop} ${mobileMarginBottom} ${desktopMarginTop} ${desktopMarginBottom}`;

  const Skeleton = () => (
    <div className="absolute inset-0 bg-gray-200 overflow-hidden">
      <div className="wave-skeleton"></div>
    </div>
  );

  return (
    <div className={`relative w-full rounded-xl overflow-hidden shadow-custom ${marginClasses} ${className} group`}>
      <div className="relative w-full pt-[125%]">
        {isLoading && <Skeleton />}
        {isMobile ? (
          <Image
            src={`${videoSrc}#t=0.001`}
            alt="Video Poster"
            layout="fill"
            objectFit="cover"
            onLoadingComplete={() => setIsLoading(false)}
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 md:group-hover:blur-sm"
            loop
            muted
            playsInline
            preload="none"
            poster={`${videoSrc}#t=0.001`}
            onLoadedData={() => setIsLoading(false)}
          >
            <source src={videoSrc} type="video/webm" />
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
    </div>
  );
};

export default VideoContainer;