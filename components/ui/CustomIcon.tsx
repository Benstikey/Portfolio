import React from "react";
import { SimpleIcon, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";
import { useTheme } from "next-themes";

interface CustomIconProps {
  iconSlug: string;
  size?: number;
  className?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({ iconSlug, size = 64, className }) => {
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

  return (
    <div style={{ width: `${size}px`, height: `${size}px` }} className={className}>
      {icon ? renderCustomIcon(icon, theme || "light") : "Loading..."}
    </div>
  );
};

export default CustomIcon;