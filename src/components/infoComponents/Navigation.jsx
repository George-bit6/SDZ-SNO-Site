import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { Menu, X, Heart } from "lucide-react";

import { Button } from "../ui/button";
import {Logo} from "../Logo";
import { LanguageToggle } from "@/components/LanguageToggle";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
        
        <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
          <div className="container flex items-center justify-between py-3 md:py-4">
            <Link to="/" className="flex items-center gap-3">
              <Logo className="size-8 md:size-9 text-white" />
              <div className="leading-tight">
                <p className="font-serif text-sm md:text-[15px] text-white">{t("brand.name")}</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-white/70">
                  {t("brand.tagline")}
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8 text-sm">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-white/80 hover:text-gold transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1 md:gap-2">
              <LanguageToggle className="text-white/80 hover:text-gold hidden sm:inline-flex" />
              <Button asChild size="sm" className="rounded-full bg-crimson hover:bg-crimson/90 text-white hidden sm:inline-flex">
                <a href="#donate">
                  <Heart className="size-3.5" /> Donate
                </a>
              </Button>
              <Button asChild size="sm" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white hidden sm:inline-flex">
                <Link to="/login">{t("nav.signin")}</Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden absolute inset-x-0 top-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md px-4 pb-5 pt-2">
              <nav className="flex flex-col gap-1">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-3 px-2 text-sm text-white/80 hover:text-gold border-b border-white/10 last:border-0 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-2 sm:hidden">
                <Button asChild size="sm" className="rounded-full bg-crimson hover:bg-crimson/90 text-white w-full">
                  <a href="#donate" onClick={() => setMenuOpen(false)}>
                    <Heart className="size-3.5" /> Donate
                  </a>
                </Button>
                <Button asChild size="sm" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white w-full">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>{t("nav.signin")}</Link>
                </Button>
              </div>
            </div>
          )}
        </header>
        )
    }