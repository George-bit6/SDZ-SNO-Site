import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { ProgressRing } from "@/components/ProgressRing";
import { TaskCard } from "@/components/TaskCard";
import { BadgeMedallion } from "@/components/BadgeMedallion";
import { Award, Calendar, Compass, Flag, Flame, HandHeart, Tent, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { useEffect, useState } from "react";
import { useMemberData } from "@/hooks/useMemberData";
import { getAccentColorBySubgroupId } from "@/utils/accentColors";
import DashboardPageTitle from "@/components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "@/components/dashboardComponents/StatisticCards";

const normalizeTaskTitleKey = (rawKey) => {
    if (!rawKey) {
        return "task.t1";
    }

    return rawKey.startsWith("task.") ? rawKey : `task.${rawKey}`;
};

const MemberDashboard = () => {
    const { t } = useI18n();
    const { data: memberData, isLoading } = useMemberData();
    const [accentColor, setAccentColor] = useState('#4A7DFF'); // Default blue
    const [ringValue, setRingValue] = useState(0);
    const [attendanceStreak, setAttendanceStreak] = useState(0);
    const events = [];
    
    useEffect(() => {
        if (memberData?.subgroupId) {
            const subgroupAccentColor = getAccentColorBySubgroupId(memberData.subgroupId);
            setAccentColor(subgroupAccentColor || '#4A7DFF');
        }
    }, [memberData?.subgroupId]);

    const stats = memberData ? [
        /*{ label: "Badges Earned", value: memberData.scores.badges.toString(), delta:'TO BE ADDED' , color: accentColor || '#4A7DFF' },*/
        { label: "Tasks Completed", value: memberData.tasks.filter(t => t.task_status === 'complete' || t.task_status === 'verified').length.toString(), color: "#4A7DFF" },
         ] : [];

    const taskList = memberData?.tasks?.map(task => ({
        id: task.task_name,
        titleKey: normalizeTaskTitleKey(task.task_name),
        status: task.task_status ?? "not-started"
    })) || [];


    
    
    return (<div className="min-h-screen flex bg-[#F4F6FB]">
      <AppSidebar role="member" accentColor={accentColor}/>

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-0">
        <Topbar name={memberData?.fullName || "Unknown"} rank={t("rank.senior")} subgroup={memberData?.unitName || t("groups.scouts.name")} initials={memberData?.initials || "UK"} accentColor={accentColor}/>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <DashboardPageTitle
            title={t("mem.welcome", { name: memberData?.fullName || "Unknown" })}
            subtitle={t("mem.kicker")}
            accentColor={accentColor}
          />

          <StatisticCards stats={stats} accentColor={accentColor} />

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-10">
              <section className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden ">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4A7DFF]/20 to-transparent"/>
                <div className="grid md:grid-cols-[auto_1fr] gap-8 p-8 items-center ">
                  <ProgressRing value={ringValue} label={"level progress"}/>
                  <div className="grid grid-cols-3 gap-4 ">
                    {[
            { label: "Attendance Streak", value: attendanceStreak },
            
        ].map((s) => (<div key={s.label} className="rounded-xl border border-[#E8ECF4] bg-[#F4F6FB] p-4">
                        <p className="text-[20px] font-bold text-[#4A7DFF]">{s.value}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A94A6] mt-1">
                          {s.label}
                        </p>
                      </div>))}
                  </div>
                </div>
              </section>
{/*

        Will include Badges that are fetched from the badges_members table that wil be later added


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
              */
              }
              {/*
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
              
              Will be added later when all else is done, it will showcase completed tasks
              
              */
                }
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
