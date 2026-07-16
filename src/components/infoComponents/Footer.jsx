import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";

export default function Footer(props){

    const { t } = useI18n();
    return(
        <footer className="border-t border-border/60 bg-card/30">
        <div className="container py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo className="size-10" />
              <div className="leading-tight">
                <p className="font-serif text-base">{t("brand.name")}</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{t("brand.tagline")}</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-sm">
              An Eastern Orthodox scout group under the Patriarchate of Antioch, serving families in
              Beirut and beyond since 2007.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-3">Explore</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#mission" className="hover:text-gold">Mission</a></li>
              <li><a href="#services" className="hover:text-gold">What We Do</a></li>
              <li><a href="#gallery" className="hover:text-gold">Gallery</a></li>
              <li><a href="#faq" className="hover:text-gold">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3">Get Involved</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/login" className="hover:text-gold">Portal Login</Link></li>
              <li><a href="#donate" className="hover:text-gold">Donate</a></li>
              <li><a href="mailto:contact@antiochscouts.org" className="hover:text-gold">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="container py-5 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
            <p>© {new Date().getFullYear()} Antioch Scout Group · Beirut, Lebanon</p>
            <p>Faith · Honor · Service</p>
          </div>
        </div>
      </footer>
      
    )

}