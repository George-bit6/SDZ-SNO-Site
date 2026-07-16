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

import HeroSection from "../components/infoComponents/HeroSection";
import StatBox from "../components/infoComponents/StatBox";
import SplitImage from "../components/infoComponents/SplitImage";
import Slideshow from "../components/infoComponents/Slideshow";
import FAQ from "../components/infoComponents/FAQ"
import Footer from "../components/infoComponents/Footer"
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
  const [menuOpen, setMenuOpen] = useState(false);


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
    
     
      <div className="min-h-screen  text-foreground overflow-hidden " >
        <div
    className="fixed inset-0 -z-10 max-w-full overflow-hidden"
    style={{
      backgroundColor: "#fff",
      backgroundImage: `
        radial-gradient(circle, transparent 20%, white 20%, white 80%, transparent 80%, transparent),
        radial-gradient(circle, transparent 20%, white 20%, white 80%, transparent 80%, transparent),
        linear-gradient(#e7c266 2px, transparent 2px),
        linear-gradient(90deg, #e7c266 2px, white 2px)
      `,
      backgroundPosition: "0 0, 25px 25px, 0 -1px, -1px 0",
      backgroundSize: "50px 50px, 50px 50px, 25px 25px, 25px 25px",
      opacity: 0.6,
    }}
  />
       <div
    className="
      absolute 
      
      bg-white/20
      backdrop-blur-[2px]
      shadow-xl
      z-1
    "
  >
      
      <HeroSection
        heroImg={heroImg}
        heroTitle="Saint Demetrios Zouk"
        heroTitleHighlight="Orthodox Church"
        heroSubtitle="Forming young Orthodox Christians in prayer, discipline, and love of neighbor — walking together on the path of the Saints."
        heroColor="hsl(44_70%_65%)"
      > 
      
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
                <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-white/90  sm:w-auto ">
                  <Link to="/login">
                    Enter the Portal <ArrowRight className="rtl-flip" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="rounded-full bg-crimson hover:bg-crimson/90 text-white  sm:w-auto">
                  <a href="#donate">
                    <Heart className="size-4" /> Donate
                  </a>
                </Button>
              </div>
      
      
      </HeroSection>
{/* QUOTE */}
      <section className="container mt-24 pb-24">
         <h1 className="flex justify-center text-2xl sm:text-4xl md:text-4xl lg:text-5xl leading-[1.02] tracking-[-0.03em] font-semibold mb-4 md:mb-6  gold-text">
               
                
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


      <SplitImage image={stDIcon} title={"Weekly Liturgical Schedule"} reasons = {reasons}/>
    
      <Slideshow slides = {slides} title={"Parish News"} text = {"Moments from"} HighlightedText = {"this month"} />

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

      <FAQ title={"COMMON QUESTIONS"} text={"The most common questions"} HighlightedText={"about our Church"} faqs={faqs}/>

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

     <Footer/>
    </div>
    </div>
  );
};

export default Index;
