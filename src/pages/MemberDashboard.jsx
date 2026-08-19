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
import DashboardPageTitle from "../components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "../components/dashboardComponents/StatisticCards";

const fallbackTasks = [];

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
        status: task.task_status ?? "not-started"
    }));

    // Sample stats for the design system
    const stats = [
        { label: "Badges Earned", value: "12", delta: "+2 this month", color: "#FFC107" },
        { label: "Tasks Completed", value: "47", delta: "8 remaining", color: "#4A7DFF" },
        { label: "Service Hours", value: "84", delta: "+12 this season", color: "#34D399" },
        { label: "Honor Points", value: "99", delta: "Top 10%", color: "#FF5C5C", progress: 99 },
    ];

    /*  const badges = [
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
    ]; */

    const badges = [];
    const events = [];
    const activity = [];

    return (<div className="min-h-screen flex bg-[#F4F6FB]">
      <AppSidebar role="member"/>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name={member?.getMemberName() || "Unknown"} rank={t("rank.senior")} subgroup={t("groups.scouts.name")} initials="EK"/>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <DashboardPageTitle
            title={t("mem.welcome", { name: member?.getMemberName() || "Unknown" })}
            subtitle={t("mem.kicker")}
            accentColor="#4A7DFF"
          />

          <StatisticCards stats={stats} accentColor="#4A7DFF" />

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-10">
              <section className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden ">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4A7DFF]/20 to-transparent"/>
                <div className="grid md:grid-cols-[auto_1fr] gap-8 p-8 items-center ">
                  <ProgressRing value={99} label={t("mem.honor")}/>
                  <div className="grid grid-cols-3 gap-4 ">
                    {[
            { label: t("mem.stat.badges"), value: "12" },
            { label: t("mem.stat.tasks"), value: "47" },
            { label: t("mem.stat.hours"), value: "84" },
        ].map((s) => (<div key={s.label} className="rounded-xl border border-[#E8ECF4] bg-[#F4F6FB] p-4">
                        <p className="text-[20px] font-bold text-[#4A7DFF]">{s.value}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A94A6] mt-1">
                          {s.label}
                        </p>
                      </div>))}
                  </div>
                </div>
              </section>

              <section>
                <div className=" flex items-baseline justify-between mb-5">
                  <h2 className="text-[22px] font-semibold text-[#253858]">{t("mem.missions")}</h2>
                  <a href="#" className="text-xs uppercase tracking-wider text-[#4A7DFF] hover:underline">{t("mem.viewAll")}</a>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {taskList.length > 0 ? (
                    taskList.map((tk) => (
                      <TaskCard
                        key={tk.id}
                        id={tk.id}
                        title={t(tk.titleKey)}
                        status={tk.status}
                        subgroup={t("groups.scouts.name")}
                      />
                    ))
                  ) : (
                    <div className="sm:col-span-2 rounded-[20px] border border-dashed border-[#E8ECF4] bg-[#F4F6FB]/60 p-6 text-center text-sm text-[#8A94A6]">
                      {t("mem.emptyMissions")}
                    </div>
                  )}
                </div>
              </section>

              <section>
                <div className=" flex items-baseline justify-between mb-5">
                  <h2 className="text-[22px] font-semibold text-[#253858]">{t("mem.medallions")}</h2>
                  <span className="text-xs text-[#8A94A6]">{t("mem.medallions.note")}</span>
                </div>
                <div className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6 ">
                  {badges.length > 0 ? (
                    <div className="flex gap-6 overflow-x-auto pb-2 -mx-2 px-2">
                      {badges.map((b) => (
                        <div key={b.key} className="shrink-0">
                          <BadgeMedallion icon={b.icon} label={t(b.key)} earned={"earned" in b ? b.earned : true} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[20px] border border-dashed border-[#E8ECF4] bg-[#F4F6FB]/60 p-6 text-center text-sm text-[#8A94A6]">
                      {t("mem.emptyBadges")}
                    </div>
                  )}
                </div>
              </section>

              <section>
                <h2 className="text-[22px] font-semibold text-[#253858] mb-5">{t("mem.activity")}</h2>
                {activity.length > 0 ? (
                  <ol className="relative border-s border-[#E8ECF4] ms-2 space-y-5">
                    {activity.map((a, i) => (
                      <li key={i} className="ps-6 relative">
                        <span className="absolute -start-[5px] top-1.5 size-2.5 rounded-full bg-[#4A7DFF] shadow-glow" />
                        <p className="text-sm">
                          <span className="font-medium text-[#4A7DFF]">{t(a.whoKey)}</span>{" "}
                          <span className="text-[#8A94A6]">{t(a.whatKey)}</span>
                        </p>
                        <p className="text-xs text-[#8A94A6]/70 mt-0.5">{t(a.whenKey)}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="rounded-[20px] border border-dashed border-[#E8ECF4] bg-[#F4F6FB]/60 p-6 text-center text-sm text-[#8A94A6]">
                    {t("mem.emptyActivity")}
                  </div>
                )}
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="size-4 text-[#4A7DFF]"/>
                  <h3 className="text-[18px] font-semibold text-[#253858]">{t("mem.upcoming")}</h3>
                </div>
                {events.length > 0 ? (
                  <ul className="space-y-3">
                    {events.map((e) => (
                      <li key={e.titleKey} className="flex items-start gap-3 pb-3 border-b border-[#E8ECF4] last:border-0 last:pb-0">
                        <div className="shrink-0 text-center w-12">
                          <p className="text-[18px] font-bold leading-none text-[#4A7DFF]">{e.day}</p>
                          <p className="text-[10px] uppercase tracking-wider text-[#8A94A6] mt-0.5">{t(e.monthKey)}</p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-tight text-[#1E2A45]">{t(e.titleKey)}</p>
                          <p className="text-xs text-[#8A94A6] mt-0.5">{t(e.timeKey)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-[20px] border border-dashed border-[#E8ECF4] bg-[#F4F6FB]/60 p-6 text-center text-sm text-[#8A94A6]">
                    {t("mem.emptyEvents")}
                  </div>
                )}
                <Button variant="ds-secondary" size="sm" className="w-full mt-4">{t("mem.viewCalendar")}</Button>
              </div>

              <div className="relative rounded-[20px] border border-[#E8ECF4] bg-gradient-to-br from-[#EAF1FF]/40 to-white p-6 overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                <div className="ornament-border py-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#4A7DFF] mb-3 text-center">{t("side.oathTitle")}</p>
                  <p className="text-sm text-center leading-relaxed text-[#1E2A45]/90">
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
