import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Fix the Button component to use inline styles instead of variant
const PrimaryButton = ({ children, className, asChild, ...props }) => {
  return (
    <Button
      className={cn("bg-white text-[#0A0A0A] rounded-full px-6 py-3 font-medium hover:bg-white/90 h-12", className)}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  );
};

/**
 * CTASection component with full-bleed background and gradient scrim.
 * 
 * This component implements the call-to-action banner section with a full-bleed
 * background image, gradient scrim overlay, and CTA content. It follows the JSON
 * design system for CTA sections.
 * 
 * @param {string} backgroundImage - URL for the background image
 * @param {string} badge - Badge/prefix text (e.g., "Support the Mission")
 * @param {string} title - Main CTA heading
 * @param {string} description - CTA description text
 * @param {string} ctaText - Text for the CTA button
 * @param {string} ctaLink - URL for the CTA button
 * @param {string} subtitle - Small text below CTA button (e.g., "Tax-deductible")
 * @param {string} className - Additional CSS classes
 * @param {string} id - Section ID for anchor links
 */
export default function CTASection({
  backgroundImage,
  badge = "Support the Mission",
  title = "Support Our Church",
  description = "Your gift supports the price of the Church land and the building of the Church at Saint Demetrios Zouk.",
  ctaText = "Donate Now",
  ctaLink = "#donate-link",
  subtitle = "Tax-deductible · Secure via parish account",
  className,
  id = "donate",
}) {
  return (
    <section id={id} className={cn("py-24 relative", className)} style={{ backgroundColor: '#0D1420' }}>
      {/* CTA Banner Scrim Gradient - Applied to whole section */}
      <div className="absolute inset-0 bg-cta-banner-scrim" />
      
      <div className="container relative mx-auto px-6 lg:px-16">
        <div className="relative overflow-hidden min-h-[320px]">
          

          {/* Content */}
          <div className="relative z-10 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center p-8 md:p-14 text-white">
            <div>
              {badge && (
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#D8B98A] mb-3">
                  {badge}
                </p>
              )}
              <h2 className="text-[36px] font-bold leading-[1.25] mb-4">
                {title}
              </h2>
              {description && (
                <p className="text-white/80 max-w-xl text-[16px] leading-[1.6]">
                  {description}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <PrimaryButton asChild>
                <a href={ctaLink} target="_blank" rel="noreferrer">
                  <Heart className="size-5 mr-2" /> {ctaText}
                </a>
              </PrimaryButton>
              {subtitle && (
                <p className="text-xs text-white/60">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}