import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

/**
 * Info List Card component as specified in the design system.
 * 
 * This component displays a list of information items with a transparent background,
 * divider lines between rows, and consistent padding. It follows the JSON spec for
 * infoListCard:
 * - Transparent background
 * - 1px solid #E5E7EB divider style
 * - 12px 0 row padding
 * 
 * @param {Array} items - Array of items with { label, value, icon } structure
 * @param {string} className - Additional CSS classes
 * @param {boolean} showIcons - Whether to show icons for each item
 */
const InfoListCard = React.forwardRef(({ 
  items = [], 
  showIcons = true,
  className,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-transparent",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex items-start gap-3 py-3",
            index < items.length - 1 && "border-b border-[#E5E7EB]"
          )}
        >
          {/* Icon */}
          {showIcons && (
            <div className="flex-shrink-0 mt-0.5">
              {item.icon ? (
                <item.icon className="size-5 text-green-600" />
              ) : (
                <Check className="size-5 text-green-600" />
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {item.label && (
              <p className="text-sm font-medium text-gray-900 mb-0.5">
                {item.label}
              </p>
            )}
            {item.value && (
              <p className="text-sm text-gray-600">
                {item.value}
              </p>
            )}
            {item.description && (
              <p className="text-sm text-gray-500 mt-1">
                {item.description}
              </p>
            )}
          </div>

          {/* Action Indicator */}
          {item.actionable && (
            <ChevronRight className="size-5 text-gray-400 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
});

InfoListCard.displayName = "InfoListCard";

export { InfoListCard };