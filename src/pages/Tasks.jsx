import { useMemo, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { ClipboardList, Filter, Plus, Search } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import DashboardPageTitle from "../components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "../components/dashboardComponents/StatisticCards";

const TasksPage = ({ role }) => {
    const { t } = useI18n();
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const allTasks = useMemo(() => [], []);

    const filters = [
        { key: "all", labelKey: "tasks.filter.all" },
        { key: "not-started", labelKey: "status.not-started" },
        { key: "in-progress", labelKey: "status.in-progress" },
        { key: "pending", labelKey: "status.pending" },
        { key: "complete", labelKey: "status.complete" },
        { key: "verified", labelKey: "status.verified" },
    ];

    const visible = allTasks.filter((tk) => {
        if (filter !== "all" && tk.status !== filter)
            return false;
        if (query && !t(tk.titleKey).toLowerCase().includes(query.toLowerCase()))
            return false;
        return true;
    });

    const counts = {
        total: allTasks.length,
        open: allTasks.filter((t) => t.status === "not-started" || t.status === "in-progress").length,
        pending: allTasks.filter((t) => t.status === "pending").length,
        done: allTasks.filter((t) => t.status === "complete" || t.status === "verified").length,
    };

    const stats = [
        { label: t("tasks.stat.total"), value: counts.total, color: "#4A7DFF" },
        { label: t("tasks.stat.open"), value: counts.open, color: "#FFC107" },
        { label: t("tasks.stat.pending"), value: counts.pending, color: "#FF5C5C" },
        { label: t("tasks.stat.done"), value: counts.done, color: "#34D399" },
    ];

    return (
        <div className="min-h-screen flex bg-[#F4F6FB]">
            <AppSidebar role={role}/>

            <div className="flex-1 flex flex-col min-w-0">
                <Topbar name={role === "leader" ? "Tony Maalouf" : "Elias Khoury"} rank={role === "leader" ? t("rank.subleader") : t("rank.senior")} subgroup={t("groups.scouts.name")} initials={role === "leader" ? "TM" : "EK"}/>

                <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
                    <DashboardPageTitle
                        title={role === "leader" ? t("tasks.title.leader") : t("tasks.title.member")}
                        subtitle={role === "leader" ? t("tasks.kicker.leader") : t("tasks.kicker.member")}
                        accentColor="#4A7DFF"
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
                                    key={tk.id}
                                    id={tk.id}
                                    title={t(tk.titleKey)}
                                    dueDate={tk.dueDate}
                                    status={tk.status}
                                    subgroup={role === "leader" ? tk.assignee : t("groups.scouts.name")}
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
