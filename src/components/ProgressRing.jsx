import { cn } from "@/lib/utils";
export const ProgressRing = ({ value, size = 180, stroke = 12, className, label, }) => {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;
    return (<div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(16, 185, 129)"/>
            <stop offset="100%" stopColor="rgb(16, 185, 129)"/>
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="hsl(var(--muted))" strokeWidth={stroke} fill="none" opacity={0.4}/>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="url(#ring-gradient)" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1.2s ease-out" }}/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-4xl font-semibold text-black">{Math.round(value)}%</span>
        {label && <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{label}</span>}
      </div>
    </div>);
};
