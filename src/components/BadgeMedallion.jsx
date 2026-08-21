import { cn } from "@/lib/utils";
export const BadgeMedallion = ({ icon: Icon, label, earned = true, className }) => (<div className={cn("flex flex-col items-center gap-2 group", className)}>
    <div className={cn("relative size-20 rounded-full flex items-center justify-center transition-all duration-300", earned
        ? "bg-gradient-to-br from-secondary to-secondary/60 border-2 border-gold shadow-glow group-hover:scale-105"
        : "bg-muted/30 border-2 border-dashed border-muted grayscale opacity-50")}>
      <div className="absolute inset-1 rounded-full border border-gold/30"/>
      <Icon className={cn("size-8", earned ? "text-gold" : "text-muted-foreground")} strokeWidth={1.5}/>
    </div>
    <span className="text-xs font-medium text-center max-w-[90px] leading-tight">
      {label}
    </span>
  </div>);
