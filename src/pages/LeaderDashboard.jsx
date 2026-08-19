import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Crest } from "@/components/Crest";
import { StatusPill } from "@/components/StatusPill";
import { Check, Clock, MoreHorizontal, Plus, Users } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import Leader from "@/processes/leaders";
import ScoutMember from "@/processes/members";
import DashboardPageTitle from "../components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "../components/dashboardComponents/StatisticCards";
import MembersTable from "../components/dashboardComponents/MembersTable";
import PendingList from "../components/dashboardComponents/PendingList";

// Choose a CSS class set for the heatmap based on a numeric progress value.
// Higher values get a stronger color, lower values get a warning red tone.
const heatColor = (p) => {
    if (p >= 70)
        return "bg-secondary text-secondary-foreground";
    if (p >= 40)
        return "bg-gold/30 text-gold";
    return "bg-crimson/30 text-crimson";
};

const LeaderDashboard = () => {
    const { t } = useI18n();
    const { leaderId } = useParams();
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    // Summary statistics shown in the top cards.
    const stats = [];
    const accentColor = 'green'
    const leaderFullName = 'George Jabbour';
    const subgrp = 'Saint David Scouts';
    const leaderRank = 'Leader'

    // Member rows for the team table.
    // Each member has a name, initials badge, rank, task progress, and last activity timestamp.
    const members = [];

    // Pending review items shown in the right column.
    const reviews = [];



    return (
        <div className="min-h-screen flex bg-background">
            {/* Left navigation panel for leader roles. */}
            <AppSidebar role="leader" accentColor={accentColor}/>

            <div className="flex-1 flex flex-col min-w-0">
                {/* Top header bar with user name, rank, subgroup, and initials badge. */}
                <Topbar name={leaderFullName} rank={leaderRank} subgroup={subgrp} initials="GJ" accentColor={accentColor} />

                <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
                    
                    <DashboardPageTitle title={leaderFullName} subtitle={subgrp} accentColor={accentColor}>
                            <Button variant="outline" size="sm" onClick={() => setIsTaskFormOpen(true)}>
                                <Plus /> {t("ld.assign")}
                            </Button>
                    </DashboardPageTitle>
                        
                    

                    {/* Top statistic cards showing totals, assignments, completion rate, and pending items. */}
                    <StatisticCards stats={stats} accentColor='green' />

                    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
                        {/* Main members table section. */}
                        <MembersTable members={members} accentColor={accentColor}/>

                        <div className="space-y-6">
                        
                            {/* Pending review list with approve / request change buttons. */}
                            <PendingList accentColor={accentColor} reviews={reviews}/>
                        </div>
                    </div>
                </main>
            </div>

            <TaskForm open={isTaskFormOpen} onClose={() => setIsTaskFormOpen(false)} leaderId={leaderId} />
        </div>
    );
};

export default LeaderDashboard;
