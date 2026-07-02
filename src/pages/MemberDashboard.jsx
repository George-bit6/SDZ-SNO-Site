import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { ProgressRing } from "@/components/ProgressRing";
import { TaskCard } from "@/components/TaskCard";
import { BadgeMedallion } from "@/components/BadgeMedallion";
import { Award, Calendar, Compass, Flag, Flame, HandHeart, Tent, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScoutMember from "../processes/members";

const fallbackTasks = [
    { id: "1", task_id: "task.t1", task_status: "in-progress" },
    { id: "2", task_id: "task.t2", task_status: "not-started" },
    { id: "3", task_id: "task.t3", task_status: "pending" },
];

const normalizeTaskTitleKey = (rawKey) => {
    if (!rawKey) {
        return "task.t1";
    }

    return rawKey.startsWith("task.") ? rawKey : `task.${rawKey}`;
};

const MemberDashboard = () => {
    const { t } = useI18n();
    const { memberId } = useParams();
    const [member, setMember] = useState(null);
    const [tasks, setTasks] = useState(fallbackTasks);

    useEffect(() => {
        let isMounted = true;

        const loadMember = async () => {
            if (!memberId) {
                setMember(null);
                setTasks(fallbackTasks);
                return;
            }

            const memberInstance = new ScoutMember();
            const memberData = await memberInstance.getMemberById(memberId);
            console.log("MemberDashboard memberData:", memberData);

            if (!isMounted) {
                return;
            }

            setMember(memberData);

            if (memberData) {
                const memberTasks = await memberData.getTasks();
                console.log("MemberDashboard tasks:", memberTasks);
                setTasks(Array.isArray(memberTasks) && memberTasks.length > 0 ? memberTasks : fallbackTasks);
            } else {
                setTasks(fallbackTasks);
            }
        };

        loadMember();

        return () => {
            isMounted = false;
        };
    }, [memberId]);

    const taskList = tasks.map(task => ({
        id: task.id ?? task.task_id,
        titleKey: normalizeTaskTitleKey(task.task_id ?? task.titleKey ?? task.taskKey),
        status: task.task_status ?? task.status ?? "not-started"
    }));
        
      const badges = [
        { icon: Flame, key: "badge.firekeeper" },
        { icon: HandHeart, key: "badge.service" },
        { icon: Compass, key: "badge.navigator" },
        { icon: Tent, key: "badge.camper" },
        { icon: TreePine, key: "badge.naturalist" },
        { icon: Award, key: "badge.honor", earned: false },
        { icon: Flag, key: "badge.leader", earned: false },
    ];
    const events = [
        { day: "03", monthKey: "evt.month.may", titleKey: "evt.assembly", timeKey: "evt.time.morning" },
        { day: "10", monthKey: "evt.month.may", titleKey: "evt.outreach", timeKey: "evt.time.allday" },
        { day: "17", monthKey: "evt.month.may", titleKey: "evt.camping", timeKey: "evt.time.weekend" },
    ];
    const activity = [
        { whoKey: "act.leaderTony", whatKey: "act.a1", whenKey: "act.t.2h" },
        { whoKey: "act.you", whatKey: "act.a2", whenKey: "act.t.1d" },
        { whoKey: "act.leaderMaya", whatKey: "act.a3", whenKey: "act.t.3d" },
    ];
    return (<div className="min-h-screen flex bg-background">
      <AppSidebar role="member"/>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name="Elias Khoury" rank={t("rank.senior")} subgroup={t("groups.scouts.name")} initials="EK"/>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="mb-10 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">{t("mem.kicker")}</p>
            <h1 className="font-serif text-4xl md:text-5xl">
              {t("mem.welcome", { name: "Elias" })}
            </h1>
            <p className="text-muted-foreground mt-2">
              {memberId ? `${t("mem.intro")} (ID: ${memberId})` : t("mem.intro")}
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-10">
              <section className="rounded-2xl border-black/5 border shadow-[0_0_6px_rgba(0,0,0,0.1)]  border-border bg-card overflow-hidden ">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"/>
                <div className="grid md:grid-cols-[auto_1fr] gap-8 p-8 items-center ">
                  <ProgressRing value={99} label={t("mem.honor")}/>
                  <div className="grid grid-cols-3 gap-4 ">
                    {[
            { label: t("mem.stat.badges"), value: "12" },
            { label: t("mem.stat.tasks"), value: "47" },
            { label: t("mem.stat.hours"), value: "84" },
        ].map((s) => (<div key={s.label} className="rounded-xl border-black/10 border shadow-[0_0_4px_rgba(0,0,0,0.1)]  bg-background border-border  p-4">
                        <p className="font-serif text-3xl text-green-700">{s.value}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                          {s.label}
                        </p>
                      </div>))}
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-baseline justify-between mb-5">
                  <h2 className="font-serif text-2xl">{t("mem.missions")}</h2>
                  <a href="#" className="text-xs uppercase tracking-wider text-gold hover:underline">{t("mem.viewAll")}</a>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {taskList.map((tk) => (<TaskCard key={tk.id} id={tk.id} title={t(tk.titleKey)} status={tk.status} subgroup={t("groups.scouts.name")}/>))}
                </div>
              </section>

              <section>
                <div className="flex items-baseline justify-between mb-5">
                  <h2 className="font-serif text-2xl">{t("mem.medallions")}</h2>
                  <span className="text-xs text-muted-foreground">{t("mem.medallions.note")}</span>
                </div>
                <div className="rounded-lg border border-border bg-card p-6 shadow-card">
                  <div className="flex gap-6 overflow-x-auto pb-2 -mx-2 px-2">
                    {badges.map((b) => (<div key={b.key} className="shrink-0">
                        <BadgeMedallion icon={b.icon} label={t(b.key)} earned={"earned" in b ? b.earned : true}/>
                      </div>))}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-5">{t("mem.activity")}</h2>
                <ol className="relative border-s border-border ms-2 space-y-5">
                  {activity.map((a, i) => (<li key={i} className="ps-6 relative">
                      <span className="absolute -start-[5px] top-1.5 size-2.5 rounded-full bg-gold shadow-glow"/>
                      <p className="text-sm">
                        <span className="font-medium text-gold">{t(a.whoKey)}</span>{" "}
                        <span className="text-muted-foreground">{t(a.whatKey)}</span>
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">{t(a.whenKey)}</p>
                    </li>))}
                </ol>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-lg border border-border bg-card shadow-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="size-4 text-gold"/>
                  <h3 className="font-serif text-lg">{t("mem.upcoming")}</h3>
                </div>
                <ul className="space-y-3">
                  {events.map((e) => (<li key={e.titleKey} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                      <div className="shrink-0 text-center w-12">
                        <p className="font-serif text-lg leading-none gold-text">{e.day}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{t(e.monthKey)}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-tight">{t(e.titleKey)}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{t(e.timeKey)}</p>
                      </div>
                    </li>))}
                </ul>
                <Button variant="gold-outline" size="sm" className="w-full mt-4">{t("mem.viewCalendar")}</Button>
              </div>

              <div className="relative rounded-lg border border-gold/30 bg-gradient-to-br from-secondary/40 to-card p-6 overflow-hidden">
                <div className="ornament-border py-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3 text-center">{t("side.oathTitle")}</p>
                  <p className="text-sm text-center leading-relaxed text-foreground/90">
                    {t("mem.oathBody")}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>);
};
export default MemberDashboard;
