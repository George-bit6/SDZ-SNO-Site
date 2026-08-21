import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Crest } from "@/components/Crest";
import { Award, Crown, Medal, Trophy } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { memberDataService } from "@/services/memberDataService";
import { getAccentColorBySubgroupId } from "@/utils/accentColors";
import DashboardPageTitle from "@/components/dashboardComponents/DashboardPageTitle";

const ROWS = [];
const podiumIcon = [Crown, Trophy, Medal];
const podiumColor = ["text-[#FFC107]", "text-[#8A94A6]", "text-[#FF5C5C]"];

const LeaderboardPage = ({ role }) => {
    const { t } = useI18n();
    const { memberId } = useParams();
    const [rows, setRows] = useState([]);
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accentColor, setAccentColor] = useState('#4A7DFF'); // Default blue

    useEffect(() => {
        let isMounted = true;

        const loadLeaderboardData = async () => {
            if (!memberId) {
                setRows([]);
                setMember(null);
                setLoading(false);
                setAccentColor('#4A7DFF');
                return;
            }

            try {
                setLoading(true);
                
                // Load member data
                const memberData = await memberDataService.getMemberById(memberId);
                if (isMounted && memberData) {
                    // Calculate accent color based on subgroup first
                    const subgroupAccentColor = getAccentColorBySubgroupId(memberData.subgrp_id);
                    setAccentColor(subgroupAccentColor);

                    const formattedMember = memberDataService.formatMemberData(memberData);
                    setMember(formattedMember);
                }

                // Load members from same subgroup for leaderboard
                if (memberData?.subgrp_id) {
                    const subgroupMembers = await memberDataService.getMembersBySubgroup(memberData.subgrp_id);
                    if (isMounted && subgroupMembers) {
                        // Format and sort by honor points (this would need to be implemented in the database)
                        const formattedMembers = subgroupMembers
                            .map(m => memberDataService.formatMemberData(m))
                            .sort((a, b) => (b.honorPoints || 0) - (a.honorPoints || 0));
                        setRows(formattedMembers);
                    }
                }
            } catch (error) {
                console.error("Error loading leaderboard data:", error);
                if (isMounted) {
                    setRows([]);
                    setMember(null);
                    setAccentColor('#4A7DFF');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadLeaderboardData();

        return () => {
            isMounted = false;
        };
    }, [memberId]);

    const top3 = rows.slice(0, 3);
    const rest = rows.slice(3);

    return (
        <div className="min-h-screen flex bg-[#F4F6FB]">
            <AppSidebar role={role} accentColor={accentColor}/>

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-0">
                <Topbar 
                    name={member?.fullName || "Loading..."} 
                    rank={t("rank.senior")} 
                    subgroup={member?.unitName || t("groups.scouts.name")} 
                    initials={member?.initials || "UK"}
                    accentColor={accentColor}
                />

                <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
                    <DashboardPageTitle
                        title={t("lb.title")}
                        subtitle={t("lb.kicker")}
                        accentColor={accentColor}
                    />

                    <section className="grid md:grid-cols-3 gap-4 mb-10">
                        {top3.length > 0 ? (
                            top3.map((m, i) => {
                                const Icon = podiumIcon[i];
                                const order = i === 0 ? "md:order-2" : i === 1 ? "md:order-1" : "md:order-3";
                                const scale = i === 0 ? "md:scale-105" : "";
                                return (
                                    <article key={m.id} className={`relative rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6 text-center overflow-hidden ${order} ${scale}`}>
                                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4A7DFF]/20 to-transparent" style={{background: `linear-gradient(to right, transparent, ${accentColor}33, transparent)`}}/>
                                        <div className={`mx-auto mb-3 flex items-center justify-center size-10 rounded-full bg-[#F4F6FB] border border-[#E8ECF4] ${podiumColor[i]}`}>
                                            <Icon className="size-5"/>
                                        </div>
                                        <Crest initials={m.initials} className="size-16 mx-auto mb-3"/>
                                        <p className="text-[18px] font-semibold leading-tight text-[#1E2A45]">{m.fullName}</p>
                                        <p className="text-xs text-[#8A94A6] mt-0.5">{m.unitTitle || "Scout"} · {m.unitName || "Unit"}</p>
                                        <p className="text-[20px] font-bold text-[#4A7DFF] mt-4">{m.honorPoints || 0}</p>
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A94A6] mt-1">{t("lb.honor")}</p>
                                    </article>
                                );
                            })
                        ) : (
                            <div className="md:col-span-3 rounded-[20px] border border-dashed border-[#E8ECF4] bg-[#F4F6FB]/60 p-6 text-center text-sm text-[#8A94A6]">
                                {t("lb.emptyLeaderboard")}
                            </div>
                        )}
                    </section>

                    <section className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                        <header className="px-6 py-4 border-b border-[#E8ECF4] flex items-center gap-2">
                            <Trophy className="size-4 text-[#4A7DFF]"/>
                            <h2 className="text-[18px] font-semibold text-[#253858]">{t("lb.standings")}</h2>
                        </header>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[#F4F6FB]/50">
                                    <tr className="text-[10px] uppercase tracking-[0.2em] text-[#8A94A6]">
                                        <th className="py-3 px-6 font-medium text-start w-12">#</th>
                                        <th className="py-3 px-2 font-medium text-start">{t("ld.col.member")}</th>
                                        <th className="py-3 px-2 font-medium text-start">{t("lb.col.group")}</th>
                                        <th className="py-3 px-2 font-medium text-end">{t("mem.stat.badges")}</th>
                                        <th className="py-3 px-2 font-medium text-end">{t("mem.stat.hours")}</th>
                                        <th className="py-3 px-6 font-medium text-end">{t("lb.honor")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rest.map((m, i) => (
                                        <tr key={m.id} className="border-t border-[#E8ECF4] hover:bg-[#F4F6FB]/40 transition-colors">
                                            <td className="py-3 px-6 text-[#8A94A6]">{i + 4}</td>
                                            <td className="py-3 px-2">
                                                <div className="flex items-center gap-3">
                                                    <Crest initials={m.initials} variant="muted" className="size-9"/>
                                                    <div>
                                                        <p className="font-medium leading-tight text-[#1E2A45]">{m.fullName}</p>
                                                        <p className="text-xs text-[#8A94A6]">{m.unitTitle || "Scout"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.unitName || "Unit"}</td>
                                            <td className="py-3 px-2 text-end text-[#8A94A6]">{m.badges || 0}</td>
                                            <td className="py-3 px-2 text-end text-[#8A94A6]">{m.serviceHours || 0}</td>
                                            <td className="py-3 px-6 text-end">
                                                <span className="text-[20px] font-bold text-[#4A7DFF]">{m.honorPoints || 0}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LeaderboardPage;
