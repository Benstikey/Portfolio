import React, { useState } from "react";
import CustomIcon from "@/components/ui/CustomIcon"; // Import your CustomIcon component

interface StackItem {
  name: string;
  description: string;
  iconSlug: string;
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

  return (
    <div className="space-y-8">
      {categorizedIcons.map(({ category, items }) => {
        const [showMore, setShowMore] = useState(false);
        const shouldShowMore = items.length > 4;

        return (
          <div key={category}>
            {/* Category Title */}
            <h2 className="mb-4">{category}</h2>

            {/* Icon Grid Container */}
            <div className="grid gap-2 md:grid-cols-2">
              {/* Initially visible items */}
              {items.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-3 flex items-center transition-all duration-300 ease-in-out hover:bg-gray-100"
                >
                  {/* Custom Icon */}
                  <CustomIcon iconSlug={item.iconSlug} size={iconSize} className="mr-4" />

                  {/* Text Container */}
                  <div className="flex flex-col text-left">
                    <p className="text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Revealing Section for Additional Items */}
            <div
              className={`grid gap-2 transition-all duration-500 ease-in-out md:grid-cols-2 ${
                showMore ? "max-h-screen" : "max-h-0 overflow-hidden"
              }`}
              style={{ marginTop: '8px' }} // Add margin-top to create space between revealed tools and additional tools
            >
              {items.slice(4).map((item, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg p-4 flex items-center transition-opacity duration-500 ease-in-out opacity-0 transform ${
                    showMore ? "opacity-100" : "opacity-0"
                  } hover:bg-gray-100`}
                  style={{ transitionDelay: `${idx * 100}ms` }} // Stagger the reveal
                >
                  <CustomIcon iconSlug={item.iconSlug} size={iconSize} className="mr-4" />
                  <div className="flex flex-col text-left">
                    <p className="text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow Button for See More */}
            {shouldShowMore && (
              <div
                onClick={() => setShowMore((prev) => !prev)}
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