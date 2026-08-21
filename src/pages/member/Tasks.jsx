import { useEffect, useMemo, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { ClipboardList, Filter, Plus, Search } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useParams } from "react-router-dom";
import { memberDataService } from "@/services/memberDataService";
import { taskDataService } from "@/services/taskDataService";
import { getAccentColorBySubgroupId } from "@/utils/accentColors";
import DashboardPageTitle from "@/components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "@/components/dashboardComponents/StatisticCards";

const TasksPage = ({ role }) => {
    const { t } = useI18n();
    const { memberId } = useParams();
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const [allTasks, setAllTasks] = useState([]);
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accentColor, setAccentColor] = useState('#4A7DFF'); // Default blue

    useEffect(() => {
        let isMounted = true;

        const loadTasksData = async () => {
            if (!memberId) {
                setAllTasks([]);
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

                // Load member tasks
                const tasks = await memberDataService.getMemberTasks(memberId);
                if (isMounted) {
                    setAllTasks(Array.isArray(tasks) ? tasks : []);
                }
            } catch (error) {
                console.error("Error loading tasks data:", error);
                if (isMounted) {
                    setAllTasks([]);
                    setMember(null);
                    setAccentColor('#4A7DFF');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadTasksData();

        return () => {
            isMounted = false;
        };
    }, [memberId]);

    const filters = [
        { key: "all", labelKey: "tasks.filter.all" },
        { key: "not-started", labelKey: "status.not-started" },
        { key: "in-progress", labelKey: "status.in-progress" },
        { key: "pending", labelKey: "status.pending" },
        { key: "complete", labelKey: "status.complete" },
        { key: "verified", labelKey: "status.verified" },
    ];

    const visible = allTasks.filter((tk) => {
        const taskStatus = tk.task_status || tk.status || "not-started";
        if (filter !== "all" && taskStatus !== filter)
            return false;
        const taskName = tk.task_name || tk.titleKey || tk.taskKey || "";
        if (query && !taskName.toLowerCase().includes(query.toLowerCase()))
            return false;
        return true;
    });

    const counts = {
        total: allTasks.length,
        open: allTasks.filter((t) => (t.task_status || t.status) === "not-started" || (t.task_status || t.status) === "in-progress").length,
        pending: allTasks.filter((t) => (t.task_status || t.status) === "pending").length,
        done: allTasks.filter((t) => (t.task_status || t.status) === "complete" || (t.task_status || t.status) === "verified").length,
    };

    const stats = [
        { label: t("tasks.stat.total"), value: counts.total, color: "#4A7DFF" },
        { label: t("tasks.stat.open"), value: counts.open, color: "#FFC107" },
        { label: t("tasks.stat.pending"), value: counts.pending, color: "#FF5C5C" },
        { label: t("tasks.stat.done"), value: counts.done, color: "#34D399" },
    ];

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
                        title={role === "leader" ? t("tasks.title.leader") : t("tasks.title.member")}
                        subtitle={role === "leader" ? t("tasks.kicker.leader") : t("tasks.kicker.member")}
                        accentColor={accentColor}
                    >
                        {role === "leader" && (
                            <Button variant="ds-primary" size="sm">
                                <Plus /> {t("ld.assign")}
                            </Button>
                        )}
                    </DashboardPageTitle>

                    <StatisticCards stats={stats} accentColor={accentColor} />

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="relative flex-1 min-w-[220px] max-w-md">
                            <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-[#8A94A6]"/>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t("tasks.search")}
                                className="w-full bg-white border border-[#E8ECF4] rounded-xl ps-10 pe-3 py-2 text-sm focus:outline-none focus:border-[#4A7DFF] focus:ring-1 focus:ring-[#4A7DFF]/40"
                            />
                        </div>
                        <div className="flex items-center gap-1.5 text-xs flex-wrap">
                            <Filter className="size-3.5 text-[#8A94A6] me-1"/>
                            {filters.map((f) => (
                                <button
                                    key={f.key}
                                    onClick={() => setFilter(f.key)}
                                    className={`px-3 py-1.5 rounded-full border transition-colors ${
                                        filter === f.key
                                            ? "border-[#4A7DFF] bg-[#EAF1FF] text-[#4A7DFF]"
                                            : "border-[#E8ECF4] text-[#8A94A6] hover:text-[#1E2A45] hover:border-[#E8ECF4]"
                                    }`}
                                >
                                    {t(f.labelKey)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {visible.length === 0 ? (
                            <div className="sm:col-span-2 xl:col-span-3 rounded-[20px] border border-dashed border-[#E8ECF4] bg-[#F4F6FB]/60 p-6 text-center text-sm text-[#8A94A6]">
                                {t("tasks.emptyTasks")}
                            </div>
                        ) : (
                            visible.map((tk) => (
                                <TaskCard
                                    key={tk.id || tk.task_id}
                                    id={tk.id || tk.task_id}
                                    title={tk.task_name || t(tk.titleKey)}
                                    dueDate={tk.dueDate}
                                    status={tk.task_status || tk.status}
                                    subgroup={member?.unitName || t("groups.scouts.name")}
                                />
                            ))
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default TasksPage;
