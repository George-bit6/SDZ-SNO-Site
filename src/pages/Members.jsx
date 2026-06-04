import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Crest } from "@/components/Crest";
import { Button } from "@/components/ui/button";
import { Mail, MoreHorizontal, Plus, Search, Users } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useState } from "react";
const MEMBERS = [
    { name: "Maya Saliba", initials: "MS", rank: "rank.patrol", group: "groups.scouts.name", email: "maya@antiochscouts.org", honor: 942, badges: 14, hours: 96, progress: 93, status: "active" },
    { name: "Elias Khoury", initials: "EK", rank: "rank.senior", group: "groups.scouts.name", email: "elias@antiochscouts.org", honor: 878, badges: 12, hours: 84, progress: 75, status: "active" },
    { name: "Lara Chaoul", initials: "LC", rank: "rank.patrol", group: "groups.guides.name", email: "lara@antiochscouts.org", honor: 845, badges: 11, hours: 79, progress: 85, status: "active" },
    { name: "Nour Tannous", initials: "NT", rank: "rank.senior", group: "groups.pioneers.name", email: "nour@antiochscouts.org", honor: 802, badges: 10, hours: 71, progress: 73, status: "active" },
    { name: "Anton Haddad", initials: "AH", rank: "rank.scout", group: "groups.scouts.name", email: "anton@antiochscouts.org", honor: 690, badges: 8, hours: 58, progress: 40, status: "inactive" },
    { name: "Sami Boutros", initials: "SB", rank: "rank.scout", group: "groups.cubs.name", email: "sami@antiochscouts.org", honor: 612, badges: 7, hours: 49, progress: 22, status: "active" },
    { name: "Rita Azar", initials: "RA", rank: "rank.scout", group: "groups.guides.name", email: "rita@antiochscouts.org", honor: 578, badges: 6, hours: 42, progress: 55, status: "active" },
    { name: "Joseph Saade", initials: "JS", rank: "rank.scout", group: "groups.cubs.name", email: "joseph@antiochscouts.org", honor: 540, badges: 6, hours: 38, progress: 48, status: "active" },
];
const GROUPS = ["all", "groups.cubs.name", "groups.scouts.name", "groups.guides.name", "groups.pioneers.name"];
const Members = () => {
    const { t } = useI18n();
    const [q, setQ] = useState("");
    const [group, setGroup] = useState("all");
    const filtered = MEMBERS.filter((m) => {
        const matchesQ = m.name.toLowerCase().includes(q.toLowerCase());
        const matchesG = group === "all" || m.group === group;
        return matchesQ && matchesG;
    });
    const stats = [
        { label: t("mbr.stat.total"), value: MEMBERS.length },
        { label: t("mbr.stat.active"), value: MEMBERS.filter((m) => m.status === "active").length },
        { label: t("mbr.stat.honor"), value: MEMBERS.reduce((s, m) => s + m.honor, 0) },
        { label: t("mbr.stat.hours"), value: MEMBERS.reduce((s, m) => s + m.hours, 0) },
    ];
    return (<div className="min-h-screen flex bg-background">
      <AppSidebar role="leader"/>
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name="Tony Maalouf" rank={t("rank.subleader")} subgroup={t("groups.scouts.name")} initials="TM"/>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4 animate-fade-up">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
                <Users className="inline size-3 me-2 -mt-0.5"/>
                {t("mbr.kicker")}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl">{t("mbr.title")}</h1>
              <p className="text-muted-foreground mt-2">{t("mbr.intro")}</p>
            </div>
            <Button variant="hero" size="sm">
              <Plus /> {t("mbr.invite")}
            </Button>
          </div>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (<div key={s.label} className="relative rounded-lg border border-border bg-card p-5 shadow-card overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"/>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
                <p className="font-serif text-4xl gold-text mt-2">{s.value}</p>
              </div>))}
          </section>

          <section className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
            <header className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-gold"/>
                <h2 className="font-serif text-xl">{t("ld.members")}</h2>
                <span className="text-xs text-muted-foreground">· {filtered.length}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute top-1/2 -translate-y-1/2 start-2.5 size-3.5 text-muted-foreground"/>
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("ld.searchMembers")} className="bg-background border border-border rounded-md ps-8 pe-3 py-1.5 text-xs w-56 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"/>
                </div>
                <div className="flex gap-1">
                  {GROUPS.map((g) => (<button key={g} onClick={() => setGroup(g)} className={`text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-md border transition-colors ${group === g
                ? "border-gold text-gold bg-gold/10"
                : "border-border text-muted-foreground hover:text-foreground"}`}>
                      {g === "all" ? t("tasks.filter.all") : t(g)}
                    </button>))}
                </div>
              </div>
            </header>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-background/50">
                  <tr className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <th className="py-3 px-6 font-medium text-start">{t("ld.col.member")}</th>
                    <th className="py-3 px-2 font-medium text-start">{t("lb.col.group")}</th>
                    <th className="py-3 px-2 font-medium text-start">{t("ld.col.progress")}</th>
                    <th className="py-3 px-2 font-medium text-end">{t("mem.stat.badges")}</th>
                    <th className="py-3 px-2 font-medium text-end">{t("lb.honor")}</th>
                    <th className="py-3 px-6 font-medium text-end">{t("ld.col.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (<tr key={m.name} className="border-t border-border hover:bg-background/40 transition-colors">
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-3">
                          <Crest initials={m.initials} variant="muted" className="size-9"/>
                          <div className="min-w-0">
                            <p className="font-medium leading-tight">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{t(m.rank)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-xs text-muted-foreground">{t(m.group)}</td>
                      <td className="py-3 px-2 min-w-[160px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full bg-gradient-gold" style={{ width: `${m.progress}%` }}/>
                          </div>
                          <span className="text-xs w-9 text-end text-muted-foreground">{m.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-end text-muted-foreground">{m.badges}</td>
                      <td className="py-3 px-2 text-end">
                        <span className="font-serif text-base gold-text">{m.honor}</span>
                      </td>
                      <td className="py-3 px-6 text-end">
                        <Button size="icon" variant="ghost" className="size-8" title={m.email}>
                          <Mail className="size-4"/>
                        </Button>
                        <Button size="icon" variant="ghost" className="size-8">
                          <MoreHorizontal className="size-4"/>
                        </Button>
                      </td>
                    </tr>))}
                  {filtered.length === 0 && (<tr>
                      <td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                        {t("tasks.empty")}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>);
};
export default Members;
