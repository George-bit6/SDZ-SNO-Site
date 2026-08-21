import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { Cross, ArrowRight, Heart } from "lucide-react";
import { Button } from "../ui/button";

import Navigation from "./Navigation";
import StatBox from "./StatBox";

export default function HeroSection(props) {
  const { t } = useI18n();

  return (
      <section className="relative min-h-screen flex flex-col pt-20">
        <img
          src={props.heroImg}
          alt="Byzantine church interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <Navigation/>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex-1 container flex flex-col justify-center md:ml-8 md:mr-8 py-10 md:py-12">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="max-w-xl text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.03em] font-semibold mb-4 md:mb-6 text-white">
                {props.heroTitle}{" "}
                <span className="font-italic-serif text-[hsl(44_70%_65%)]" style={{color: props.heroColor}}>
                  {props.heroTitleHighlight}
                </span>
              </h1>

              <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed mb-6 md:mb-8 max-w-lg">
                {props.heroSubtitle}
              </p>

             {props.children}
            </div>

           
          </div>
        </div>
        {/* Stats row — anchored at bottom of hero, blends into background 
    
          <div className="relative z-10 container px-4 sm:px-6 lg:px-8 pb-6 md:pb-8">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-around gap-3">
            <StatBox value="79" label="Active Scouts" />
            <StatBox value="18+" label="Years of Formation" />
         </div>
        </div>*/}
      </section>
  )
}