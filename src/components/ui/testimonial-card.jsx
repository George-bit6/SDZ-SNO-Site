import * as React from "react";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

/**
 * Testimonial Card component as specified in the design system.
 * 
 * This component displays a testimonial with a circular avatar, quote text,
 * and author information. It follows the JSON spec for testimonialCard:
 * - White background
 * - 16px border radius
 * - 20px padding
 * - Subtle shadow (0 4px 20px rgba(0,0,0,0.06))
 * - Circle avatar (40px size)
 * 
 * @param {string} avatar - URL for the avatar image
 * @param {string} name - Name of the testimonial author
 * @param {string} role - Role or title of the author
 * @param {string} quote - The testimonial quote text
 * @param {string} className - Additional CSS classes
 */
const TestimonialCard = React.forwardRef(({ 
  avatar, 
  name, 
  role, 
  quote, 
  className,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-[16px] p-5",
        "shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
        className
      )}
      {...props}
    >
      {/* Quote Icon */}
      <Quote className="size-6 text-gray-300 mb-3" />
      
      {/* Quote Text */}
      <p className="text-[15px] leading-relaxed text-gray-700 mb-4">
        {quote}
      </p>
      
      {/* Author Info */}
      <div className="flex items-center gap-3">
        {/* Circular Avatar */}
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        
        {/* Name and Role */}
        <div>
          <p className="font-medium text-gray-900 text-sm">{name}</p>
          {role && (
            <p className="text-xs text-gray-500">{role}</p>
          )}
        </div>
      </div>
    </div>
  );
});

TestimonialCard.displayName = "TestimonialCard";

export { TestimonialCard };