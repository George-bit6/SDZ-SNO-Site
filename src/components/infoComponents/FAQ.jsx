


export default function FAQ(props){


    return (
        <section id="faq" className="container pb-24">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-crimson mb-3">{props.title}</p>
            <h2 className="text-3xl md:text-4xl tracking-[-0.03em] font-semibold">
              {props.text}{" "}
              <span className="font-italic-serif gold-text">{props.HighlightedText}</span>
            </h2>
          </div>
          <div className="space-y-3">
            {props.faqs.map((f, i) => (
              <details
                key={i}
                className="group  p-5 relative overflow-hidden 
                
        bg-white/40 backdrop-blur-[16px] 
        rounded-[20px] 
        border border-white/30 
        shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_12px_6px_rgba(255,255,255,0.6)] 
        
        before:absolute before:content-[''] before:top-0 before:inset-x-0 before:h-[1px] 
        before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent 
        
        after:absolute after:content-[''] after:top-0 after:left-0 after:w-[1px] after:h-full 
        after:bg-gradient-to-b after:from-white/80 after:via-transparent after:to-white/30"
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

      
    )
}