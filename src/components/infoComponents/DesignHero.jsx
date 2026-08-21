import { Logo } from "@/components/Logo";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom button components to match design spec
const LightPillButton = ({ children, className, asChild, ...props }) => {
  return (
    <Button
      className={cn("bg-white text-[#0A0A0A] rounded-full px-6 py-3 font-medium hover:bg-white/90 h-9 text-sm", className)}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  );
};

const PrimaryButton = ({ children, className, asChild, ...props }) => {
  return (
    <Button
      className={cn("bg-[#0A0A0A] text-white rounded-full px-7 py-3.5 font-medium hover:shadow-[0_6px_16px_rgba(0,0,0,0.18)] transition-shadow h-12 text-base", className)}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  );
};

const SecondaryButton = ({ children, className, asChild, ...props }) => {
  return (
    <Button
      className={cn("bg-white text-[#0A0A0A] rounded-full px-6 py-3 font-medium hover:bg-white/90 h-12 text-base", className)}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  );
};

/**
 * Design Hero Section component following the JSON design specification.
 * 
 * This component implements the hero section with:
 * - Full-bleed background imagery with contained content
 * - Navigation with logo left, links center, CTA button right
 * - Transparent navigation floating over hero image
 * - Light pill button on dark background for CTA
 * - Hero scrim gradient overlay
 * 
 * @param {string} backgroundImage - URL for the hero background image
 * @param {string} title - Main hero heading (h1Hero style: 52px, 500 weight)
 * @param {string} subtitle - Hero subtitle text
 * @param {string} ctaText - Text for the primary CTA button
 * @param {string} ctaLink - URL for the CTA button
 */
export default function DesignHero({
  backgroundImage,
  title = "Saint Demetrios Orthodox Church",
  subtitle = "Forming young Orthodox Christians in prayer, discipline, and love of neighbor — walking together on the path of the Saints.",
  ctaText = "Get Started",
  ctaLink = "#",
}) {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={backgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        {/* Hero Scrim Gradient */}
        <div className="absolute inset-0 bg-hero-scrim" />
      </div>

      {/* Navigation - Transparent, floats over hero image */}
      <header className="relative z-20 backdrop-blur-sm bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Left */}
            <div className="flex items-center gap-3">
              <Logo className="size-8 text-white" />
              <div className="leading-tight">
                <p className="font-medium text-white text-sm">Saint Demetrios</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                  Orthodox Church
                </p>
              </div>
            </div>

            {/* Links Center - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {['Mission', 'What We Do', 'Gallery', 'Why Us', 'FAQ'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* CTA Button Right */}
            <div className="flex items-center gap-4">
              <LightPillButton asChild>
                <a href="/login">
                  Sign In
                </a>
              </LightPillButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-16 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          {/* H1 Hero - 52px, 500 weight, -0.01em letter spacing */}
          <h1 className="text-[42px] sm:text-[48px] md:text-[52px] font-medium leading-[1.15] tracking-[-0.01em] text-white mb-6">
            {title}
          </h1>

          {/* Subtitle - bodyLarge style */}
          <p className="text-[16px] leading-[1.6] text-white/80 max-w-2xl mx-auto mb-10">
            {subtitle}
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton asChild>
              <a href={ctaLink}>
                {ctaText} <ArrowRight className="size-5 ml-2" />
              </a>
            </PrimaryButton>
            <SecondaryButton asChild>
              <a href="#donate">
                Donate
              </a>
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}