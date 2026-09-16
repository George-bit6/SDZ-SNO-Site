import { useMemo, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { TaskCard } from "@/components/TaskCard";
import { TaskDetailDialog } from "@/components/TaskDetailDialog";
import { Button } from "@/components/ui/button";
import { ClipboardList, Filter, Plus, Search } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useMemberData } from "@/hooks/useMemberData";
import { getAccentColorBySubgroupId } from "@/utils/accentColors";
import DashboardPageTitle from "@/components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "@/components/dashboardComponents/StatisticCards";

const TasksPage = ({ role }) => {
    const { t } = useI18n();
    const { data: memberData, isLoading } = useMemberData();
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const [accentColor, setAccentColor] = useState('#4A7DFF'); // Default blue
    const [selectedTask, setSelectedTask] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Update accent color when member data changes
    useMemo(() => {
        if (memberData?.subgroupId) {
            const subgroupAccentColor = getAccentColorBySubgroupId(memberData.subgroupId);
            setAccentColor(subgroupAccentColor || '#4A7DFF');
        }
    }, [memberData?.subgroupId]);

    const allTasks = memberData?.tasks || [];

    console.log(memberData);
    console.log(allTasks);

    const handleOpenTask = (task) => {
        setSelectedTask(task);
        setIsDialogOpen(true);
    };

    const visible = allTasks.filter((tk) => {
        const taskStatus = tk.task_status || tk.status || "not-started";
        if (filter !== "all" && taskStatus !== filter)
            return false;
        const taskName = tk.task_name || tk.titleKey || tk.taskKey || "";
        if (query && !taskName.toLowerCase().includes(query.toLowerCase()))
            return false;
        return true;
    });

    // Separate tasks by completion status
    const completedTasks = visible.filter((tk) => {
        const taskStatus = tk.task_status || tk.status || "not-started";
        return taskStatus === "done";
    });

    const nonCompletedTasks = visible.filter((tk) => {
        const taskStatus = tk.task_status || tk.status || "not-started";
        return taskStatus !== "done";
    });

    const counts = {
        total: allTasks.length,
        open: allTasks.filter((t) => (t.task_status || t.status) === "not-started" || (t.task_status || t.status) === "in-progress").length,
        pending: allTasks.filter((t) => (t.task_status || t.status) === "pending").length,
        done: allTasks.filter((t) => (t.task_status || t.status) === "done").length,
    };

    const stats = [
        { label: t("tasks.stat.total"), value: counts.total, color: "#4A7DFF" },
        { label: t("tasks.stat.done"), value: counts.done, color: "#34D399" },
    ];

    return (
        <div className="min-h-screen flex bg-[#F4F6FB]">
            <AppSidebar role={role} accentColor={accentColor}/>

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-0">
                <Topbar 
                    name={memberData?.fullName || "Loading..."} 
                    rank={t("rank.senior")} 
                    subgroup={memberData?.unitName || t("groups.scouts.name")} 
                    initials={memberData?.initials || "UK"}
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
                       
                    </div>

                    <section className="space-y-8">
                        {/* Non-completed tasks section */}
                        {nonCompletedTasks.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold mb-4 text-[#1E293B]">
                                    {t("tasks.inProgress")}
                                </h2>
                                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {nonCompletedTasks.map((tk) => (
                                        <TaskCard
                                            key={tk.id || tk.task_id}
                                            id={tk.id || tk.task_id}
                                            title={tk.task_name || t(tk.titleKey)}
                                            dueDate={tk.dueDate}
                                            status={tk.task_status || tk.status}
                                            subgroup={memberData?.unitName || t("groups.scouts.name")}
                                            level={tk.level_name || tk.level}
                                            task={tk}
                                            onOpen={handleOpenTask}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Completed tasks section */}
                        {completedTasks.length > 0 && (
                            <div className="opacity-75">
                                <h2 className="text-lg font-semibold mb-4 text-[#64748B]">
                                    {t("tasks.completed")}
                                </h2>
                                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {completedTasks.map((tk) => (
                                        <TaskCard
                                            key={tk.id || tk.task_id}
                                            id={tk.id || tk.task_id}
                                            title={tk.task_name || t(tk.titleKey)}
                                            dueDate={tk.dueDate}
                                            status={tk.task_status || tk.status}
                                            subgroup={memberData?.unitName || t("groups.scouts.name")}
                                            level={tk.level_name || tk.level}
                                            task={tk}
                                            onOpen={handleOpenTask}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty state */}
                        {visible.length === 0 && (
                            <div className="rounded-[20px] border border-dashed border-[#E8ECF4] bg-[#F4F6FB]/60 p-6 text-center text-sm text-[#8A94A6]">
                                {t("tasks.empty")}
                            </div>
                        )}
                    </section>

                    {/* Task Detail Dialog */}
                    <TaskDetailDialog
                        task={selectedTask}
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                    />
                </main>
            </div>
        </div>
    );
};

export default TasksPage;
