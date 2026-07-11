import { useMemo, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { ClipboardList, Filter, Plus, Search } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
const TasksPage = ({ role }) => {
    const { t } = useI18n();
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const allTasks = useMemo(() => [], []);
    const filters = [
        { key: "all", labelKey: "tasks.filter.all" },
        { key: "not-started", labelKey: "status.not-started" },
        { key: "in-progress", labelKey: "status.in-progress" },
        { key: "pending", labelKey: "status.pending" },
        { key: "complete", labelKey: "status.complete" },
        { key: "verified", labelKey: "status.verified" },
    ];
    const visible = allTasks.filter((tk) => {
        if (filter !== "all" && tk.status !== filter)
            return false;
        if (query && !t(tk.titleKey).toLowerCase().includes(query.toLowerCase()))
            return false;
        return true;
    });
    const counts = {
        total: allTasks.length,
        open: allTasks.filter((t) => t.status === "not-started" || t.status === "in-progress").length,
        pending: allTasks.filter((t) => t.status === "pending").length,
        done: allTasks.filter((t) => t.status === "complete" || t.status === "verified").length,
    };
    return (<div className="min-h-screen flex bg-background">
      <AppSidebar role={role}/>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name={role === "leader" ? "Tony Maalouf" : "Elias Khoury"} rank={role === "leader" ? t("rank.subleader") : t("rank.senior")} subgroup={t("groups.scouts.name")} initials={role === "leader" ? "TM" : "EK"}/>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
                <ClipboardList className="inline size-3 me-2 -mt-0.5"/>
                {role === "leader" ? t("tasks.kicker.leader") : t("tasks.kicker.member")}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl">
                {role === "leader" ? t("tasks.title.leader") : t("tasks.title.member")}
              </h1>
              <p className="text-muted-foreground mt-2">{t("tasks.intro")}</p>
            </div>
            {role === "leader" && (<Button variant="hero" size="sm">
                <Plus /> {t("ld.assign")}
              </Button>)}
          </div>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
            { label: t("tasks.stat.total"), value: counts.total },
            { label: t("tasks.stat.open"), value: counts.open },
            { label: t("tasks.stat.pending"), value: counts.pending },
            { label: t("tasks.stat.done"), value: counts.done },
        ].map((s) => (<div key={s.label} className="relative rounded-lg border border-border bg-card p-5 shadow-card overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"/>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
                <p className="font-serif text-4xl gold-text mt-2">{s.value}</p>
              </div>))}
          </section>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"/>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("tasks.search")} className="w-full bg-card border border-border rounded-md ps-10 pe-3 py-2 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"/>
            </div>
            <div className="flex items-center gap-1.5 text-xs flex-wrap">
              <Filter className="size-3.5 text-muted-foreground me-1"/>
              {filters.map((f) => (<button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1.5 rounded-full border transition-colors ${filter === f.key
                ? "border-gold/60 bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"}`}>
                  {t(f.labelKey)}
                </button>))}
            </div>
          </div>

          <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {visible.length === 0 ? (
              <div className="sm:col-span-2 xl:col-span-3 rounded-2xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
                {t("tasks.emptyTasks")}
              </div>
            ) : (
              visible.map((tk) => (<TaskCard key={tk.id} id={tk.id} title={t(tk.titleKey)} dueDate={tk.dueDate} status={tk.status} subgroup={role === "leader" ? tk.assignee : t("groups.scouts.name")}/>
            )))}
          </section>
        </main>
      </div>
    </div>);
};
export default TasksPage;
