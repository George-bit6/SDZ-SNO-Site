import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Crest } from "@/components/Crest";
import { Button } from "@/components/ui/button";
import { Plus, Search, Users } from "lucide-react";
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

// Helper function to calculate age from birthdate
const calculateAge = (birthdate) => {
    if (!birthdate) return "N/A";
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

// Helper function to format date
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

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

                console.log('Leader ID:', leaderId);

                // Get subgroup ID first for accent color
                const subgroupIds = await leaderDataService.getLeaderSubgroupIds(leaderId);
                console.log('Subgroup IDs:', subgroupIds);
                
                if (isMounted && subgroupIds && subgroupIds.length > 0) {
                    const subgroupId = subgroupIds[0]; // Use first subgroup ID
                    console.log('Selected Subgroup ID:', subgroupId);
                    const subgroupAccentColor = getAccentColorBySubgroupId(subgroupId);
                    setAccentColor(subgroupAccentColor);
                }

                // Load leader data with user info
                const leaderData = await leaderDataService.getLeaderById(leaderId);
                const userData = await leaderDataService.getLeaderUserInfo(leaderId);
                if (isMounted && leaderData) {
                    const formattedLeader = await leaderDataService.formatLeaderDataWithSubgroup(leaderData, userData, leaderId);
                    setLeader(formattedLeader);
                }

                // Load leader's members from all subgroups
                const leaderMembers = await leaderDataService.getAllLeaderMembers(leaderId);
                console.log('Raw Members Data:', leaderMembers);
                
                if (isMounted && leaderMembers) {
                    const formattedMembers = leaderMembers.map(m => memberDataService.formatMemberData(m));
                    console.log('Formatted Members:', formattedMembers);
                    setMembers(formattedMembers);
                }

                // Load leader statistics (using all members)
                const leaderStats = {
                    totalMembers: leaderMembers ? leaderMembers.length : 0
                };
                console.log('Leader Stats:', leaderStats);
                
                if (isMounted) {
                    setStats([
                        { label: t("mbr.stat.total"), value: leaderStats.totalMembers, color: '#4A7DFF' },
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
        // Hello

        loadMembersData();

        return () => {
            isMounted = false;
        };
    }, [leaderId]);

    const filtered = members.filter((m) => {
        const matchesQ = (m.fullName || "").toLowerCase().includes(q.toLowerCase());
        const matchesG = group === "all" || (m.subgroupName || "").toLowerCase().includes(t(group).toLowerCase());
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
                               
                            </div>
                        </header>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[#F4F6FB]/50">
                                    <tr className="text-[10px] uppercase tracking-[0.2em] text-[#8A94A6]">
                                        <th className="py-3 px-6 font-medium text-start">{t("ld.col.member")}</th>
                                        <th className="py-3 px-2 font-medium text-start">{"subgroup"}</th>
                                        <th className="py-3 px-2 font-medium text-start">{"unit"}</th>
                                        <th className="py-3 px-2 font-medium text-start">{"age"}</th>
                                        <th className="py-3 px-2 font-medium text-start">{"unit role"}</th>
                                        <th className="py-3 px-2 font-medium text-start">{"date of membership"}</th>
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
                                            <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.subgroupName || "Unknown"}</td>
                                            <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.unitName || t("groups.scouts.name")}</td>
                                            <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.age || calculateAge(m.birthdate)}</td>
                                            <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.unitTitle || "Scout"}</td>
                                            <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.membershipDate ? formatDate(m.membershipDate) : "N/A"}</td>
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
