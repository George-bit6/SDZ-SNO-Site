import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Crest } from "@/components/Crest";
import { StatusPill } from "@/components/StatusPill";
import { Check, Clock, MoreHorizontal, Plus, Users } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Leader from "@/processes/leaders";
import ScoutMember from "@/processes/members";

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

    // Summary statistics shown in the top cards.
    const stats = [
        { label: t("ld.stat.total"), value: "24", delta: t("ld.stat.totalDelta") },
        { label: t("ld.stat.assigned"), value: "187", delta: t("ld.stat.assignedDelta") },
        { label: t("ld.stat.rate"), value: "78%", delta: t("ld.stat.rateDelta") },
        { label: t("ld.stat.pending"), value: "9", delta: t("ld.stat.pendingDelta") },
    ];

    // Member rows for the team table.
    // Each member has a name, initials badge, rank, task progress, and last activity timestamp.
    const members = [
        { name: "Elias Khoury", initials: "EK", rank: t("rank.senior"), assigned: 12, done: 9, progress: 75, last: t("act.t.2h") },
        { name: "Maya Saliba", initials: "MS", rank: t("rank.patrol"), assigned: 14, done: 13, progress: 93, last: "1h" },
        { name: "Anton Haddad", initials: "AH", rank: t("rank.scout"), assigned: 10, done: 4, progress: 40, last: t("act.t.3d") },
        { name: "Nour Tannous", initials: "NT", rank: t("rank.senior"), assigned: 11, done: 8, progress: 73, last: t("act.t.1d") },
        { name: "Sami Boutros", initials: "SB", rank: t("rank.scout"), assigned: 9, done: 2, progress: 22, last: "1w" },
        { name: "Lara Chaoul", initials: "LC", rank: t("rank.patrol"), assigned: 13, done: 11, progress: 85, last: "5h" },
    ];

    // Pending review items shown in the right column.
    const reviews = [
        { name: "Elias Khoury", task: t("task.t4"), time: t("act.t.1d") },
        { name: "Lara Chaoul", task: t("task.t3"), time: t("act.t.3d") },
        { name: "Anton Haddad", task: t("task.t1"), time: t("act.t.3d") },
    ];

    return (
        <div className="min-h-screen flex bg-background">
            {/* Left navigation panel for leader roles. */}
            <AppSidebar role="leader" />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Top header bar with user name, rank, subgroup, and initials badge. */}
                <Topbar name="Tony Maalouf" rank={t("rank.subleader")} subgroup={t("groups.scouts.name")} initials="TM" />

                <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
                    {/* Page title, subtitle, and action buttons. */}
                    <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">{t("ld.kicker")}</p>
                            <h1 className="font-serif text-4xl md:text-5xl famil">{t("Boy Scouts")}</h1>
                            {leaderId ? <p className="text-sm text-muted-foreground mt-2">Leader ID: {leaderId}</p> : null}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="gold-outline" size="sm">{t("ld.export")}</Button>
                            <Button variant="hero" size="sm">
                                <Plus /> {t("ld.assign")}
                            </Button>
                        </div>
                    </div>

                    {/* Top statistic cards showing totals, assignments, completion rate, and pending items. */}
                    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {stats.map((s) => (
                            <div key={s.label} className="relative rounded-lg border border-border bg-card p-5 shadow-card overflow-hidden">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
                                <p className="font-serif text-4xl gold-text mt-2">{s.value}</p>
                                <p className="text-xs text-muted-foreground/80 mt-2">{s.delta}</p>
                            </div>
                        ))}
                    </section>

                    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
                        {/* Main members table section. */}
                        <section className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
                            <header className="px-6 py-4 border-b border-border flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="size-4 text-gold" />
                                    <h2 className="font-serif text-xl">{t("ld.members")}</h2>
                                    <span className="text-xs text-muted-foreground">· {members.length}</span>
                                </div>
                                <input placeholder={t("ld.searchMembers")} className="bg-background border border-border rounded-md px-3 py-1.5 text-xs w-48 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40" />
                            </header>

                            {/* Scrollable table showing member details. */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-background/50">
                                        <tr className="text-start text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                            <th className="py-3 px-6 font-medium text-start">{t("ld.col.member")}</th>
                                            <th className="py-3 px-2 font-medium text-start">{t("ld.col.tasks")}</th>
                                            <th className="py-3 px-2 font-medium text-start">{t("ld.col.progress")}</th>
                                            <th className="py-3 px-2 font-medium text-start">{t("ld.col.last")}</th>
                                            <th className="py-3 px-6 font-medium text-end">{t("ld.col.actions")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((m) => (
                                            <tr key={m.name} className="border-t border-border hover:bg-background/40 transition-colors">
                                                <td className="py-3 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <Crest initials={m.initials} variant="muted" className="size-9" />
                                                        <div>
                                                            <p className="font-medium leading-tight">{m.name}</p>
                                                            <p className="text-xs text-muted-foreground">{m.rank}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2 text-muted-foreground">
                                                    {m.done}<span className="opacity-50">/{m.assigned}</span>
                                                </td>
                                                <td className="py-3 px-2 min-w-[160px]">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                                            <div className="h-full bg-gradient-gold" style={{ width: `${m.progress}%` }} />
                                                        </div>
                                                        <span className="text-xs w-9 text-end text-muted-foreground">{m.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2 text-xs text-muted-foreground">{m.last}</td>
                                                <td className="py-3 px-6 text-end">
                                                    <Button size="sm" variant="ghost" className="text-gold hover:text-gold hover:bg-gold/10">
                                                        {t("ld.assignBtn")}
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="size-8">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <div className="space-y-6">
                        
                            {/* Pending review list with approve / request change buttons. */}
                            <section className="rounded-lg border border-border bg-card shadow-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-serif text-lg flex items-center gap-2">
                                        <Clock className="size-4 text-gold" />
                                        {t("ld.pendingReviews")}
                                    </h3>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-crimson/20 text-crimson">{reviews.length}</span>
                                </div>
                                <ul className="space-y-3">
                                    {reviews.map((r) => (
                                        <li key={r.name + r.task} className="rounded-md border border-border bg-background p-3">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium leading-tight">{r.task}</p>
                                                    <p className="text-xs text-muted-foreground mt-0.5">{r.name} · {r.time}</p>
                                                </div>
                                                <StatusPill status="pending" />
                                            </div>
                                            <div className="flex gap-2 mt-3">
                                                <Button size="sm" variant="gold" className="h-7 px-3 text-xs flex-1">
                                                    <Check className="size-3" /> {t("ld.approve")}
                                                </Button>
                                                <Button size="sm" variant="ghost" className="h-7 px-3 text-xs">
                                                    {t("ld.requestChanges")}
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LeaderDashboard;
