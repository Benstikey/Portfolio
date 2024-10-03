import React, { useState } from "react";
import CustomIcon from "@/components/ui/CustomIcon";

interface StackItem {
  name: string;
  description: string;
  iconSlug: string;
  url: string;  // New property for the link
}

interface GridWithIconsProps {
  stacks: Record<string, StackItem[]>;
  iconSize?: number;
}

const GridWithIcons: React.FC<GridWithIconsProps> = ({ stacks, iconSize = 64 }) => {
  const categorizedIcons = Object.entries(stacks).map(([category, items]) => ({
    category,
    items,
  }));

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const renderStackItem = (item: StackItem, idx: number, showMore: boolean = true) => (
    <a
      key={idx}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`border rounded-lg p-4 flex items-center transition-all duration-300 ease-in-out hover:bg-gray-100 ${
        showMore ? "opacity-100" : "opacity-0"
      }`}
      style={showMore ? { transitionDelay: `${idx * 100}ms` } : {}}
    >
      <CustomIcon iconSlug={item.iconSlug} size={iconSize} className="mr-4" />
      <div className="flex flex-col text-left">
        <p className="text-gray-900">{item.name}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>
    </a>
  );

  return (
    <div className="space-y-8">
      {categorizedIcons.map(({ category, items }) => {
        const showMore = expandedCategories[category] || false;
        const shouldShowMore = items.length > 4;

        return (
          <div key={category}>
            <h2 className="mb-4">{category}</h2>

            <div className="grid gap-2 md:grid-cols-2">
              {items.slice(0, 4).map((item, idx) => renderStackItem(item, idx))}
            </div>

            <div
              className={`grid gap-2 transition-all duration-500 ease-in-out md:grid-cols-2 ${
                showMore ? "max-h-screen" : "max-h-0 overflow-hidden"
              }`}
              style={{ marginTop: '8px' }}
            >
              {items.slice(4).map((item, idx) => renderStackItem(item, idx, showMore))}
            </div>

            {shouldShowMore && (
              <div
                onClick={() => toggleCategory(category)}
                className="flex justify-center mt-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 transition-transform duration-500 ${showMore ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GridWithIcons;