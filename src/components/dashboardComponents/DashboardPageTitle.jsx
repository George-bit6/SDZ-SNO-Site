


export default function DashboardPageTitle(props){

    return (
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                        <div>
                           <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: props.accentColor }}>
                                {props.subtitle}
                            </p>
                            <h1 className="font-serif text-4xl md:text-5xl famil">{props.title}</h1>
                            
                        </div>
                        <div className="flex gap-2">
                            {props.children}
                        </div>
                    </div>
    )

}