import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Crest } from "@/components/Crest";
import { Button } from "@/components/ui/button";
import { Bell, Lock, LogOut, ShieldCheck, User, Settings as SettingsIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMemberData } from "@/hooks/useMemberData";
import { authService } from "@/services/authService";
import { getAccentColorBySubgroupId } from "@/utils/accentColors";
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
    const { data: memberData, isLoading } = useMemberData();
    const [accentColor, setAccentColor] = useState('#4A7DFF'); // Default blue

    useEffect(() => {
        if (memberData?.subgroupId) {
            const subgroupAccentColor = getAccentColorBySubgroupId(memberData.subgroupId);
            setAccentColor(subgroupAccentColor || '#4A7DFF');
        }
    }, [memberData?.subgroupId]);

    const profile = memberData ? memberData : {};

    console.log(profile);

    const handleSignOut = async () => {
        await authService.signOut();
        navigate("/");
    };

    return (
        <div className="min-h-screen flex bg-[#F4F6FB]">
            <AppSidebar role={role} accentColor={accentColor}/>
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-0">
                <Topbar
                    name={profile.fullName || profile.name}
                    rank={profile.rank}
                    subgroup={profile.subgroupName || t("groups.scouts.name")}
                    initials={profile.initials}
                    accentColor={accentColor}
                />

                <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
                    <DashboardPageTitle
                        title={t("set.title")}
                        subtitle={t("set.kicker")}
                        accentColor={accentColor}
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
                                        <p className="text-[22px] font-bold text-[#1E2A45]">{profile.fullName}</p>
                                        <p className="text-xs uppercase tracking-[0.25em] text-[#4A7DFF] mt-1">{profile.rank}</p>
                                        
                                        {
                                            /*
                                        <Button variant="ds-secondary" size="sm" className="mt-3">
                                            {t("set.changePhoto")}
                                        </Button>
                                        */
                                        }

                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.25em] text-[#8A94A6]">
                                            {t("set.field.name")}
                                        </label>
                                        <input
                                            defaultValue={profile.fullName}
                                            readOnly
                                            className="mt-1.5 w-full bg-[#F4F6FB] border border-[#E8ECF4] rounded-xl px-3 py-2 focus:outline-none  text-sm text-[#8A94A6]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.25em] text-[#8A94A6]">
                                            {"id"}
                                        </label>
                                        <input
                                            defaultValue={profile.id}
                                            readOnly
                                            className="mt-1.5 w-full bg-[#F4F6FB] border border-[#E8ECF4] rounded-xl px-3 py-2 text-sm focus:outline-none  text-[#8A94A6]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.25em] text-[#8A94A6]">
                                            {t("set.field.subgroup")}
                                        </label>
                                        <input
                                            defaultValue={profile.subgroupName}
                                            readOnly
                                            className="mt-1.5 w-full bg-[#F4F6FB]/40 border border-[#E8ECF4] rounded-xl px-3 py-2 focus:outline-none  text-sm text-[#8A94A6]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.25em] text-[#8A94A6]">
                                            {t("set.field.rank")}
                                        </label>
                                        <input
                                            defaultValue={profile.unitName}
                                            readOnly
                                            className="mt-1.5 w-full bg-[#F4F6FB]/40 border border-[#E8ECF4] rounded-xl px-3 py-2 focus:outline-none  text-sm text-[#8A94A6]"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <Button variant="ds-primary" size="sm">{t("set.save")}</Button>
                                </div>
                            </section>

                            

                            {/* Security */}
                            <section id="security" className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
                                <div className="flex items-center gap-2 mb-5">
                                    <ShieldCheck className="size-4 text-[#4A7DFF]"/>
                                    <h2 className="text-[18px] font-semibold text-[#253858]">{t("set.section.security")}</h2>
                                </div>

                                <div className="space-y-4">
                                    

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
