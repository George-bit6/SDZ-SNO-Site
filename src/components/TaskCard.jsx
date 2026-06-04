import { Calendar, ChevronRight } from "lucide-react";
import { StatusPill } from "./StatusPill";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
export const TaskCard = ({ id, title, subgroup, dueDate, status }) => {
    const { t } = useI18n();
    return (<article className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 shadow-card glow-hover">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"/>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <StatusPill status={status}/>
            {subgroup && (<span className="text-xs uppercase tracking-wider text-muted-foreground">
                {subgroup}
              </span>)}
          </div>
          <h3 className="font-serif text-xl font-semibold leading-snug mb-2">{title}</h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="size-3.5"/>
            <span>{t("task.due", { date: dueDate })}</span>
          </div>
        </div>
        <Button asChild size="sm" variant="ghost" className="text-gold hover:text-gold hover:bg-gold/10">
          <Link to={`/task/${id}`}>
            {t("task.open")} <ChevronRight className="size-4 rtl-flip"/>
          </Link>
        </Button>
      </div>
    </article>);
};
