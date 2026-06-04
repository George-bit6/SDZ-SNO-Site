import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Award, Users, CalendarDays, Settings, Shield, Trophy, CalendarRange, Boxes, } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/I18nProvider";
const memberNav = [
    { to: "/member", icon: LayoutDashboard, key: "side.dashboard" },
    { to: "/member/tasks", icon: ClipboardList, key: "side.tasks" },
    { to: "/member/leaderboard", icon: Trophy, key: "side.leaderboard" },
    { to: "/member/badges", icon: Award, key: "side.badges" },
    { to: "/member/events", icon: CalendarDays, key: "side.events" },
    { to: "/settings", icon: Settings, key: "side.settings" },
];
const leaderNav = [
    { to: "/leader", icon: LayoutDashboard, key: "side.overview" },
    { to: "/leader/members", icon: Users, key: "side.members" },
    { to: "/leader/tasks", icon: ClipboardList, key: "side.allTasks" },
    { to: "/leader/leaderboard", icon: Trophy, key: "side.leaderboard" },
    { to: "/leader/programs", icon: CalendarRange, key: "side.programs" },
    { to: "/leader/inventory", icon: Boxes, key: "side.inventory" },
    { to: "/leader/reviews", icon: Shield, key: "side.reviews" },
    { to: "/settings", icon: Settings, key: "side.settings" },
];
export const AppSidebar = ({ role }) => {
    const items = role === "member" ? memberNav : leaderNav;
    const location = useLocation();
    const { t, dir } = useI18n();
    return (<aside className="hidden md:flex w-64 shrink-0 flex-col border-e border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border">
        <Logo className="size-10"/>
        <div className="leading-tight">
          <p className="font-serif text-lg text-gold">{t("brand.name")}</p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-sidebar-foreground/60">{t("brand.portal")}</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.25em] text-sidebar-foreground/50">
          {role === "member" ? t("side.scout") : t("side.leadership")}
        </p>
        {items.map((item) => {
            const active = location.pathname === item.to;
            return (<NavLink key={item.to} to={item.to} className={cn("relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors", active
                    ? "bg-sidebar-accent text-gold"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground")}>
              {active && (<span className={cn("absolute top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-e bg-gold shadow-glow", dir === "rtl" ? "right-0" : "left-0")}/>)}
              <item.icon className="size-4" strokeWidth={1.75}/>
              {t(item.key)}
            </NavLink>);
        })}
      </nav>

      <div className="m-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">{t("side.oathTitle")}</p>
        <p className="text-xs text-sidebar-foreground/70 leading-relaxed">
          {t("side.oathBody")}
        </p>
      </div>
    </aside>);
};
