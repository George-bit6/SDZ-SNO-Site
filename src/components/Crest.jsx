import { cn } from "@/lib/utils";
/**
 * Clean modern scout fleur-de-lis mark.
 * Renders as inline SVG so it stays crisp at every size and inherits color.
 */
export const Crest = ({ className, initials, variant = "gold" }) => {
    // When initials are passed (e.g. member avatars), render a circular badge with initials
    if (initials) {
        return (<div className={cn("rounded-full flex items-center justify-center font-medium tracking-wide text-xs", variant === "gold" && "bg-gradient-gold text-primary-foreground", variant === "muted" && "bg-muted text-foreground border border-border", variant === "plain" && "bg-secondary text-gold border border-gold/30", className)} aria-hidden="true">
        {initials}
      </div>);
    }
    // Otherwise render the logo mark
    return (<div className={cn("rounded-full flex items-center justify-center", variant === "gold" && "bg-gradient-gold text-primary-foreground", variant === "muted" && "bg-muted text-foreground border border-border", variant === "plain" && "bg-transparent text-gold", className)} aria-hidden="true">
      <ScoutMark className="size-[60%]"/>
    </div>);
};
/** The standalone fleur-de-lis SVG mark — scales via className width/height or size-* */
export const ScoutMark = ({ className }) => (<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Center spire */}
    <path d="M32 6 L32 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    {/* Spire diamond top */}
    <path d="M32 6 L36 18 L32 26 L28 18 Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" fill="none"/>
    {/* Left petal */}
    <path d="M32 32 C 22 32, 14 26, 12 18 C 14 30, 20 38, 32 40" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {/* Right petal (mirror) */}
    <path d="M32 32 C 42 32, 50 26, 52 18 C 50 30, 44 38, 32 40" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {/* Bottom flair */}
    <path d="M32 58 L26 50 M32 58 L38 50" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    {/* Center band */}
    <rect x="22" y="36" width="20" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>);
