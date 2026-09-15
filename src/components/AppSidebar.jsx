import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Users, Settings, Trophy, X, Shield, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/I18nProvider";
import { useParams } from "react-router-dom";
import { useSidebar } from "@/App";
import { useUserRole } from "@/contexts/UserRoleContext";
import { useState } from "react";

const memberNav = [
    { to: "/member", icon: LayoutDashboard, key: "side.dashboard" },
    { to: "/member/tasks", icon: ClipboardList, key: "side.tasks" },
    { to: "/member/settings", icon: Settings, key: "side.settings" },
];

const leaderNav = [
    { to: "/leader", icon: LayoutDashboard, key: "side.overview" },
    { to: "/leader/members", icon: Users, key: "side.members" },
    { to: "/leader/tasks", icon: ClipboardList, key: "side.allTasks" },
    { to: "/leader/settings", icon: Settings, key: "side.settings" },
];

const adminNav = [
    { to: "/admin", icon: LayoutDashboard, key: "side.overview" },
    { to: "/admin/users", icon: Users, key: "side.members" },
    { to: "/admin/settings", icon: Settings, key: "side.settings" },
];

export const AppSidebar = ({ role, accentColor }) => {
    const { isOpen, setIsOpen, toggleSidebar, closeSidebar } = useSidebar();
    const location = useLocation();
    const { t, dir } = useI18n();
    const { memberId, leaderId, adminId } = useParams();
    const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
    
    // Try to use user role context, but handle case where it's not available
    let currentRole = null;
    let availableRoles = [];
    let switchRole = null;
    let userId = null;
    
    try {
        const userRoleContext = useUserRole();
        currentRole = userRoleContext.currentRole;
        availableRoles = userRoleContext.availableRoles;
        switchRole = userRoleContext.switchRole;
        userId = userRoleContext.userId;
    } catch (e) {
        // Context not available, use props instead
        console.log('UserRoleContext not available in sidebar');
    }
    
    const currentUserId = memberId || leaderId || adminId || userId;
    
    // Use current role from context if available, otherwise use prop
    const activeRole = currentRole || role;
    
    // Get navigation items based on current role
    const items = activeRole === "member" ? memberNav : activeRole === "admin" ? adminNav : leaderNav;

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
        if (currentUserId && (path.includes('/member') || path.includes('/leader') || path.includes('/admin'))) {
            const parts = path.split('/');
            if (parts.length === 2) {
                return `${path}/${currentUserId}`;
            } else if (parts.length === 3) {
                return `/${parts[1]}/${currentUserId}/${parts[2]}`;
            }
        }
        return path;
    };

    // Handle role switching
    const handleRoleSwitch = (newRole) => {
        if (switchRole) {
            switchRole(newRole);
        }
        setShowRoleSwitcher(false);
        
        // Navigate to the appropriate dashboard for the new role
        const newPath = `/${newRole}/${currentUserId}`;
        window.location.href = newPath; // Use window.location for full page reload to ensure context updates
    };

    // Get role display name and icon
    const getRoleInfo = (role) => {
        switch (role) {
            case 'admin':
                return { name: 'Admin', icon: Shield, color: '#4A7DFF' };
            case 'groupLeader':
                return { name: 'Group Leader', icon: Trophy, color: '#8B5CF6' };
            case 'leader':
                return { name: 'Leader', icon: Users, color: '#F59E0B' };
            case 'member':
                return { name: 'Member', icon: User, color: '#10B981' };
            default:
                return { name: 'Unknown', icon: User, color: '#6B7280' };
        }
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
                        {activeRole === "member" ? t("side.scout") : activeRole === "admin" ? "Administration" : t("side.leadership")}
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

                    {/* Role Switcher - Only show if user has multiple roles */}
                    {availableRoles && availableRoles.length > 1 && (
                        <div className="mt-6 px-3">
                            <button
                                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                                className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Shield className="size-4" strokeWidth={1.75}/>
                                    <span>Switch Role</span>
                                </div>
                                <ChevronDown className={cn("size-4 transition-transform", showRoleSwitcher ? "rotate-180" : "")} />
                            </button>
                            
                            {showRoleSwitcher && (
                                <div className="mt-2 space-y-1 ml-4">
                                    {availableRoles.map((role) => {
                                        const roleInfo = getRoleInfo(role);
                                        const isActive = activeRole === role;
                                        const RoleIcon = roleInfo.icon;
                                        
                                        return (
                                            <button
                                                key={role}
                                                onClick={() => handleRoleSwitch(role)}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                                                    isActive
                                                        ? "bg-gray-100 text-gray-900 font-medium"
                                                        : "text-gray-600 hover:bg-gray-50"
                                                )}
                                            >
                                                <RoleIcon className="size-4" strokeWidth={1.75} style={{ color: roleInfo.color }}/>
                                                <span>{roleInfo.name}</span>
                                                {isActive && (
                                                    <span className="ml-auto text-xs text-gray-500">(Current)</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
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