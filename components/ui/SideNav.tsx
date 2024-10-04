import React, { useCallback } from 'react';
import { Home, Briefcase, Video, Zap, Layers, Folder, Heart, Mail } from 'react-feather';

const SideNav = () => {
  const sections = [
    { id: 'header', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'work', label: 'My Work', icon: Video },
    { id: 'tldr', label: 'TLDR', icon: Zap },
    { id: 'stack', label: 'Stack', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'hobbies', label: 'Hobbies', icon: Heart },
    { id: 'contact-form', label: 'Contact', icon: Mail },
  ];

  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const start = window.pageYOffset;
      const target = element.getBoundingClientRect().top + start - (id === 'work' || id === 'tldr' ? 0 : 124);
      const startTime = performance.now();
      const duration = 1000;

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeInOutCubic = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, start + (target - start) * easeInOutCubic);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, []);

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
      <ul className="flex space-x-2 bg-white rounded-full shadow-lg px-4 py-2 border border-gray-200">
        {sections.map((section) => (
          <li key={section.id} className="relative group">
            <a 
              href={`#${section.id}`}
              onClick={(e) => smoothScroll(e, section.id)}
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200 block p-2 group"
            >
              <section.icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="sr-only">{section.label}</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none">
                <div className="bg-gray-800 text-white text-xs rounded-md py-1 px-2 whitespace-nowrap">
                  {section.label}
                </div>
                <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;