import { useMemo, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { ClipboardList, Filter, Plus, Search } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useParams } from "react-router-dom";
import { useLeaderData } from "@/hooks/useLeaderData";
import { useTasksBySubgroup } from "@/hooks/useTaskData";
import { getAccentColorBySubgroupId } from "@/utils/accentColors";
import DashboardPageTitle from "@/components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "@/components/dashboardComponents/StatisticCards";

const TasksPage = ({ role }) => {
    const { t } = useI18n();
    const { data: leaderData, isLoading, error } = useLeaderData();
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const [accentColor, setAccentColor] = useState('#4A7DFF'); // Default blue

    // Get leader's subgroup ID for tasks
    const subgroupId = leaderData?.subgroupId || null;
    const { data: taskData, isLoading: tasksLoading } = useTasksBySubgroup(subgroupId);
    const allTasks = taskData?.tasks || [];
    const taskStats = taskData?.stats || { total: 0, notStarted: 0, inProgress: 0, pending: 0, complete: 0, verified: 0 };

    // Update accent color when leader data changes
    useMemo(() => {
        if (leaderData?.subgroupId) {
            const subgroupAccentColor = getAccentColorBySubgroupId(leaderData.subgroupId);
            setAccentColor(subgroupAccentColor);
        }
    }, [leaderData?.subgroupId]);

    const filters = [
        { key: "all", labelKey: "tasks.filter.all" },
        { key: "not-started", labelKey: "status.not-started" },
        { key: "in-progress", labelKey: "status.in-progress" },
        { key: "pending", labelKey: "status.pending" },
        { key: "complete", labelKey: "status.complete" },
        { key: "verified", labelKey: "status.verified" },
    ];

    const visible = allTasks.filter((tk) => {
        const taskStatus = tk.task_status || "not-started";
        if (filter !== "all" && taskStatus !== filter)
            return false;
        if (query && !tk.task_name.toLowerCase().includes(query.toLowerCase()))
            return false;
        return true;
    });

    const counts = {
        total: taskStats.total,
        open: taskStats.notStarted + taskStats.inProgress,
        pending: taskStats.pending,
        done: taskStats.complete + taskStats.verified,
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

            <div className="flex-1 flex flex-col min-w-0">
                <Topbar
                    name={leaderData?.fullName || "Loading..."}
                    rank={leaderData?.primaryTitle || t("rank.subleader")}
                    subgroup={leaderData?.subgroupName || t("groups.scouts.name")}
                    initials={leaderData?.initials || "LD"}
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

                    <StatisticCards stats={stats} accentColor="#4A7DFF" />

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
                                    key={`${tk.subgrp_id}-${tk.level_name}-${tk.task_name}`}
                                    id={`${tk.subgrp_id}-${tk.level_name}-${tk.task_name}`}
                                    title={tk.task_name}
                                    dueDate={tk.created_at}
                                    status={tk.task_status || "not-started"}
                                    subgroup={role === "leader" ? tk.level_name : t("groups.scouts.name")}
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
