export default function StatisticCards(props){

    return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {props.stats.length > 0 ? (
                            props.stats.map((s) => (
                                <div key={s.label} className="relative rounded-lg border border-border bg-card p-5 shadow-card overflow-hidden">
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
                                    <p className="font-serif text-4xl mt-2" style={{color: props.accentColor}}>{s.value}</p>
                                    <p className="text-xs text-muted-foreground/80 mt-2">{s.delta}</p>
                                </div>
                            ))
                        ) : (
                            <div className="lg:col-span-4 rounded-2xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
                                {'No Stats Available'}
                            </div>
                        )}
                    </section>
)
}