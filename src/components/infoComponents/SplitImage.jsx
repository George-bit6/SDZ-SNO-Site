

export default function SplitImage(props){


    return (<section id="why" className="container pb-24">
        <div className="relative rounded-[2rem] overflow-hidden bg-secondary text-secondary-foreground">
          
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[420px]">
              <img src={props.image} alt="Scouts by the church" 
              className="drop-shadow-[-4px_4px_4px_rgba(0,0,0,0.4)] absolute inset-0 w-full h-full object-scale-down" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-secondary/80" />
          
            </div>
            <div className="p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl md:text-4xl tracking-[-0.03em] font-semibold mb-8">
                {props.title}
              </h2>
              <div className="space-y-3">
                {props.reasons.map((r, i) => (
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

)


}