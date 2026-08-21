import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Crest } from "@/components/Crest";
import { StatusPill } from "@/components/StatusPill";
import { Check, Clock, MoreHorizontal, Plus, Users } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "@/components/TaskForm";
import { leaderDataService } from "@/services/leaderDataService";
import { memberDataService } from "@/services/memberDataService";
import { getAccentColorBySubgroupId } from "@/utils/accentColors";
import DashboardPageTitle from "@/components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "@/components/dashboardComponents/StatisticCards";
import MembersTable from "@/components/dashboardComponents/MembersTable";
import PendingList from "@/components/dashboardComponents/PendingList";

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
    const [leader, setLeader] = useState(null);
    const [stats, setStats] = useState([]);
    const [members, setMembers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accentColor, setAccentColor] = useState('#4A7DFF'); // Default blue

    useEffect(() => {
        let isMounted = true;

        const loadLeaderData = async () => {
            if (!leaderId) {
                setLeader(null);
                setStats([]);
                setMembers([]);
                setReviews([]);
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
                    const formattedLeader = leaderDataService.formatLeaderData(leaderData);
                    setLeader(formattedLeader);
                }

                // Load leader statistics
                const leaderStats = await leaderDataService.getLeaderStats(leaderId);
                if (isMounted) {
                    setStats([
                        { label: "Total Members", value: leaderStats.totalMembers.toString(), delta: "", color: accentColor },
                        { label: "Active Members", value: leaderStats.activeMembers.toString(), delta: "", color: "#34D399" },
                        { label: "Total Honor Points", value: leaderStats.totalHonorPoints.toString(), delta: "", color: "#FFC107" },
                        { label: "Service Hours", value: leaderStats.totalServiceHours.toString(), delta: "", color: "#FF5C5C" },
                    ]);
                }

                // Load leader's members
                const leaderMembers = await leaderDataService.getLeaderMembers(leaderId);
                if (isMounted && leaderMembers) {
                    const formattedMembers = leaderMembers.map(m => memberDataService.formatMemberData(m));
                    setMembers(formattedMembers);
                }

                // Reviews would need to be implemented in the database
                if (isMounted) {
                    setReviews([]);
                }
            } catch (error) {
                console.error("Error loading leader data:", error);
                if (isMounted) {
                    setLeader(null);
                    setStats([]);
                    setMembers([]);
                    setReviews([]);
                    setAccentColor('#4A7DFF');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadLeaderData();

        return () => {
            isMounted = false;
        };
    }, [leaderId]);

    const leaderFullName = leader?.fullName || 'Loading...';
    const subgrp = leader?.subgroupName || 'Loading...';
    const leaderRank = leader?.primaryTitle || 'Leader';



    return (
        <div className="min-h-screen flex bg-[#F4F6FB]">
            {/* Left navigation panel for leader roles. */}
            <AppSidebar role="leader" accentColor={accentColor}/>

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-0">
                {/* Top header bar with user name, rank, subgroup, and initials badge. */}
                <Topbar name={leaderFullName} rank={leaderRank} subgroup={subgrp} initials={leader?.initials || "LD"} accentColor={accentColor} />

                <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
                    
                    <DashboardPageTitle title={leaderFullName} subtitle={subgrp} accentColor={accentColor}>
                            <Button variant="ds-primary" size="sm" onClick={() => setIsTaskFormOpen(true)}>
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
