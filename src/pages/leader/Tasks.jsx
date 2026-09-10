import { useMemo, useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Filter, Plus, Search, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useParams } from "react-router-dom";
import { useLeaderData } from "@/hooks/useLeaderData";
import { useTasksBySubgroup } from "@/hooks/useTaskData";
import { getAccentColorBySubgroupId } from "@/utils/accentColors";
import DashboardPageTitle from "@/components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "@/components/dashboardComponents/StatisticCards";
import { leaderDataService } from "@/services/leaderDataService";
import { memberDataService } from "@/services/memberDataService";
import { taskDataService } from "@/services/taskDataService";

const TasksPage = ({ role }) => {
    const { t } = useI18n();
    const { leaderId } = useParams();
    const { data: leaderData, isLoading, error } = useLeaderData();
    const [accentColor, setAccentColor] = useState('#4A7DFF'); // Default blue
    const [subgroupsTasks, setSubgroupsTasks] = useState([]);
    const [membersProgress, setMembersProgress] = useState({});
    const [loading, setLoading] = useState(true);
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
    const [taskForm, setTaskForm] = useState({
        taskName: '',
        levelName: '',
        subgroupId: '',
        description: '',
        points: 10,
        taskType: 'skill'
    });

    // Load tasks for all leader subgroups and member progress
    useEffect(() => {
        const loadTasksData = async () => {
            if (!leaderId) {
                setSubgroupsTasks([]);
                setMembersProgress({});
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                console.log('Loading tasks data for leader:', leaderId);

                // Get all subgroups for the leader
                const subgroupIds = await leaderDataService.getLeaderSubgroupIds(leaderId);
                console.log('Leader subgroups:', subgroupIds);

                if (!subgroupIds || subgroupIds.length === 0) {
                    setSubgroupsTasks([]);
                    setMembersProgress([]);
                    setLoading(false);
                    return;
                }

                // Fetch tasks and members for each subgroup
                const subgroupsData = [];
                const allMembersProgress = {};

                for (const subgroupId of subgroupIds) {
                    // Get subgroup info
                    const subgroupInfo = await leaderDataService.getSubgroupInfo(subgroupId);
                    console.log('Subgroup info:', subgroupInfo);

                    // Get tasks for this subgroup
                    const taskData = await fetchTasksForSubgroup(subgroupId);
                    console.log('Tasks for subgroup:', subgroupId, taskData);

                    // Get members for this subgroup
                    const members = await leaderDataService.getSubgroupMembers(subgroupId);
                    console.log('Members for subgroup:', subgroupId, members);

                    // Get task progress for each member
                    const membersWithProgress = [];
                    for (const member of members || []) {
                        const memberProgress = await memberDataService.getMemberTaskProgress(member.Scout_id);
                        const memberScores = await memberDataService.getMemberTaskScore(member.Scout_id);
                        
                        membersWithProgress.push({
                            ...member,
                            taskProgress: memberProgress || [],
                            scores: memberScores || { total_points: 0, badges: 0, service_hours: 0 }
                        });
                    }

                    allMembersProgress[subgroupId] = membersWithProgress;

                    subgroupsData.push({
                        subgroupId,
                        subgroupName: subgroupInfo?.subgrp_name || 'Unknown',
                        tasks: taskData || [],
                        members: membersWithProgress
                    });
                }

                console.log('All subgroups data:', subgroupsData);
                console.log('All members progress:', allMembersProgress);

                setSubgroupsTasks(subgroupsData);
                setMembersProgress(allMembersProgress);
            } catch (error) {
                console.error('Error loading tasks data:', error);
                setSubgroupsTasks([]);
                setMembersProgress({});
            } finally {
                setLoading(false);
            }
        };

        loadTasksData();
    }, [leaderId]);

    // Helper function to fetch tasks for a subgroup
    const fetchTasksForSubgroup = async (subgroupId) => {
        try {
            // This would use the taskDataService to get tasks for the subgroup
            // For now, returning empty array as placeholder
            const { taskDataService } = await import('@/services/taskDataService');
            const tasks = await taskDataService.getTasksBySubgroup(subgroupId);
            return tasks || [];
        } catch (error) {
            console.error('Error fetching tasks for subgroup:', subgroupId, error);
            return [];
        }
    };

    // Update accent color when leader data changes
    useMemo(() => {
        if (leaderData?.subgroupId) {
            const subgroupAccentColor = getAccentColorBySubgroupId(leaderData.subgroupId);
            setAccentColor(subgroupAccentColor);
        }
    }, [leaderData?.subgroupId]);

    // Handle assign task dialog
    const handleAssignTask = () => {
        setIsAssignDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsAssignDialogOpen(false);
        setTaskForm({
            taskName: '',
            levelName: '',
            subgroupId: '',
            description: '',
            points: 10,
            taskType: 'skill'
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setTaskForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitTask = async (e) => {
        e.preventDefault();
        console.log('Submitting task:', taskForm);
        
        // Here you would call your task service to create the task
        // For now, just close the dialog
        try {
            // Example: await taskDataService.createTask(taskForm);
            setIsAssignDialogOpen(false);
            setTaskForm({
                taskName: '',
                levelName: '',
                subgroupId: '',
                description: ''
            });
            // Refresh tasks
            // await loadTasksData();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    // Calculate overall stats from all subgroups
    const overallStats = useMemo(() => {
        let totalTasks = 0;
        let totalMembers = 0;
        let totalCompleted = 0;
        let totalInProgress = 0;

        subgroupsTasks.forEach(subgroup => {
            totalTasks += subgroup.tasks.length;
            totalMembers += subgroup.members.length;
            
            subgroup.members.forEach(member => {
                const completed = member.taskProgress.filter(t => 
                    t.task_status === 'complete' || t.task_status === 'verified'
                ).length;
                const inProgress = member.taskProgress.filter(t => 
                    t.task_status === 'in-progress'
                ).length;
                
                totalCompleted += completed;
                totalInProgress += inProgress;
            });
        });

        return {
            totalTasks,
            totalMembers,
            totalCompleted,
            totalInProgress,
            totalPending: totalTasks - totalCompleted
        };
    }, [subgroupsTasks]);

    // Extract unique level names from all tasks
    const uniqueLevelNames = useMemo(() => {
        const levels = new Set();
        subgroupsTasks.forEach(subgroup => {
            subgroup.tasks.forEach(task => {
                if (task.level_name) {
                    levels.add(task.level_name);
                }
            });
        });
        return Array.from(levels).sort();
    }, [subgroupsTasks]);

    const stats = [
        { label: t("tasks.stat.total"), value: overallStats.totalTasks, color: "#4A7DFF" },
        { label: "Total Members", value: overallStats.totalMembers, color: "#FFC107" },
        { label: "Completed", value: overallStats.totalCompleted, color: "#34D399" },
        { label: "In Progress", value: overallStats.totalInProgress, color: "#FF5C5C" },
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
                            <Button variant="ds-primary" size="sm" onClick={handleAssignTask}>
                                <Plus /> {t("ld.assign")}
                            </Button>
                        )}
                    </DashboardPageTitle>

                    <StatisticCards stats={stats} accentColor="#4A7DFF" />

                    {loading ? (
                        <div className="text-center py-12 text-sm text-[#8A94A6]">
                            Loading tasks and member progress...
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {subgroupsTasks.length === 0 ? (
                                <div className="rounded-[20px] border border-dashed border-[#E8ECF4] bg-[#F4F6FB]/60 p-6 text-center text-sm text-[#8A94A6]">
                                    No subgroups or tasks found for this leader.
                                </div>
                            ) : (
                                subgroupsTasks.map((subgroup) => (
                                    <div key={subgroup.subgroupId} className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-semibold text-[#253858]">{subgroup.subgroupName}</h3>
                                            <span className="text-xs text-[#8A94A6]">· {subgroup.members.length} members</span>
                                            <span className="text-xs text-[#8A94A6]">· {subgroup.tasks.length} tasks</span>
                                        </div>

                                        {/* Tasks Section */}
                                        <div className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                                            <div className="px-6 py-4 border-b border-[#E8ECF4] bg-[#F4F6FB]/50">
                                                <h4 className="text-sm font-semibold text-[#253858]">Tasks</h4>
                                            </div>
                                            <div className="p-4">
                                                {subgroup.tasks.length === 0 ? (
                                                    <div className="text-center py-8 text-sm text-[#8A94A6]">
                                                        No tasks available for this subgroup.
                                                    </div>
                                                ) : (
                                                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                                        {subgroup.tasks.map((task) => (
                                                            <TaskCard
                                                                key={`${task.subgrp_id}-${task.level_name}-${task.task_name}`}
                                                                id={`${task.subgrp_id}-${task.level_name}-${task.task_name}`}
                                                                title={task.task_name}
                                                                status={task.task_status || "not-started"}
                                                                level={task.level_name}
                                                                subgroup={subgroup.subgroupName}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Member Progress Section */}
                                        <div className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                                            <div className="px-6 py-4 border-b border-[#E8ECF4] bg-[#F4F6FB]/50">
                                                <h4 className="text-sm font-semibold text-[#253858]">Member Progress</h4>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-[#F4F6FB]/50">
                                                        <tr className="text-[10px] uppercase tracking-[0.2em] text-[#8A94A6]">
                                                            <th className="py-3 px-6 font-medium text-start">Member</th>
                                                            <th className="py-3 px-2 font-medium text-start">Completed</th>
                                                            <th className="py-3 px-2 font-medium text-start">In Progress</th>
                                                            <th className="py-3 px-2 font-medium text-start">Total Points</th>
                                                            <th className="py-3 px-2 font-medium text-start">Badges</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {subgroup.members.map((member) => {
                                                            const completed = member.taskProgress.filter(t => 
                                                                t.task_status === 'complete' || t.task_status === 'verified'
                                                            ).length;
                                                            const inProgress = member.taskProgress.filter(t => 
                                                                t.task_status === 'in-progress'
                                                            ).length;
                                                            const memberName = `${member.Fname || ''} ${member.Lname || ''}`.trim() || 'Unknown';
                                                            const initials = `${member.Fname?.[0] || ''}${member.Lname?.[0] || ''}`.toUpperCase();

                                                            return (
                                                                <tr key={member.Scout_id} className="border-t border-[#E8ECF4] hover:bg-[#F4F6FB]/40 transition-colors">
                                                                    <td className="py-3 px-6">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="size-8 rounded-full bg-[#E8ECF4] flex items-center justify-center text-xs font-medium text-[#8A94A6]">
                                                                                {initials}
                                                                            </div>
                                                                            <span className="font-medium text-[#1E2A45]">{memberName}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-3 px-2 text-xs text-[#8A94A6]">{completed}</td>
                                                                    <td className="py-3 px-2 text-xs text-[#8A94A6]">{inProgress}</td>
                                                                    <td className="py-3 px-2 text-xs text-[#8A94A6]">{member.scores?.total_points || 0}</td>
                                                                    <td className="py-3 px-2 text-xs text-[#8A94A6]">{member.scores?.badges || 0}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                        {subgroup.members.length === 0 && (
                                                            <tr>
                                                                <td colSpan={5} className="py-8 text-center text-sm text-[#8A94A6]">
                                                                    No members in this subgroup.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </main>
            </div>

            {/* Assign Task Dialog */}
            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                <DialogContent className="sm:max-w-[500px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#253858]">Assign New Task</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitTask} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="taskName" className="text-sm font-medium text-[#253858]">Task Name</Label>
                            <Input
                                id="taskName"
                                name="taskName"
                                value={taskForm.taskName}
                                onChange={handleFormChange}
                                placeholder="Enter task name"
                                className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="levelName" className="text-sm font-medium text-[#253858]">Level Name</Label>
                            <select
                                id="levelName"
                                name="levelName"
                                value={taskForm.levelName}
                                onChange={handleFormChange}
                                className="w-full h-10 px-3 py-2 text-sm border border-[#E8ECF4] rounded-md focus:outline-none focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                                required
                            >
                                <option value="">Select a level</option>
                                {uniqueLevelNames.map(level => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subgroupId" className="text-sm font-medium text-[#253858]">Subgroup</Label>
                            <select
                                id="subgroupId"
                                name="subgroupId"
                                value={taskForm.subgroupId}
                                onChange={handleFormChange}
                                className="w-full h-10 px-3 py-2 text-sm border border-[#E8ECF4] rounded-md focus:outline-none focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                                required
                            >
                                <option value="">Select a subgroup</option>
                                {subgroupsTasks.map(subgroup => (
                                    <option key={subgroup.subgroupId} value={subgroup.subgroupId}>
                                        {subgroup.subgroupName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium text-[#253858]">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={taskForm.description}
                                onChange={handleFormChange}
                                placeholder="Enter task description"
                                className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20 min-h-[100px] resize-none"
                                required
                            />
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseDialog}
                                className="border-[#E8ECF4] text-[#8A94A6] hover:bg-[#F4F6FB]"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#4A7DFF] text-white hover:bg-[#3B6BDD]"
                            >
                                Assign Task
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TasksPage;
