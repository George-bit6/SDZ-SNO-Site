import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
export const TaskCard = ({ id, title, subgroup, level, status, task, onOpen }) => {
    const { t } = useI18n();
    return (<article className="group relative overflow-hidden rounded-2xl border-black/5 border shadow-[0_0_6px_rgba(0,0,0,0.1)] border-border bg-card p-5 glow-hover">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"/>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {level && (<span className="text-xs uppercase tracking-wider text-muted-foreground">
                {level}
              </span>)}
            {subgroup && level && (<span className="text-xs text-muted-foreground">·</span>)}
            {subgroup && (<span className="text-xs uppercase tracking-wider text-muted-foreground">
                {subgroup}
              </span>)}
          </div>
          <h3 className="font-serif text-xl font-semibold leading-snug mb-2">{title}</h3>
        </div>
        <Button size="sm" variant="ghost" className="text-gold hover:text-gold hover:bg-gold/10" onClick={() => onOpen(task)}>
          {t("task.open")} <ChevronRight className="size-4 rtl-flip"/>
        </Button>
      </div>
    </article>);
};
