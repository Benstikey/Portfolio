import React from "react";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface HobbyCardProps {
  title: string;
  description: string;
  className?: string;
  linkText: string;
  linkUrl: string;
  logo: React.ReactNode;
  backgroundIcon: React.ReactNode;
}

const HobbyCard: React.FC<HobbyCardProps> = ({
  title,
  description,
  className,
  linkText,
  linkUrl,
  logo,
  backgroundIcon,
}) => {
  return (
    <div className={cn("flex flex-col items-center gap-2 group", className)}>
      {/* Card */}
      <div className="relative border border-gray-200 rounded-lg p-5 flex flex-col flex-grow justify-start w-full gap-3 bg-white shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
        <div className="flex flex-col gap-2 relative z-10">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        
        {/* Background Icon */}
        <div className="absolute right-0 bottom-0 opacity-0 transition-all duration-300 transform translate-x-1/4 translate-y-1/4 group-hover:opacity-10 group-hover:translate-x-0 group-hover:translate-y-0" style={{ fontSize: '150px' }}>
          {backgroundIcon}
        </div>
      </div>

      {/* External Box with Logo and Link */}
      <a
        href={linkUrl}
        className="border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center w-full hover:bg-gray-50 transition-all duration-300 group"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
            {logo}
          </div>
          {/* Link Text */}
          <h3 className="group-hover:text-gray-900 transition-colors duration-300">{linkText}</h3>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
      </a>
    </div>
  );
};

export default HobbyCard;