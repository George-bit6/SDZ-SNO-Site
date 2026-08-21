import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Crest } from "@/components/Crest";
import { Button } from "@/components/ui/button";
import { Bell, Lock, LogOut, ShieldCheck, User, Settings as SettingsIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { leaderDataService } from "@/services/leaderDataService";
import { authService } from "@/services/authService";
import DashboardPageTitle from "@/components/dashboardComponents/DashboardPageTitle";

const Toggle = ({ on, onChange }) => (
    <button
        onClick={onChange}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-[#4A7DFF]" : "bg-[#E8ECF4]"}`}
        aria-pressed={on}
    >
        <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${on ? "start-[22px]" : "start-0.5"}`}/>
    </button>
);

const Settings = ({ role }) => {
    const { t, lang, setLang } = useI18n();
    const navigate = useNavigate();
    const { leaderId } = useParams();
    const [notifTasks, setNotifTasks] = useState(true);
    const [notifReviews, setNotifReviews] = useState(true);
    const [notifEvents, setNotifEvents] = useState(false);
    const [notifEmail, setNotifEmail] = useState(true);
    const [leader, setLeader] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadLeaderData = async () => {
            if (!leaderId) {
                setLeader(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const leaderData = await leaderDataService.getLeaderById(leaderId);
                
                if (isMounted && leaderData) {
                    setLeader(leaderDataService.formatLeaderData(leaderData));
                }
            } catch (error) {
                console.error("Error loading leader data:", error);
                if (isMounted) {
                    setLeader(null);
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

    const profile = leader || { 
        name: "Loading...", 
        initials: "LD", 
        rank: t("rank.subleader"), 
        email: "",
        unitName: t("groups.scouts.name"),
        unitTitle: "Leader"
    };

    const handleSignOut = async () => {
        await authService.signOut();
        navigate("/");
    };

    return (
        <div className="min-h-screen flex bg-[#F4F6FB]">
            <AppSidebar role={role}/>
            <div className="flex-1 flex flex-col min-w-0">
                <Topbar name={profile.name} rank={profile.rank} subgroup={t("groups.scouts.name")} initials={profile.initials}/>

                <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
                    <DashboardPageTitle
                        title={t("set.title")}
                        subtitle={t("set.kicker")}
                        accentColor="#4A7DFF"
                    />

                    <div className="grid lg:grid-cols-[280px_1fr] gap-6 max-w-5xl">
                        <aside className="space-y-3 hidden lg:block">
                            {[
                                { icon: User, label: t("set.section.profile"), id: "profile" },
                                { icon: Bell, label: t("set.section.notifications"), id: "notifications" },
                                { icon: ShieldCheck, label: t("set.section.security"), id: "security" },
                            ].map((s) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#8A94A6] hover:bg-white hover:text-[#1E2A45] border border-transparent hover:border-[#E8ECF4] transition-colors"
                                >
                                    <s.icon className="size-4"/>
                                    {s.label}
                                </a>
                            ))}
                        </aside>

                        <div className="space-y-6">
                            {/* Profile */}
                            <section id="profile" className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
                                <div className="flex items-center gap-2 mb-5">
                                    <User className="size-4 text-[#4A7DFF]"/>
                                    <h2 className="text-[18px] font-semibold text-[#253858]">{t("set.section.profile")}</h2>
                                </div>

                                <div className="flex items-center gap-5 mb-6">
                                    <Crest initials={profile.initials} className="size-20"/>
                                    <div>
                                        <p className="text-[22px] font-bold text-[#1E2A45]">{profile.fullName || profile.name}</p>
                                        <p className="text-xs uppercase tracking-[0.25em] text-[#4A7DFF] mt-1">{profile.unitTitle || profile.rank}</p>
                                        <Button variant="ds-secondary" size="sm" className="mt-3">
                                            {t("set.changePhoto")}
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.25em] text-[#8A94A6]">
                                            {t("set.field.name")}
                                        </label>
                                        <input
                                            defaultValue={profile.fullName || profile.name}
                                            className="mt-1.5 w-full bg-[#F4F6FB] border border-[#E8ECF4] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#4A7DFF] focus:ring-1 focus:ring-[#4A7DFF]/40"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.25em] text-[#8A94A6]">
                                            {t("login.email")}
                                        </label>
                                        <input
                                            defaultValue={profile.email}
                                            className="mt-1.5 w-full bg-[#F4F6FB] border border-[#E8ECF4] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#4A7DFF] focus:ring-1 focus:ring-[#4A7DFF]/40"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.25em] text-[#8A94A6]">
                                            {t("set.field.subgroup")}
                                        </label>
                                        <input
                                            defaultValue={profile.unitName || t("groups.scouts.name")}
                                            readOnly
                                            className="mt-1.5 w-full bg-[#F4F6FB]/40 border border-[#E8ECF4] rounded-xl px-3 py-2 text-sm text-[#8A94A6]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.25em] text-[#8A94A6]">
                                            {t("set.field.rank")}
                                        </label>
                                        <input
                                            defaultValue={profile.unitTitle || profile.rank}
                                            readOnly
                                            className="mt-1.5 w-full bg-[#F4F6FB]/40 border border-[#E8ECF4] rounded-xl px-3 py-2 text-sm text-[#8A94A6]"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <Button variant="ds-primary" size="sm">{t("set.save")}</Button>
                                </div>
                            </section>

                            {/* Notifications */}
                            <section id="notifications" className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
                                <div className="flex items-center gap-2 mb-5">
                                    <Bell className="size-4 text-[#4A7DFF]"/>
                                    <h2 className="text-[18px] font-semibold text-[#253858]">{t("set.section.notifications")}</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium mb-3 text-[#1E2A45]">{t("set.language")}</p>
                                        <div className="flex gap-2">
                                            {["en", "ar"].map((l) => (
                                                <button
                                                    key={l}
                                                    onClick={() => setLang(l)}
                                                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
                                                        lang === l
                                                            ? "border-[#4A7DFF] text-[#4A7DFF] bg-[#EAF1FF]"
                                                            : "border-[#E8ECF4] text-[#8A94A6] hover:text-[#1E2A45]"
                                                    }`}
                                                >
                                                    {l === "en" ? "English" : "العربية"}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {[
                                        { label: t("set.notif.tasks"), on: notifTasks, set: setNotifTasks },
                                        { label: t("set.notif.reviews"), on: notifReviews, set: setNotifReviews },
                                        { label: t("set.notif.events"), on: notifEvents, set: setNotifEvents },
                                        { label: t("set.notif.email"), on: notifEmail, set: setNotifEmail },
                                    ].map((n) => (
                                        <div key={n.label} className="flex items-center justify-between py-2 border-b border-[#E8ECF4] last:border-0">
                                            <p className="text-sm text-[#1E2A45]">{n.label}</p>
                                            <Toggle on={n.on} onChange={() => n.set(!n.on)}/>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Security */}
                            <section id="security" className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
                                <div className="flex items-center gap-2 mb-5">
                                    <ShieldCheck className="size-4 text-[#4A7DFF]"/>
                                    <h2 className="text-[18px] font-semibold text-[#253858]">{t("set.section.security")}</h2>
                                </div>

                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-[#E8ECF4] hover:bg-[#F4F6FB]/50 transition-colors text-start">
                                        <div className="flex items-center gap-3">
                                            <Lock className="size-4 text-[#8A94A6]"/>
                                            <div>
                                                <p className="text-sm font-medium text-[#1E2A45]">{t("set.password")}</p>
                                                <p className="text-xs text-[#8A94A6]">{t("set.password.note")}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-[#4A7DFF]">{t("set.update")}</span>
                                    </button>

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center justify-between p-4 rounded-xl border border-[#E8ECF4] hover:bg-[#FF5C5C]/5 hover:border-[#FF5C5C]/40 transition-colors text-start"
                                    >
                                        <div className="flex items-center gap-3">
                                            <LogOut className="size-4 text-[#FF5C5C]"/>
                                            <div>
                                                <p className="text-sm font-medium text-[#FF5C5C]">{t("set.signout")}</p>
                                                <p className="text-xs text-[#8A94A6]">{t("set.signout.note")}</p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
