import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Crest } from "@/components/Crest";
import { Button } from "@/components/ui/button";
import { Mail, MoreHorizontal, Plus, Search, Users } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useState } from "react";
import DashboardPageTitle from "../components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "../components/dashboardComponents/StatisticCards";

const MEMBERS = [];
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
        { label: t("mbr.stat.total"), value: MEMBERS.length, color: "#4A7DFF" },
        { label: t("mbr.stat.active"), value: MEMBERS.filter((m) => m.status === "active").length, color: "#34D399" },
        { label: t("mbr.stat.honor"), value: MEMBERS.reduce((s, m) => s + m.honor, 0), color: "#FFC107" },
        { label: t("mbr.stat.hours"), value: MEMBERS.reduce((s, m) => s + m.hours, 0), color: "#FF9F43" },
    ];

    return (
        <div className="min-h-screen flex bg-[#F4F6FB]">
            <AppSidebar role="leader"/>
            <div className="flex-1 flex flex-col min-w-0">
                <Topbar name="Tony Maalouf" rank={t("rank.subleader")} subgroup={t("groups.scouts.name")} initials="TM"/>

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
                                        <tr key={m.name} className="border-t border-[#E8ECF4] hover:bg-[#F4F6FB]/40 transition-colors">
                                            <td className="py-3 px-6">
                                                <div className="flex items-center gap-3">
                                                    <Crest initials={m.initials} variant="muted" className="size-9"/>
                                                    <div className="min-w-0">
                                                        <p className="font-medium leading-tight text-[#1E2A45]">{m.name}</p>
                                                        <p className="text-xs text-[#8A94A6]">{t(m.rank)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-xs text-[#8A94A6]">{t(m.group)}</td>
                                            <td className="py-3 px-2 min-w-[160px]">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-[7px] rounded-full bg-[#E8ECF4] overflow-hidden">
                                                        <div className="h-full bg-[#4A7DFF]" style={{ width: `${m.progress}%` }}/>
                                                    </div>
                                                    <span className="text-xs w-9 text-end text-[#8A94A6]">{m.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-end text-[#8A94A6]">{m.badges}</td>
                                            <td className="py-3 px-2 text-end">
                                                <span className="text-[20px] font-bold text-[#4A7DFF]">{m.honor}</span>
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
