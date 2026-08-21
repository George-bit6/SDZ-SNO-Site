import { cn } from "../lib/utils";
import logoImage from "../assets/stDemetriosLogo 1.png";

/**
 * Brand logo for the portal.
 * Renders the uploaded image inside a circular frame.
 */
export const Logo = ({ className, ring = true }) => {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-background/40",
        ring &&
          "ring-1 ring-gold/40 shadow-[0_0_18px_-4px_hsl(var(--gold)/0.45)]",
        className,
      )}
      aria-hidden="true"
    >
      <img src={logoImage} alt="" className="h-full w-full object-contain p-1" />
    </div>
  );
};
