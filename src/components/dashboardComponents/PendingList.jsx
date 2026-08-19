import {Check, Clock} from "lucide-react";
import {Button} from "@/components/ui/button";
import {StatusPill} from "@/components/StatusPill";
import { useI18n } from "@/i18n/I18nProvider";

export default function PendingList(props) {
const {t} = useI18n();

  return (
    <section className="rounded-lg border-black/5 border shadow-[0_0_6px_rgba(0,0,0,0.1)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg flex items-center gap-2">
          <Clock className="size-4 " style={{color: props.accentColor}} />
          {"No Reviews"}
        </h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-crimson/20 text-crimson">
          {props.reviews.length}
        </span>
      </div>
      {props.reviews.length > 0 ? (
        <ul className="space-y-3">
          {props.reviews.map((r) => (
            <li
              key={r.name + r.task}
              className="rounded-md border border-border bg-background p-3"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{r.task}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {r.name} · {r.time}
                  </p>
                </div>
                <StatusPill status="pending" />
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="gold"
                  className="h-7 px-3 text-xs flex-1"
                >
                  <Check className="size-3" /> {t("ld.approve")}
                </Button>
                <Button size="sm" variant="ghost" className="h-7 px-3 text-xs">
                  {t("ld.requestChanges")}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
          {t("ld.emptyReviews")}
        </div>
      )}
    </section>
  );
}
