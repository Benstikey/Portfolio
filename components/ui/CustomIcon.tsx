import React from "react";
import { SimpleIcon, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";
import { useTheme } from "next-themes";

interface CustomIconProps {
  iconSlug: string;
  size?: number;
  className?: string;
  color?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({ iconSlug, size = 64, className, color }) => {
  const [icon, setIcon] = React.useState<SimpleIcon | null>(null);
  const { theme } = useTheme();

  const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
    const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
    const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
    const minContrastRatio = theme === "dark" ? 2 : 1.2;

    return renderSimpleIcon({
      icon,
      bgHex,
      fallbackHex,
      minContrastRatio,
      size: size,
      aProps: {
        href: undefined,
        target: undefined,
        rel: undefined,
        onClick: (e: any) => e.preventDefault(),
      },
    });
  };

  React.useEffect(() => {
    const fetchIcon = async () => {
      const icons = await fetchSimpleIcons({ slugs: [iconSlug] });
      const fetchedIcon = icons.simpleIcons[iconSlug];
      setIcon(fetchedIcon || null);
    };

    fetchIcon();
  }, [iconSlug]);

  const getColorFilter = (hexColor: string) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate filter values
    const filterValue = `invert(${r / 255 * 100}%) sepia(${g / 255 * 100}%) saturate(${b / 255 * 100}%) hue-rotate(${Math.atan2(b - g, r - g) * 180 / Math.PI}deg)`;

    return filterValue;
  };

  const iconStyle = color ? { filter: getColorFilter(color) } : {};

  return (
    <div 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        ...iconStyle
      }} 
      className={className}
    >
      {icon ? renderCustomIcon(icon, theme || "light") : "Loading..."}
    </div>
  );
};

export default CustomIcon;