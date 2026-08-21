import { Logo } from "@/components/Logo";
import { Mail, MapPin, Phone, Share2 } from "lucide-react";

/**
 * Design Footer component following the JSON design specification.
 * 
 * This component implements the footer with:
 * - Dark background (#0A0A0A)
 * - Three-column layout
 * - Link color #AEB4C0
 * - Divider color rgba(255,255,255,0.1)
 * - Specific spacing and typography from the design system
 * 
 * @param {Object} props - Component props
 * @param {Array} props.column1Links - Links for first column (e.g., Explore)
 * @param {Array} props.column2Links - Links for second column (e.g., Resources)
 * @param {Array} props.column3Links - Links for third column (e.g., Connect)
 * @param {string} props.copyright - Copyright text
 */
export default function DesignFooter({
  column1Links = [
    { label: "Mission", href: "#mission" },
    { label: "What We Do", href: "#what-we-do" },
    { label: "Gallery", href: "#gallery" },
    { label: "Why Us", href: "#why-us" },
    { label: "FAQ", href: "#faq" },
  ],
  column2Links = [
    { label: "Services", href: "#services" },
    { label: "Events", href: "#events" },
    { label: "Ministries", href: "#ministries" },
    { label: "Education", href: "#education" },
  ],
  column3Links = [
    { label: "Contact", href: "#contact" },
    { label: "Donate", href: "#donate" },
    { label: "Volunteer", href: "#volunteer" },
    { label: "Newsletter", href: "#newsletter" },
  ],
  copyright = `© ${new Date().getFullYear()} Saint Demetrios Orthodox Church. All rights reserved.`,
}) {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-6 lg:px-16 py-16">
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 - Brand & Explore */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Logo className="size-10 text-white" />
              <div className="leading-tight">
                <p className="font-medium text-white text-base">Saint Demetrios</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                  Orthodox Church
                </p>
              </div>
            </div>
            
            <p className="text-[#AEB4C0] text-sm leading-relaxed mb-6 max-w-xs">
              Forming young Orthodox Christians in prayer, discipline, and love of neighbor.
            </p>

            <nav className="space-y-3">
              {column1Links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[#AEB4C0] hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 2 - Resources */}
          <div>
            <p className="text-white font-medium text-sm mb-4">Resources</p>
            <nav className="space-y-3">
              {column2Links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[#AEB4C0] hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 - Connect */}
          <div>
            <p className="text-white font-medium text-sm mb-4">Connect</p>
            <nav className="space-y-3 mb-6">
              {column3Links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[#AEB4C0] hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-[#AEB4C0]">
              <div className="flex items-center gap-3">
                <MapPin className="size-4 flex-shrink-0" />
                <span>Zouk, Lebanon</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 flex-shrink-0" />
                <span>+961 1 XXX XXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 flex-shrink-0" />
                <span>info@saintdemetrios.org</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#facebook"
                className="text-[#AEB4C0] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Share2 className="size-5" />
              </a>
              <a
                href="#instagram"
                className="text-[#AEB4C0] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Share2 className="size-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#AEB4C0]">
              {copyright}
            </p>
            <div className="flex items-center gap-6 text-xs text-[#AEB4C0]">
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}