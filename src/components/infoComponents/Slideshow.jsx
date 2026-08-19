
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

import {useState, useEffect} from "react"

export default function Slideshow(props){

const [slide, setSlide] = useState(0);
useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % props.slides.length), 5000);
    return () => clearInterval(id);
  }, []);


   return ( 
<section id="gallery" className="container pb-24">
        <div className="flex items-end justify-between  gap-6 mb-8">
          <div className="ml-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-crimson mb-3">{props.title}</p>
            <h2 className="text-3xl md:text-4xl tracking-[-0.03em] font-semibold">
              {props.text}{" "}
              <span className="font-italic-serif gold-text">{props.HighlightedText}.</span>
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
              onClick={() => setSlide((s) => (s + 1) % props.slides.length)}
              className="size-11 rounded-full bg-foreground text-background hover:opacity-90 transition"
              aria-label="Next slide"
            >
              <ChevronRight className="size-4 mx-auto rtl-flip" />
            </button>
          </div>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden mr-8 ml-8 aspect-[7/4] shadow-card">
          {props.slides.map((s, i) => (
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
                  Slide {i + 1} / {props.slides.length}
                </p>
                <h3 className="text-2xl md:text-4xl font-semibold mb-2">{s.title}</h3>
                <p className="text-white/85 max-w-xl">{s.caption}</p>
              </div>
            </div>
          ))}

          {/* dots */}
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex gap-2 z-10">
            {props.slides.map((_, i) => (
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

        )
}