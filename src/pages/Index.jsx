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
import stNestorIcon from "../assets/stNestor.png";
import StsDavidCatherine from "../assets/stsDavidCatherine.png";
import stsIgnatiusHelena from "../assets/stsIgnatiusHelena.png";
import img1 from "../assets/20251026_123219-scaled.jpg";
import img2 from "../assets/WhatsApp Image 2026-01-02 at 2.25.52 PM.jpeg";
import img3 from "../assets/nelly-flag.jpeg";
import stDIcon from "../assets/stDemetriosIcon.png";

import HeroSection from "../components/infoComponents/HeroSection"
import StatBox from "../components/infoComponents/StatBox"

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


  const services = [
    { img: stNestorIcon, title: "Rovers Clan", body: "St. Nestor " },
    { img: StsDavidCatherine, title: " Scouts & Guides", body: "Sts. David and Catherine" },
    { img: stsIgnatiusHelena, title: "Cubs & Brownies. ", body: "Sts. Helena and Ignatius" },
    { img: heroImg, title: "Beavers & Buds", body: "St. Irene" },
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-zinc-200 dark:bg-background text-foreground overflow-x-hidden">

      
      
      <HeroSection
        heroImg={heroImg}
        heroTitle="Saint Demetrios Zouk"
        heroTitleHighlight="Orthodox Church"
        heroSubtitle="Forming young Orthodox Christians in prayer, discipline, and love of neighbor — walking together on the path of the Saints."
        heroColor="hsl(44_70%_65%)"
      > 
      
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
      
      
      </HeroSection>
{/* QUOTE */}
      <section className="container mt-44 md:mt-12 pb-24">
         <h1 className="flex justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.03em] font-semibold mb-4 md:mb-6 font-italic-serif gold-text">
               
                
                  John 13: 34-35
                
              </h1>
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-4xl tracking-[-0.02em] leading-[1.25] mb-8">
            <span className="font-italic-serif gold-text">"</span>
            
            A new command I give you: Love one another. As I have loved you, so you must love one another. 
            By this everyone will know that you are my disciples, if you love one another.

            
            <span className="font-italic-serif gold-text">"</span>
          </blockquote>
          
        </div>
      </section>
{/* WHY US — split image + reasons */}
      <section id="why" className="container pb-24">
        <div className="relative rounded-[2rem] overflow-hidden bg-secondary text-secondary-foreground">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[420px]">
              <img src={stDIcon} alt="Scouts by the church" className="absolute inset-0 w-full h-full object-scale-down" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-secondary/80" />
          
            </div>
            <div className="p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl md:text-4xl tracking-[-0.03em] font-semibold mb-8">
                Weekly Liturgical Schedule
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


      

      {/* GALLERY SLIDESHOW */}
      <section id="gallery" className="container pb-24">
        <div className="flex items-end justify-between  gap-6 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-crimson mb-3">Life in the Troop</p>
            <h2 className="text-3xl md:text-4xl tracking-[-0.03em] font-semibold">
              Moments from{" "}
              <span className="font-italic-serif gold-text">this year.</span>
            </h2>
          </div>
          <div className="flex gap-2 ">
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

        <div className="relative rounded-[2rem] overflow-hidden mr-8 ml-8 aspect-[7/4] shadow-card">
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

      {/* SERVICES / WHAT WE DO — image cards grid */}
      <section id="services" className=" pb-24 mt-16">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-crimson mb-3">The Scout Subgroups</p>
          <h2 className="text-3xl md:text-4xl tracking-[-0.03em] font-semibold">
            A living rhythm of{" "}
            <span className="font-italic-serif gold-text">prayer, and service.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:gap-5 gap-2 md:grid-cols-4 2xl:grid-cols-4">
          {services.map((s) => (
            <article key={s.title} className="group relative rounded-3xl overflow-hidden aspect-[1] group-hover:shadow-2xl transition-shadow duration-700">
              <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0  w-full h-full object-scale-down drop-shadow-sm transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/15 to-transparent" />
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
          <img src={stsIgnatiusHelena} alt="Scouts around campfire" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-crimson/70" />
          <div className="relative z-10 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center p-8 md:p-14 text-white">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[hsl(44_70%_75%)] mb-3">Support the Mission</p>
              <h2 className="text-3xl md:text-5xl tracking-[-0.03em] font-semibold mb-4">
                Support the Church <span className="font-italic-serif text-[hsl(44_70%_75%)]"></span>
              </h2>
              <p className="text-white/80 max-w-xl">
                Your gift funds the price of the Church land and the building of the Church at Saint Demetrios Zouk.
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
