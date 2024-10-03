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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

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
    const canvas = canvasRef.current;

    if (video && canvas) {
      video.addEventListener('loadeddata', () => {
        video.currentTime = 0.1; // Set to a frame shortly after the start
      });

      video.addEventListener('seeked', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPosterUrl(canvas.toDataURL('image/jpeg'));
        setIsLoading(false);

        if (!isMobile) {
          video.play().catch(error => {
            console.error("Autoplay prevented:", error);
          });
        }
      });

      video.load();
    }
  }, [videoSrc, isMobile]);

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
        {posterUrl && (
          <Image
            src={posterUrl}
            alt="Video Poster"
            layout="fill"
            objectFit="cover"
          />
        )}
        {!isMobile && (
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 md:group-hover:blur-sm"
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={videoSrc} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
        <canvas ref={canvasRef} className="hidden" />
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