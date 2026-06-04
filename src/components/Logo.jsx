import { cn } from "../libs/utils";
/**
 * Placeholder logo — the brand mark for the portal.
 * Renders a circular frame without an image.
 */
export const Logo = ({ className, ring = true }) => {
  return (
    <div
      className={cn(
        "relative shrink-0 rounded-full overflow-hidden bg-background/40",
        ring &&
          "ring-1 ring-gold/40 shadow-[0_0_18px_-4px_hsl(var(--gold)/0.45)]",
        className,
      )}
      aria-hidden="true"
    />
  );
};
