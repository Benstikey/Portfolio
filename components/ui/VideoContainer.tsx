import React, { useRef, useEffect, useState } from "react";
import Image from 'next/image';

interface VideoContainerProps {
  videoSrc: string;
  linkHref: string;
  className?: string;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  videoSrc,
  linkHref,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
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
      });

      video.load();
    }
  }, [videoSrc]);

  const handleMouseEnter = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Play on hover prevented:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div 
      className={`relative w-full rounded-xl overflow-hidden border border-gray-300 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full pt-[125%]">
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
            className="absolute top-0 left-0 w-full h-full object-cover"
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