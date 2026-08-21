import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Crest } from "@/components/Crest";
import { Button } from "@/components/ui/button";
import { Mail, MoreHorizontal, Plus, Search, Users } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { leaderDataService } from "@/services/leaderDataService";
import { memberDataService } from "@/services/memberDataService";
import { getAccentColorBySubgroupId } from "@/utils/accentColors";
import DashboardPageTitle from "@/components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "@/components/dashboardComponents/StatisticCards";

const MEMBERS = [];
const GROUPS = ["all", "groups.cubs.name", "groups.scouts.name", "groups.guides.name", "groups.pioneers.name"];

const Members = () => {
    const { t } = useI18n();
    const { leaderId } = useParams();
    const [q, setQ] = useState("");
    const [group, setGroup] = useState("all");
    const [members, setMembers] = useState([]);
    const [leader, setLeader] = useState(null);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accentColor, setAccentColor] = useState('#4A7DFF'); // Default blue

    useEffect(() => {
        let isMounted = true;

        const loadMembersData = async () => {
            if (!leaderId) {
                setMembers([]);
                setLeader(null);
                setStats([]);
                setLoading(false);
                setAccentColor('#4A7DFF');
                return;
            }

            try {
                setLoading(true);
                
                // Get subgroup ID first for accent color
                const subgroupId = await leaderDataService.getLeaderSubgroupId(leaderId);
                if (isMounted && subgroupId) {
                    const subgroupAccentColor = getAccentColorBySubgroupId(subgroupId);
                    setAccentColor(subgroupAccentColor);
                }
                
                // Load leader data
                const leaderData = await leaderDataService.getLeaderById(leaderId);
                if (isMounted && leaderData) {
                    setLeader(leaderDataService.formatLeaderData(leaderData));
                }

                // Load leader's members
                const leaderMembers = await leaderDataService.getLeaderMembers(leaderId);
                if (isMounted && leaderMembers) {
                    const formattedMembers = leaderMembers.map(m => memberDataService.formatMemberData(m));
                    setMembers(formattedMembers);
                }

                // Load leader statistics
                const leaderStats = await leaderDataService.getLeaderStats(leaderId);
                if (isMounted) {
                    setStats([
                        { label: t("mbr.stat.total"), value: leaderStats.totalMembers, color: accentColor },
                        { label: t("mbr.stat.active"), value: leaderStats.activeMembers, color: "#34D399" },
                        { label: t("mbr.stat.honor"), value: leaderStats.totalHonorPoints, color: "#FFC107" },
                        { label: t("mbr.stat.hours"), value: leaderStats.totalServiceHours, color: "#FF9F43" },
                    ]);
                }
            } catch (error) {
                console.error("Error loading members data:", error);
                if (isMounted) {
                    setMembers([]);
                    setLeader(null);
                    setStats([]);
                    setAccentColor('#4A7DFF');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadMembersData();

        return () => {
            isMounted = false;
        };
    }, [leaderId]);

    const filtered = members.filter((m) => {
        const matchesQ = (m.fullName || "").toLowerCase().includes(q.toLowerCase());
        const matchesG = group === "all" || (m.unitName || "") === t(group);
        return matchesQ && matchesG;
    });

    return (
        <div className="min-h-screen flex bg-[#F4F6FB]">
            <AppSidebar role="leader"/>
            <div className="flex-1 flex flex-col min-w-0">
                <Topbar 
                    name={leader?.fullName || "Loading..."} 
                    rank={leader?.primaryTitle || t("rank.subleader")} 
                    subgroup={leader?.subgroupName || t("groups.scouts.name")} 
                    initials={leader?.initials || "LD"}
                />

                <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
                    <DashboardPageTitle
                        title={t("mbr.title")}
                        subtitle={t("mbr.kicker")}
                        accentColor="#4A7DFF"
                    >
                        <Button variant="ds-primary" size="sm">
                            <Plus /> {t("mbr.invite")}
                        </Button>
                    </DashboardPageTitle>

                    <StatisticCards stats={stats} accentColor="#4A7DFF" />

                    <section className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                        <header className="px-6 py-4 border-b border-[#E8ECF4] flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <Users className="size-4 text-[#4A7DFF]"/>
                                <h2 className="text-[18px] font-semibold text-[#253858]">{t("ld.members")}</h2>
                                <span className="text-xs text-[#8A94A6]">· {filtered.length}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="relative">
                                    <Search className="absolute top-1/2 -translate-y-1/2 start-2.5 size-3.5 text-[#8A94A6]"/>
                                    <input
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        placeholder={t("ld.searchMembers")}
                                        className="bg-[#F4F6FB] border border-[#E8ECF4] rounded-xl ps-8 pe-3 py-2 text-xs w-56 focus:outline-none focus:border-[#4A7DFF] focus:ring-1 focus:ring-[#4A7DFF]/40"
                                    />
                                </div>
                                <div className="flex gap-1">
                                    {GROUPS.map((g) => (
                                        <button
                                            key={g}
                                            onClick={() => setGroup(g)}
                                            className={`text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-xl border transition-colors ${
                                                group === g
                                                    ? "border-[#4A7DFF] text-[#4A7DFF] bg-[#EAF1FF]"
                                                    : "border-[#E8ECF4] text-[#8A94A6] hover:text-[#1E2A45]"
                                            }`}
                                        >
                                            {g === "all" ? t("tasks.filter.all") : t(g)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </header>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[#F4F6FB]/50">
                                    <tr className="text-[10px] uppercase tracking-[0.2em] text-[#8A94A6]">
                                        <th className="py-3 px-6 font-medium text-start">{t("ld.col.member")}</th>
                                        <th className="py-3 px-2 font-medium text-start">{t("lb.col.group")}</th>
                                        <th className="py-3 px-2 font-medium text-start">{t("ld.col.progress")}</th>
                                        <th className="py-3 px-2 font-medium text-end">{t("mem.stat.badges")}</th>
                                        <th className="py-3 px-2 font-medium text-end">{t("lb.honor")}</th>
                                        <th className="py-3 px-6 font-medium text-end">{t("ld.col.actions")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((m) => (
                                        <tr key={m.id} className="border-t border-[#E8ECF4] hover:bg-[#F4F6FB]/40 transition-colors">
                                            <td className="py-3 px-6">
                                                <div className="flex items-center gap-3">
                                                    <Crest initials={m.initials} variant="muted" className="size-9"/>
                                                    <div className="min-w-0">
                                                        <p className="font-medium leading-tight text-[#1E2A45]">{m.fullName}</p>
                                                        <p className="text-xs text-[#8A94A6]">{m.unitTitle || "Scout"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.unitName || t("groups.scouts.name")}</td>
                                            <td className="py-3 px-2 min-w-[160px]">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-[7px] rounded-full bg-[#E8ECF4] overflow-hidden">
                                                        <div className="h-full bg-[#4A7DFF]" style={{ width: `${m.progress || 0}%` }}/>
                                                    </div>
                                                    <span className="text-xs w-9 text-end text-[#8A94A6]">{m.progress || 0}%</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-end text-[#8A94A6]">{m.badges || 0}</td>
                                            <td className="py-3 px-2 text-end">
                                                <span className="text-[20px] font-bold text-[#4A7DFF]">{m.honorPoints || 0}</span>
                                            </td>
                                            <td className="py-3 px-6 text-end">
                                                <Button size="icon" variant="ghost" className="size-8" title={m.email}>
                                                    <Mail className="size-4"/>
                                                </Button>
                                                <Button size="icon" variant="ghost" className="size-8">
                                                    <MoreHorizontal className="size-4"/>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center text-sm text-[#8A94A6]">
                                                {t("tasks.empty")}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Members;
