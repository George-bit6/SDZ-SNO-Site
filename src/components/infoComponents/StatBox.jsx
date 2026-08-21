

export default function StatBox(props) {
  return (


              <div
                key={props.value}
                className="rounded-2xl bg-white/10 backdrop-blur-xl border border-black/5 shadow-sm p-4 md:p-5">
                <div className="font-italic-serif text-3xl md:text-4xl gold-text leading-none mb-1.5 md:mb-2">{props.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-black/80">{props.label}</div>
              </div>
        
  )
}