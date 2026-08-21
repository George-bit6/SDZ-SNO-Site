import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

/**
 * Image Overlay Card component as specified in the design system.
 * 
 * This component displays an image with content overlaid on top, using a gradient scrim
 * for text readability. It supports a badge in the top-left corner and text positioned
 * at the bottom-left over the gradient overlay.
 * 
 * @param {string} image - The image source URL
 * @param {string} badge - Optional badge text to display in top-left
 * @param {string} title - Main card title displayed at bottom-left
 * @param {string} description - Optional description text
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Additional content to render
 */
const ImageOverlayCard = React.forwardRef(({ 
  image, 
  badge, 
  title, 
  description, 
  className, 
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-[20px]",
        "shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
        "aspect-[4/3] md:aspect-[16/10]",
        className
      )}
      {...props}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title || "Card image"}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient Scrim Overlay */}
      <div className="absolute inset-0 bg-image-card-scrim" />
      
      {/* Badge - Top Left */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <Badge
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/20 text-white text-[11px] font-medium tracking-[0.03em] capitalize px-3.5 py-1.5"
          >
            {badge}
          </Badge>
        </div>
      )}
      
      {/* Content - Bottom Left */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="text-[22px] font-semibold leading-[1.3] text-white mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-white/80 leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
});

ImageOverlayCard.displayName = "ImageOverlayCard";

export { ImageOverlayCard };