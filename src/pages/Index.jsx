import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Compass,
  Cross,
  Flame,
  HandHeart,
  Heart,
  Menu,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/i18n/I18nProvider";
import heroImg from "../assets/breakingthebread.jpeg";
import img1 from "../assets/stNestor.png";
import img2 from "../assets/stsDavidCatherine.png";
import img3 from "../assets/stDemetriosIcon.png";

const slides = [
  {
    img: img1,
    title: "Together in Faith",
    caption: "Our scouts gathered outside the parish on the Feast of St. Demetrios.",
  },
  {
    img: img2,
    title: "Hands that Serve",
    caption: "Planting trees in the church garden — faith made visible.",
  },
  {
    img: img3,
    title: "Fireside Fellowship",
    caption: "Evening prayers and songs at our annual mountain camp.",
  },
];

const Index = () => {
  const { t } = useI18n();
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const navLinks = [
    { href: "#mission", label: "Mission" },
    { href: "#services", label: "What We Do" },
    { href: "#gallery", label: "Gallery" },
    { href: "#why", label: "Why Us" },
    { href: "#faq", label: "FAQ" },
  ];

  const pillars = [
    { icon: Cross, title: "Divine Liturgy", body: "Weekly worship and preparation for the Holy Mysteries." },
    { icon: BookOpen, title: "Catechism", body: "Rooted study of Scripture, the Fathers, and the Creed." },
    { icon: HandHeart, title: "Diakonia", body: "Service to the poor, the sick, and the parish community." },
    { icon: Compass, title: "The Path", body: "Progression through ranks, missions, and honor badges." },
  ];

  const services = [
    { img: img1, title: "St. Nestor Clan", body: "Annual monastery pilgrimages and mountain camps." },
    { img: img2, title: "Sts. David & Catherine Scouts & Guides", body: "Food drives, visits to the elderly, parish upkeep." },
    { img: img3, title: "Feasts & Vigils", body: "Serving the altar during the great feasts of the Church." },
    { img: heroImg, title: "Iconography Workshops", body: "Learning the sacred craft of writing icons." },
  ];

  const reasons = [
    { title: "Rooted in the Fathers", body: "Every mission draws from the writings of the Church Fathers." },
    { title: "Guided by Clergy", body: "Our program is blessed and led alongside the parish priest." },
    { title: "Bilingual Formation", body: "All materials in English and Arabic — for every scout." },
  ];

  const faqs = [
    { q: "Who can join Antioch Scouts?", a: "Any baptized child ages 8–18 whose family is part of an Eastern Orthodox parish. Catechumens are welcome with their sponsor." },
    { q: "How often do you meet?", a: "Weekly troop meetings on Saturdays, plus monthly outings and two major camps per year." },
    { q: "Is there a fee to participate?", a: "A small annual fee covers uniforms and camp materials. Scholarships are available through our donations program — no child is turned away." },
    { q: "Where do donations go?", a: "100% supports scholarships, camp equipment, service projects, and pilgrimage costs. Donors receive a full annual report." },
  ];

  return (
    <div className="min-h-screen bg-[hsl(40_25%_96%)] dark:bg-background text-foreground overflow-x-hidden">
      {/* HERO — full viewport, image behind nav */}
      <section className="relative min-h-screen flex flex-col">
        <img
          src={heroImg}
          alt="Byzantine church interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* NAV — overlaid on full-screen hero, mobile-first */}
        <header className="relative z-50 w-full backdrop-blur-md bg-black/20 border-b border-white/10">
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
              <ThemeToggle className="text-white/80 hover:text-gold hidden sm:inline-flex" />
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

        {/* HERO CONTENT */}
        <div className="relative z-10 flex-1 container flex flex-col justify-center py-10 md:py-12">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="max-w-xl text-white">
              <span className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-white/90 mb-4 md:mb-6">
                <Cross className="size-3" /> Eastern Orthodox Scout Group
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.03em] font-semibold mb-4 md:mb-6 text-white">
                Faith, Honor & Service{" "}
                <span className="font-italic-serif text-[hsl(44_70%_65%)]">for the next generation</span>
              </h1>

              <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed mb-6 md:mb-8 max-w-lg">
                Forming young Orthodox Christians in prayer, discipline, and love of neighbor —
                walking together on the ancient path of the Church of Antioch.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
                <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-white/90 w-full sm:w-auto">
                  <Link to="/login">
                    Enter the Portal <ArrowRight className="rtl-flip" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="rounded-full bg-crimson hover:bg-crimson/90 text-white w-full sm:w-auto">
                  <a href="#donate">
                    <Heart className="size-4" /> Donate
                  </a>
                </Button>
              </div>
            </div>

           
          </div>
        </div>

        {/* Stats row — anchored at bottom of hero, blends into background */}
        <div className="relative z-10 container px-4 sm:px-6 lg:px-8 pb-6 md:pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { k: "79", v: "Active Scouts" },
              { k: "18+", v: "Years of Formation" },
              { k: "24", v: "Honor Badges" },
              { k: "1,240", v: "Service Hours / yr" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4 md:p-5"
              >
                <div className="font-italic-serif text-3xl md:text-4xl gold-text leading-none mb-1.5 md:mb-2">{s.k}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/80">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* SERVICES / WHAT WE DO — image cards grid */}
      <section id="services" className="container pb-24 mt-16">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-crimson mb-3">What We Do</p>
          <h2 className="text-3xl md:text-4xl tracking-[-0.03em] font-semibold">
            A living rhythm of{" "}
            <span className="font-italic-serif gold-text">prayer, and service.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s) => (
            <article key={s.title} className="group relative rounded-2xl overflow-hidden aspect-[16/10] group-hover:shadow-2xl transition-shadow duration-700">
              <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 w-full h-full object-scale-down transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
              <div className="relative z-10 h-full p-6 flex flex-col justify-end text-white">
                <h3 className="text-xl md:text-2xl font-semibold mb-1.5">{s.title}</h3>
                <p className="text-sm text-white/80 max-w-md">{s.body}</p>
              </div>
              <div className="absolute top-4 right-4 size-9 rounded-full bg-white/95 flex items-center justify-center text-black">
                <ArrowUpRight className="size-4" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* GALLERY SLIDESHOW */}
      <section id="gallery" className="container h-11/12 aspect-[10/7] pb-24">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-crimson mb-3">Life in the Troop</p>
            <h2 className="text-3xl md:text-4xl tracking-[-0.03em] font-semibold">
              Moments from{" "}
              <span className="font-italic-serif gold-text">this year.</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)}
              className="size-11 rounded-full border border-border bg-card hover:bg-muted transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-4 mx-auto rtl-flip" />
            </button>
            <button
              onClick={() => setSlide((s) => (s + 1) % slides.length)}
              className="size-11 rounded-full bg-foreground text-background hover:opacity-90 transition"
              aria-label="Next slide"
            >
              <ChevronRight className="size-4 mx-auto rtl-flip" />
            </button>
          </div>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden aspect-[16/9] shadow-card">
          {slides.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: slide === i ? 1 : 0 }}
              aria-hidden={slide !== i}
            >
              <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[hsl(44_70%_75%)] mb-2">
                  Slide {i + 1} / {slides.length}
                </p>
                <h3 className="text-2xl md:text-4xl font-semibold mb-2">{s.title}</h3>
                <p className="text-white/85 max-w-xl">{s.caption}</p>
              </div>
            </div>
          ))}

          {/* dots */}
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-1.5 rounded-full transition-all ${slide === i ? "w-8 bg-white" : "w-4 bg-white/50"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY US — split image + reasons */}
      <section id="why" className="container pb-24">
        <div className="relative rounded-[2rem] overflow-hidden bg-secondary text-secondary-foreground">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[420px]">
              <img src={img3} alt="Scouts by the church" className="absolute inset-0 w-full h-full object-scale-down" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-secondary/80" />
              <div className="absolute bottom-6 left-6 z-10">
                <Button asChild size="lg" className="rounded-full bg-crimson hover:bg-crimson/90 text-white">
                  <a href="#donate"><Heart className="size-4" /> Support a Scout</a>
                </Button>
              </div>
            </div>
            <div className="p-8 md:p-12 lg:p-16">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[hsl(44_70%_65%)] mb-3">Why Antioch?</p>
              <h2 className="text-3xl md:text-4xl tracking-[-0.03em] font-semibold mb-8">
                A scouting program that is <span className="font-italic-serif gold-text">unmistakably Orthodox.</span>
              </h2>
              <div className="space-y-3">
                {reasons.map((r, i) => (
                  <div key={r.title} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <div className="flex items-start gap-4">
                      <div className="size-9 rounded-lg bg-crimson text-white flex items-center justify-center text-sm font-semibold shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{r.title}</h3>
                        <p className="text-sm text-secondary-foreground/70">{r.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / QUOTE */}
      <section className="container pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-crimson mb-6">Trusted by families</p>
          <blockquote className="text-2xl md:text-4xl tracking-[-0.02em] leading-[1.25] mb-8">
            <span className="font-italic-serif gold-text">"</span>
            My son came home from camp reciting the Trisagion by heart and asking to visit the elderly at our parish. Antioch Scouts formed him in a way no other program could.
            <span className="font-italic-serif gold-text">"</span>
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="size-11 rounded-full bg-gradient-gold" />
            <div className="text-left">
              <p className="font-semibold text-sm">Maria Haddad</p>
              <p className="text-xs text-muted-foreground">Parent · Beirut</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container pb-24">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-crimson mb-3">Common Questions</p>
            <h2 className="text-3xl md:text-4xl tracking-[-0.03em] font-semibold">
              The most common questions{" "}
              <span className="font-italic-serif gold-text">about our group.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-card border border-border/70 p-5 open:border-gold/50"
                open={i === 0}
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <span className="font-semibold text-base">{f.q}</span>
                  <span className="size-7 rounded-full bg-muted flex items-center justify-center text-lg leading-none group-open:bg-crimson group-open:text-white transition">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE CTA BANNER */}
      <section id="donate" className="container pb-24">
        <div className="relative rounded-[2rem] overflow-hidden min-h-[320px]">
          <img src={img3} alt="Scouts around campfire" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-crimson/70" />
          <div className="relative z-10 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center p-8 md:p-14 text-white">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[hsl(44_70%_75%)] mb-3">Support the Mission</p>
              <h2 className="text-3xl md:text-5xl tracking-[-0.03em] font-semibold mb-4">
                Sponsor a scout. <span className="font-italic-serif text-[hsl(44_70%_75%)]">Bless a family.</span>
              </h2>
              <p className="text-white/80 max-w-xl">
                Your gift funds camp scholarships, monastery pilgrimages, and service supplies for
                children whose families cannot cover the cost. No child is turned away.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-white/90 px-8">
                <a href="https://example.com/donate" target="_blank" rel="noreferrer">
                  <Heart className="size-4" /> Donate Now <ArrowRight className="rtl-flip" />
                </a>
              </Button>
              <p className="text-xs text-white/60">Tax-deductible · Secure via parish account</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
    </div>
  );
};

export default Index;
