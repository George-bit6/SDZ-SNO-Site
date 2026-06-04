import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Crest } from "@/components/Crest";
import { Award, Crown, Medal, Trophy } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
const ROWS = [
    { name: "Maya Saliba", initials: "MS", rank: "rank.patrol", honor: 942, badges: 14, hours: 96, group: "groups.scouts.name" },
    { name: "Elias Khoury", initials: "EK", rank: "rank.senior", honor: 878, badges: 12, hours: 84, group: "groups.scouts.name" },
    { name: "Lara Chaoul", initials: "LC", rank: "rank.patrol", honor: 845, badges: 11, hours: 79, group: "groups.guides.name" },
    { name: "Nour Tannous", initials: "NT", rank: "rank.senior", honor: 802, badges: 10, hours: 71, group: "groups.pioneers.name" },
    { name: "Anton Haddad", initials: "AH", rank: "rank.scout", honor: 690, badges: 8, hours: 58, group: "groups.scouts.name" },
    { name: "Sami Boutros", initials: "SB", rank: "rank.scout", honor: 612, badges: 7, hours: 49, group: "groups.cubs.name" },
    { name: "Rita Azar", initials: "RA", rank: "rank.scout", honor: 578, badges: 6, hours: 42, group: "groups.guides.name" },
    { name: "Joseph Saade", initials: "JS", rank: "rank.scout", honor: 540, badges: 6, hours: 38, group: "groups.cubs.name" },
];
const podiumIcon = [Crown, Trophy, Medal];
const podiumColor = ["text-gold", "text-foreground/80", "text-crimson"];
const LeaderboardPage = ({ role }) => {
    const { t } = useI18n();
    const top3 = ROWS.slice(0, 3);
    const rest = ROWS.slice(3);
    return (<div className="min-h-screen flex bg-background">
      <AppSidebar role={role}/>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name={role === "leader" ? "Tony Maalouf" : "Elias Khoury"} rank={role === "leader" ? t("rank.subleader") : t("rank.senior")} subgroup={t("groups.scouts.name")} initials={role === "leader" ? "TM" : "EK"}/>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="mb-10 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
              <Award className="inline size-3 me-2 -mt-0.5"/>
              {t("lb.kicker")}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl">{t("lb.title")}</h1>
            <p className="text-muted-foreground mt-2">{t("lb.intro")}</p>
          </div>

          <section className="grid md:grid-cols-3 gap-4 mb-10">
            {top3.map((m, i) => {
            const Icon = podiumIcon[i];
            const order = i === 0 ? "md:order-2" : i === 1 ? "md:order-1" : "md:order-3";
            const scale = i === 0 ? "md:scale-105" : "";
            return (<article key={m.name} className={`relative rounded-lg border border-border bg-card p-6 shadow-card text-center overflow-hidden ${order} ${scale}`}>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"/>
                  <div className={`mx-auto mb-3 flex items-center justify-center size-10 rounded-full bg-background border border-border ${podiumColor[i]}`}>
                    <Icon className="size-5"/>
                  </div>
                  <Crest initials={m.initials} className="size-16 mx-auto mb-3"/>
                  <p className="font-serif text-lg leading-tight">{m.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(m.rank)} · {t(m.group)}</p>
                  <p className="font-serif text-4xl gold-text mt-4">{m.honor}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{t("lb.honor")}</p>
                </article>);
        })}
          </section>

          <section className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
            <header className="px-6 py-4 border-b border-border flex items-center gap-2">
              <Trophy className="size-4 text-gold"/>
              <h2 className="font-serif text-xl">{t("lb.standings")}</h2>
            </header>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-background/50">
                  <tr className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <th className="py-3 px-6 font-medium text-start w-12">#</th>
                    <th className="py-3 px-2 font-medium text-start">{t("ld.col.member")}</th>
                    <th className="py-3 px-2 font-medium text-start">{t("lb.col.group")}</th>
                    <th className="py-3 px-2 font-medium text-end">{t("mem.stat.badges")}</th>
                    <th className="py-3 px-2 font-medium text-end">{t("mem.stat.hours")}</th>
                    <th className="py-3 px-6 font-medium text-end">{t("lb.honor")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rest.map((m, i) => (<tr key={m.name} className="border-t border-border hover:bg-background/40 transition-colors">
                      <td className="py-3 px-6 text-muted-foreground">{i + 4}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <Crest initials={m.initials} variant="muted" className="size-9"/>
                          <div>
                            <p className="font-medium leading-tight">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{t(m.rank)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-xs text-muted-foreground">{t(m.group)}</td>
                      <td className="py-3 px-2 text-end text-muted-foreground">{m.badges}</td>
                      <td className="py-3 px-2 text-end text-muted-foreground">{m.hours}</td>
                      <td className="py-3 px-6 text-end">
                        <span className="font-serif text-lg gold-text">{m.honor}</span>
                      </td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>);
};
export default LeaderboardPage;
