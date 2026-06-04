import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
const styles = {
    "not-started": "bg-muted/60 text-muted-foreground border-border",
    "in-progress": "bg-gold/15 text-gold border-gold/40",
    "complete": "bg-secondary/60 text-secondary-foreground border-secondary",
    "verified": "bg-gradient-gold text-primary-foreground border-transparent",
    "pending": "bg-crimson/20 text-crimson border-crimson/40",
};
export const StatusPill = ({ status, className }) => {
    const { t } = useI18n();
    return (<span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide", styles[status], className)}>
      <span className="size-1.5 rounded-full bg-current opacity-80"/>
      {t(`status.${status}`)}
    </span>);
};
