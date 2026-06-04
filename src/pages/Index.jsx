
import SDZ_Logo from "@/assets/stDemetriosLogo 1.png";
import SNO_Logo from "@/assets/sno-logo 1.png";
import StDemIcon from "@/assets/stDemetriosIcon.png";
import natureBack from "@/assets/natureBackground.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  ArrowRight,
  Award,
  Compass,
  HandHeart,
  Sparkles,
  Target,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/i18n/I18nProvider";



export default function Index() {
  const { t } = useI18n();
  const subgroups = [
    { key: "cubs", count: 18 },
    { key: "scouts", count: 24 },
    { key: "guides", count: 21 },
    { key: "pioneers", count: 16 },
  ];
  const features = [
    { icon: Target, key: "track" },
    { icon: Compass, key: "missions" },
    { icon: HandHeart, key: "serve" },
  ];
  return (
    <div className="min-h-screen bg-cosmos text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="container flex items-center justify-between py-5">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="size-10" />
            <div className="leading-tight">
              <p className="font-serif text-base text-foreground">
                {t("brand.name")}
              </p>
              <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                {t("brand.tagline")}
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 rounded-full glass-card px-2 py-1.5 text-sm">
            <a
              href="#mission"
              className="px-4 py-1.5 rounded-full text-muted-foreground hover:text-gold transition-colors"
            >
              {t("nav.mission")}
            </a>
            <a
              href="#groups"
              className="px-4 py-1.5 rounded-full text-muted-foreground hover:text-gold transition-colors"
            >
              {t("nav.subgroups")}
            </a>
            <a
              href="#oath"
              className="px-4 py-1.5 rounded-full text-muted-foreground hover:text-gold transition-colors"
            >
              {t("nav.oath")}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button
              asChild
              variant="gold-outline"
              size="sm"
              className="rounded-full"
            >
              <Link to="/login">{t("nav.signin")}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO — cosmic editorial */}
      <section className="relative pt-36 pb-32">
        {/* Soft gold halo */}
        <div
          className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 w-[820px] h-[820px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(44 53% 50% / 0.22), transparent 60%)",
          }}
        />

        <div className="container relative">
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-[11px] uppercase tracking-[0.32em] text-gold mb-10">
              <Sparkles className="size-3" />
              {t("hero.badge")}
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-[-0.035em] font-semibold mb-8">
              {t("hero.title.faith")}{" "}
              <span className="font-italic-serif gold-text text-[1.05em]">
                {t("hero.title.honor")}
              </span>{" "}
              {t("hero.title.service")}
            </h1>

            <p className="max-w-xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              {t("hero.body")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                variant="hero"
                size="lg"
                className="rounded-full px-7"
              >
                <Link to="/login">
                  {t("hero.cta.login")} <ArrowRight className="rtl-flip" />
                </Link>
              </Button>
              <Button
                asChild
                variant="gold-outline"
                size="lg"
                className="rounded-full px-7"
              >
                <a href="#mission">{t("hero.cta.learn")}</a>
              </Button>
            </div>
          </div>

          {/* Orbital showcase — icon orbits around St Demetrios logo */}
          <div className="relative mx-auto mt-24 h-[360px] max-w-3xl">
            {/* concentric rings */}
            <div className="absolute inset-0 rounded-full border border-gold/15" />
            <div className="absolute inset-10 rounded-full border border-gold/20" />
            <div className="absolute inset-20 rounded-full border border-gold/25" />

            {/* center logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orb">
              <div className="absolute inset-0 -m-8 rounded-full bg-gold/20 blur-2xl" />
              <Logo className="relative size-28" />
            </div>

            {/* orbiting glass chips */}
            {[
              { icon: Target, top: "8%", left: "12%", delay: "0s" },
              { icon: Compass, top: "16%", left: "78%", delay: "1.2s" },
              { icon: HandHeart, top: "62%", left: "6%", delay: "0.6s" },
              { icon: Award, top: "70%", left: "82%", delay: "1.8s" },
              { icon: Sparkles, top: "42%", left: "92%", delay: "2.4s" },
            ].map((o, i) => (
              <div
                key={i}
                className="absolute glass-card size-14 rounded-2xl flex items-center justify-center animate-float-slow"
                style={{ top: o.top, left: o.left, animationDelay: o.delay }}
              >
                <o.icon className="size-5 text-gold" strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="mission" className="container py-28 relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">
            {t("features.kicker")}
          </p>
          <h2 className="text-4xl md:text-5xl tracking-[-0.03em]">
            {t("features.title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-italic-serif gold-text">
              {t("features.title").split(" ").slice(-1)}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <article
              key={f.key}
              className="group relative rounded-2xl glass-card p-8 hover:border-gold/40 transition-colors"
            >
              <div className="size-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 shadow-glow">
                <f.icon
                  className="size-5 text-primary-foreground"
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="text-xl mb-3">{t(`features.${f.key}.title`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`features.${f.key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* SUBGROUPS */}
      <section id="groups" className="relative py-28 border-y border-gold/10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">
              {t("groups.kicker")}
            </p>
            <h2 className="text-4xl md:text-5xl tracking-[-0.03em]">
              {t("groups.title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="font-italic-serif gold-text">
                {t("groups.title").split(" ").slice(-1)}
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {subgroups.map((g) => {
              const name = t(`groups.${g.key}.name`);
              return (
                <div
                  key={g.key}
                  className="relative rounded-2xl glass-card p-6 text-center hover:border-gold/40 transition-colors"
                >
                  <Logo className="size-14 mx-auto mb-4" />
                  <h3 className="text-lg mb-1">{name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    {t(`groups.${g.key}.age`)}
                  </p>
                  <div className="gold-divider w-12 mx-auto mb-3" />
                  <p className="text-sm">
                    <span className="font-italic-serif gold-text text-3xl">
                      {g.count}
                    </span>{" "}
                    <span className="text-muted-foreground text-[11px] uppercase tracking-wider">
                      {t("groups.members")}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section id="oath" className="container py-32">
        <figure className="max-w-3xl mx-auto text-center relative">
          <Logo className="size-14 mx-auto mb-8" />
          <blockquote className="text-3xl md:text-5xl tracking-[-0.025em] leading-[1.15] mb-6">
            <span className="font-italic-serif gold-text">“</span>
            {t("quote.text")}
            <span className="font-italic-serif gold-text">”</span>
          </blockquote>
          <div className="gold-divider w-16 mx-auto mb-4" />
          <figcaption className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            {t("quote.cite")}
          </figcaption>
        </figure>
      </section>

      <footer className="border-t border-gold/10">
        <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <Logo className="size-9" />
            <span className="font-serif text-base text-foreground">
              {t("brand.name")}{" "}
              <span className="text-muted-foreground">
                {" "}
                · {t("brand.tagline")}
              </span>
            </span>
          </div>
          <p>{t("footer.location", { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}
