import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Users, Settings, Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/I18nProvider";
import { useParams } from "react-router-dom";
import { useSidebar } from "@/App";

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
    const { isOpen, setIsOpen, toggleSidebar, closeSidebar } = useSidebar();
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

    // Export the toggle function for the Topbar (backward compatibility)
    if (typeof window !== 'undefined') {
        window.toggleMobileMenu = toggleSidebar;
    }

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
            {/* Overlay - visible when sidebar is open on mobile/tablet */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar - responsive behavior */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 flex flex-col border-e border-gray-200 text-gray-800 transition-transform duration-300 bg-white",
                // Mobile/tablet: overlay behavior
                "lg:w-64 w-full max-w-sm",
                // Desktop: toggleable without overlay, push content
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200">
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
                    <button
                        onClick={closeSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
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
                                onClick={closeSidebar}
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
                                <item.icon className="size-4" strokeWidth={1.75}/>
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

            {/* Content margin adjustment when sidebar is open on desktop */}
            {isOpen && (
                <div className="hidden lg:block fixed inset-0 left-64 pointer-events-none" />
            )}
        </>
    );
};