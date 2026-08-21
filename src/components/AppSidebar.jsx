import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Users, Settings, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/I18nProvider";
import { useParams } from "react-router-dom";

const memberNav = [
    { to: "/member", icon: LayoutDashboard, key: "side.dashboard" },
    { to: "/member/tasks", icon: ClipboardList, key: "side.tasks" },
    { to: "/member/leaderboard", icon: Trophy, key: "side.leaderboard" },
    { to: "/member/settings", icon: Settings, key: "side.settings" },
];

const leaderNav = [
    { to: "/leader", icon: LayoutDashboard, key: "side.overview" },
    { to: "/leader/members", icon: Users, key: "side.members" },
    { to: "/leader/tasks", icon: ClipboardList, key: "side.allTasks" },
    {to: "/leader/leaderboard", icon: Trophy, key: "side.leaderboard" },
    { to: "/leader/settings", icon: Settings, key: "side.settings" },
];

export const AppSidebar = ({ role, accentColor }) => {
    const items = role === "member" ? memberNav : leaderNav;
    const location = useLocation();
    const { t, dir } = useI18n();
    const { memberId, leaderId } = useParams();
    const userId = memberId || leaderId;

    // Custom inline style overrides if an accentColor is provided
    const customActiveStyle = accentColor ? {
        color: accentColor,
        backgroundColor: "var(--sidebar-accent, hsl(var(--accent) / 0.15))",
    } : undefined;

    // Function to add ID to navigation paths
    const getPathWithId = (path) => {
        if (userId && (path.includes('/member') || path.includes('/leader'))) {
            const parts = path.split('/');
            if (parts.length === 2) {
                return `${path}/${userId}`;
            } else if (parts.length === 3) {
                return `/${parts[1]}/${userId}/${parts[2]}`;
            }
        }
        return path;
    };

    return (
        <>
            {/* Desktop Sidebar - always visible on larger screens */}
            <aside className={cn(
                "hidden lg:flex flex-col border-e border-gray-200 text-gray-800 bg-white w-64 h-screen sticky top-0",
                dir === "rtl" ? "border-e" : "border-e"
            )}>
                <div className="flex items-center px-5 h-16 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <Logo className="size-10"/>
                        <div className="leading-tight">
                            <p
                                className="font-serif text-lg"
                                style={accentColor ? { color: accentColor } : undefined}
                            >
                                {!accentColor && <span className="text-gold"></span>}
                                <span className={!accentColor ? "text-gold" : ""}>{t("brand.name")}</span>
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">{t("brand.portal")}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-6 space-y-1">
                    <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.25em] text-gray-500">
                        {role === "member" ? t("side.scout") : t("side.leadership")}
                    </p>
                    {items.map((item) => {
                        const pathWithId = getPathWithId(item.to);
                        const active = location.pathname === pathWithId;
                        return (
                            <NavLink
                                key={item.to}
                                to={pathWithId}
                                style={active && accentColor ? customActiveStyle : undefined}
                                className={cn(
                                    "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                                    active
                                        ? (accentColor ? "" : "bg-[#D4AF37]/10 text-[#D4AF37]")
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                {active && (
                                    <span
                                        className={cn("absolute top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-e shadow-glow", dir === "rtl" ? "right-0" : "left-0")}
                                        style={accentColor ? { backgroundColor: accentColor } : { backgroundColor: "var(--gold)" }}
                                    />
                                )}
                                <item.icon className="size-5" strokeWidth={1.75}/>
                                {t(item.key)}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="m-3 rounded-2xl border border-gray-200 shadow-[0_0_6px_rgba(0,0,0,0.05)] bg-gray-50 p-4">
                    <p
                        className="text-[10px] uppercase tracking-[0.25em] mb-2"
                        style={accentColor ? { color: accentColor } : { color: "var(--gold)" }}
                    >
                        {t("side.oathTitle")}
                    </p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                        {t("side.oathBody")}
                    </p>
                </div>
            </aside>
        </>
    );
};