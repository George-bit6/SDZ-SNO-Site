import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom button component to match design spec
const PrimaryButton = ({ children, className, asChild, ...props }) => {
  return (
    <Button
      className={cn("bg-[#0A0A0A] text-white rounded-full px-7 py-3.5 font-medium hover:shadow-[0_6px_16px_rgba(0,0,0,0.18)] transition-shadow h-12", className)}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  );
};

/**
 * OverviewSection component with asymmetric two-column split layout.
 * 
 * This component implements the overview section with a ~60/40 split layout
 * as specified in the JSON design system. It displays content on the left
 * and an image on the right.
 * 
 * @param {string} title - Section heading text
 * @param {string} description - Section description/body text
 * @param {string} imageSrc - URL for the right column image
 * @param {string} imageAlt - Alt text for the image
 * @param {string} ctaText - Text for the CTA button
 * @param {string} ctaLink - URL for the CTA button
 * @param {string} className - Additional CSS classes
 * @param {string} backgroundColor - Background color (default: #FAFAF9)
 */
export default function OverviewSection({
  title = "Our Mission",
  description = "We are dedicated to forming young Orthodox Christians in prayer, discipline, and love of neighbor. Our scout program follows the ancient traditions of the Church while helping youth navigate modern challenges.",
  imageSrc,
  imageAlt = "Section image",
  ctaText = "Learn More",
  ctaLink = "#learn-more",
  className,
  backgroundColor = "#FAFAF9",
}) {
  return (
    <section className={cn("py-24", className)} style={{ backgroundColor }}>
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-[36px] font-bold leading-[1.25] text-[#111827] mb-6">
              {title}
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#6B7280] mb-8 max-w-lg">
              {description}
            </p>
            <PrimaryButton asChild>
              <a href={ctaLink}>
                {ctaText} <ArrowRight className="size-5 ml-2" />
              </a>
            </PrimaryButton>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto drop-shadow-[4px_4px_8px_rgba(0,0,0,0.6)] border-0"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}