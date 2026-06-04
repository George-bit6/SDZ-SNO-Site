import { useMemo, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Crest } from "@/components/Crest";
import { StatusPill } from "@/components/StatusPill";
import { Button } from "@/components/ui/button";
import { Check, Clock, Filter, MessageSquare, Search, Shield, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
const SUBMISSIONS = [
    { id: "r1", member: "Elias Khoury", initials: "EK", rank: "rank.senior", taskKey: "task.t4", category: "rev.cat.service", submittedAt: "act.t.2h", note: "rev.note.1", honor: 40 },
    { id: "r2", member: "Lara Chaoul", initials: "LC", rank: "rank.patrol", taskKey: "task.t3", category: "rev.cat.skill", submittedAt: "act.t.1d", note: "rev.note.2", honor: 25 },
    { id: "r3", member: "Anton Haddad", initials: "AH", rank: "rank.scout", taskKey: "task.t1", category: "rev.cat.faith", submittedAt: "act.t.1d", note: "rev.note.3", honor: 20 },
    { id: "r4", member: "Maya Saliba", initials: "MS", rank: "rank.patrol", taskKey: "task.t2", category: "rev.cat.skill", submittedAt: "act.t.3d", note: "rev.note.4", honor: 30 },
    { id: "r5", member: "Nour Tannous", initials: "NT", rank: "rank.senior", taskKey: "task.t4", category: "rev.cat.service", submittedAt: "act.t.3d", note: "rev.note.1", honor: 40 },
];
const Reviews = () => {
    const { t } = useI18n();
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(SUBMISSIONS[0].id);
    const [decisions, setDecisions] = useState({});
    const pending = useMemo(() => SUBMISSIONS.filter((s) => !decisions[s.id] && (!query || s.member.toLowerCase().includes(query.toLowerCase()) || t(s.taskKey).toLowerCase().includes(query.toLowerCase()))), [query, decisions, t]);
    const selected = SUBMISSIONS.find((s) => s.id === selectedId) ?? pending[0];
    const stats = [
        { label: t("rev.stat.pending"), value: SUBMISSIONS.length - Object.keys(decisions).length },
        { label: t("rev.stat.approved"), value: Object.values(decisions).filter((d) => d === "approved").length },
        { label: t("rev.stat.changes"), value: Object.values(decisions).filter((d) => d === "changes").length },
        { label: t("rev.stat.honor"), value: Object.entries(decisions).reduce((sum, [id, d]) => d === "approved" ? sum + (SUBMISSIONS.find(s => s.id === id)?.honor ?? 0) : sum, 0) },
    ];
    const decide = (id, d) => {
        setDecisions((prev) => ({ ...prev, [id]: d }));
        const remaining = pending.filter((p) => p.id !== id);
        if (remaining.length)
            setSelectedId(remaining[0].id);
    };
    return (<div className="min-h-screen flex bg-background">
      <AppSidebar role="leader"/>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name="Tony Maalouf" rank={t("rank.subleader")} subgroup={t("groups.scouts.name")} initials="TM"/>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="mb-8 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
              <Shield className="inline size-3 me-2 -mt-0.5"/>
              {t("rev.kicker")}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl">{t("rev.title")}</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">{t("rev.intro")}</p>
          </div>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (<div key={s.label} className="relative rounded-lg border border-border bg-card p-5 shadow-card overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"/>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
                <p className="font-serif text-4xl gold-text mt-2">{s.value}</p>
              </div>))}
          </section>

          <div className="grid lg:grid-cols-[380px_1fr] gap-6">
            <section className="rounded-lg border border-border bg-card shadow-card flex flex-col overflow-hidden">
              <header className="px-5 py-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-serif text-lg flex items-center gap-2">
                    <Clock className="size-4 text-gold"/>
                    {t("rev.queue")}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-crimson/20 text-crimson">{pending.length}</span>
                </div>
                <div className="relative">
                  <Search className="absolute top-1/2 -translate-y-1/2 start-3 size-3.5 text-muted-foreground"/>
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("rev.search")} className="w-full bg-background border border-border rounded-md ps-9 pe-3 py-2 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"/>
                </div>
              </header>

              <ul className="flex-1 overflow-y-auto divide-y divide-border">
                {pending.length === 0 && (<li className="p-8 text-center text-sm text-muted-foreground">
                    <Check className="mx-auto size-6 text-gold mb-2"/>
                    {t("rev.allClear")}
                  </li>)}
                {pending.map((s) => {
            const active = s.id === selected?.id;
            return (<li key={s.id}>
                      <button type="button" onClick={() => setSelectedId(s.id)} className={cn("w-full text-start px-5 py-4 transition-colors hover:bg-background/60", active && "bg-background/80 border-s-2 border-gold")}>
                        <div className="flex items-start gap-3">
                          <Crest initials={s.initials} variant="muted" className="size-9 shrink-0"/>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium leading-tight truncate">{t(s.taskKey)}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {s.member} · {t(s.submittedAt)}
                            </p>
                            <div className="mt-2">
                              <StatusPill status="pending"/>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>);
        })}
              </ul>
            </section>

            <section className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
              {selected ? (<article className="flex flex-col h-full">
                  <header className="px-6 py-5 border-b border-border">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-4">
                        <Crest initials={selected.initials} className="size-12"/>
                        <div>
                          <p className="text-xs text-muted-foreground">{selected.member} · {t(selected.rank)}</p>
                          <h3 className="font-serif text-2xl leading-tight mt-0.5">{t(selected.taskKey)}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            <Filter className="inline size-3 me-1 -mt-0.5"/>
                            {t(selected.category)} · {t(selected.submittedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t("rev.honorReward")}</p>
                        <p className="font-serif text-3xl gold-text">+{selected.honor}</p>
                      </div>
                    </div>
                  </header>

                  <div className="flex-1 px-6 py-6 space-y-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">{t("rev.scoutNote")}</p>
                      <div className="rounded-md border border-border bg-background p-4 text-sm leading-relaxed flex gap-3">
                        <MessageSquare className="size-4 text-gold shrink-0 mt-0.5"/>
                        <p>{t(selected.note)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">{t("rev.evidence")}</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[0, 1, 2].map((i) => (<div key={i} className="aspect-square rounded-md border border-border bg-gradient-to-br from-muted/40 to-background flex items-center justify-center text-[10px] uppercase tracking-wider text-muted-foreground">
                            {t("rev.photo")} {i + 1}
                          </div>))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">{t("rev.leaderNote")}</p>
                      <textarea rows={3} placeholder={t("rev.leaderNotePh")} className="w-full bg-background border border-border rounded-md p-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40 resize-none"/>
                    </div>
                  </div>

                  <footer className="px-6 py-4 border-t border-border flex items-center justify-end gap-2 flex-wrap">
                    <Button variant="ghost" size="sm" onClick={() => decide(selected.id, "changes")}>
                      <X className="size-4"/> {t("ld.requestChanges")}
                    </Button>
                    <Button variant="hero" size="sm" onClick={() => decide(selected.id, "approved")}>
                      <Check className="size-4"/> {t("rev.approveAward")} +{selected.honor}
                    </Button>
                  </footer>
                </article>) : (<div className="p-12 text-center text-muted-foreground">
                  <Check className="mx-auto size-8 text-gold mb-3"/>
                  <p className="font-serif text-xl">{t("rev.allClear")}</p>
                  <p className="text-sm mt-1">{t("rev.allClearBody")}</p>
                </div>)}
            </section>
          </div>
        </main>
      </div>
    </div>);
};
export default Reviews;
