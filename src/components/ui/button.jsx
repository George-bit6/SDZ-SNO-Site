import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-black-100 text-primary-foreground font-semibold tracking-wide shadow-glow hover:opacity-95 hover:scale-[1.02] transition-all duration-200",
        gold: "bg-gold text-primary-foreground hover:bg-gold/90 hover:shadow-glow font-medium",
        "gold-outline":
          "border border-gold/60 bg-transparent text-gold hover:bg-gold/10 hover:border-gold transition-colors",
        crimson: "bg-crimson text-primary-foreground hover:bg-crimson/90",
        /* Design System Variants */
        primary: "bg-[#0A0A0A] text-white rounded-full px-7 py-3.5 font-medium hover:shadow-[0_6px_16px_rgba(0,0,0,0.18)] transition-shadow",
        secondary: "bg-white text-[#0A0A0A] rounded-full px-6 py-3 font-medium hover:bg-white/90",
        "light-pill": "bg-white text-[#0A0A0A] rounded-full px-6 py-3 font-medium",
        /* New Dashboard Design System Variants */
        "ds-primary": "bg-[#4A7DFF] text-white rounded-xl px-5 py-2.5 font-bold hover:bg-[#3D68E0] transition-colors",
        "ds-secondary": "bg-white border border-[#E8ECF4] text-[#1E2A45] rounded-xl px-4 py-2 font-semibold hover:bg-[#F4F6FB] transition-colors",
        "ds-icon": "w-10 h-10 rounded-full bg-[#F4F6FB] flex items-center justify-center hover:bg-[#E8ECF4] transition-colors p-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        /* Design System Sizes */
        "design-sm": "h-9 px-4 text-sm",
        "design-md": "h-11 px-6 text-sm",
        "design-lg": "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
export { Button, buttonVariants };
