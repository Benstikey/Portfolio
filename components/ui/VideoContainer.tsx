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
    const generatePoster = async () => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = videoSrc;

      return new Promise<string>((resolve) => {
        video.addEventListener('loadeddata', () => {
          video.currentTime = 0.1; // Set to a frame shortly after the start
        });

        video.addEventListener('seeked', () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg'));
        });

        video.load();
      });
    };

    generatePoster()
      .then(setPosterUrl)
      .catch(error => console.error("Error generating poster:", error));
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
      <div className="relative w-full pt-[125%] bg-gray-200">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt="Video Thumbnail"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500">Loading...</span>
          </div>
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