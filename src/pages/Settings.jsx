import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Crest } from "@/components/Crest";
import { Button } from "@/components/ui/button";
import { Bell, Globe, Lock, LogOut, Moon, Settings as SettingsIcon, ShieldCheck, Sun, User } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useTheme } from "@/components/ThemeProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const Toggle = ({ on, onChange }) => (<button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-gold" : "bg-muted"}`} aria-pressed={on}>
    <span className={`absolute top-0.5 size-5 rounded-full bg-background shadow transition-all ${on ? "start-[22px]" : "start-0.5"}`}/>
  </button>);
const Settings = () => {
    const { t, lang, setLang } = useI18n();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const role = location.state?.role === "leader" ? "leader" : "member";
    const [notifTasks, setNotifTasks] = useState(true);
    const [notifReviews, setNotifReviews] = useState(true);
    const [notifEvents, setNotifEvents] = useState(false);
    const [notifEmail, setNotifEmail] = useState(true);
    const isLeader = role === "leader";
    const profile = isLeader
        ? { name: "Tony Maalouf", initials: "TM", rank: t("rank.subleader"), email: "tony@antiochscouts.org" }
        : { name: "Elias Khoury", initials: "EK", rank: t("rank.senior"), email: "elias@antiochscouts.org" };
    return (<div className="min-h-screen flex bg-background">
      <AppSidebar role={role}/>
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name={profile.name} rank={profile.rank} subgroup={t("groups.scouts.name")} initials={profile.initials}/>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="mb-10 animate-fade-up max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
              <SettingsIcon className="inline size-3 me-2 -mt-0.5"/>
              {t("set.kicker")}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl">{t("set.title")}</h1>
            <p className="text-muted-foreground mt-2">{t("set.intro")}</p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-6 max-w-5xl">
            <aside className="space-y-3 hidden lg:block">
              {[
            { icon: User, label: t("set.section.profile"), id: "profile" },
            { icon: Globe, label: t("set.section.appearance"), id: "appearance" },
            { icon: Bell, label: t("set.section.notifications"), id: "notifications" },
            { icon: ShieldCheck, label: t("set.section.security"), id: "security" },
        ].map((s) => (<a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-card hover:text-foreground border border-transparent hover:border-border transition-colors">
                  <s.icon className="size-4"/>
                  {s.label}
                </a>))}
            </aside>

            <div className="space-y-6">
              {/* Profile */}
              <section id="profile" className="rounded-lg border border-border bg-card shadow-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <User className="size-4 text-gold"/>
                  <h2 className="font-serif text-xl">{t("set.section.profile")}</h2>
                </div>

                <div className="flex items-center gap-5 mb-6">
                  <Crest initials={profile.initials} className="size-20"/>
                  <div>
                    <p className="font-serif text-2xl">{profile.name}</p>
                    <p className="text-xs uppercase tracking-[0.25em] text-gold mt-1">{profile.rank}</p>
                    <Button variant="gold-outline" size="sm" className="mt-3">
                      {t("set.changePhoto")}
                    </Button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t("set.field.name")}
                    </label>
                    <input defaultValue={profile.name} className="mt-1.5 w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"/>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t("login.email")}
                    </label>
                    <input defaultValue={profile.email} className="mt-1.5 w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"/>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t("set.field.subgroup")}
                    </label>
                    <input defaultValue={t("groups.scouts.name")} readOnly className="mt-1.5 w-full bg-background/40 border border-border rounded-md px-3 py-2 text-sm text-muted-foreground"/>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t("set.field.rank")}
                    </label>
                    <input defaultValue={profile.rank} readOnly className="mt-1.5 w-full bg-background/40 border border-border rounded-md px-3 py-2 text-sm text-muted-foreground"/>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="hero" size="sm">{t("set.save")}</Button>
                </div>
              </section>

              {/* Appearance */}
              <section id="appearance" className="rounded-lg border border-border bg-card shadow-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Globe className="size-4 text-gold"/>
                  <h2 className="font-serif text-xl">{t("set.section.appearance")}</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-medium mb-3">{t("set.language")}</p>
                    <div className="flex gap-2">
                      {["en", "ar"].map((l) => (<button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-md text-sm border transition-colors ${lang === l
                ? "border-gold text-gold bg-gold/10"
                : "border-border text-muted-foreground hover:text-foreground"}`}>
                          {l === "en" ? "English" : "العربية"}
                        </button>))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-border">
                    <div>
                      <p className="text-sm font-medium flex items-center gap-2">
                        {theme === "dark" ? <Moon className="size-4"/> : <Sun className="size-4"/>}
                        {t("set.theme")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {theme === "dark" ? t("toggle.theme.toLight") : t("toggle.theme.toDark")}
                      </p>
                    </div>
                    <Toggle on={theme === "dark"} onChange={toggleTheme}/>
                  </div>
                </div>
              </section>

              {/* Notifications */}
              <section id="notifications" className="rounded-lg border border-border bg-card shadow-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Bell className="size-4 text-gold"/>
                  <h2 className="font-serif text-xl">{t("set.section.notifications")}</h2>
                </div>

                <div className="space-y-4">
                  {[
            { label: t("set.notif.tasks"), on: notifTasks, set: setNotifTasks },
            { label: t("set.notif.reviews"), on: notifReviews, set: setNotifReviews },
            { label: t("set.notif.events"), on: notifEvents, set: setNotifEvents },
            { label: t("set.notif.email"), on: notifEmail, set: setNotifEmail },
        ].map((n) => (<div key={n.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <p className="text-sm">{n.label}</p>
                      <Toggle on={n.on} onChange={() => n.set(!n.on)}/>
                    </div>))}
                </div>
              </section>

              {/* Security */}
              <section id="security" className="rounded-lg border border-border bg-card shadow-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <ShieldCheck className="size-4 text-gold"/>
                  <h2 className="font-serif text-xl">{t("set.section.security")}</h2>
                </div>

                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 rounded-md border border-border hover:bg-background/50 transition-colors text-start">
                    <div className="flex items-center gap-3">
                      <Lock className="size-4 text-muted-foreground"/>
                      <div>
                        <p className="text-sm font-medium">{t("set.password")}</p>
                        <p className="text-xs text-muted-foreground">{t("set.password.note")}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gold">{t("set.update")}</span>
                  </button>

                  <button onClick={() => navigate("/")} className="w-full flex items-center justify-between p-4 rounded-md border border-border hover:bg-crimson/5 hover:border-crimson/40 transition-colors text-start">
                    <div className="flex items-center gap-3">
                      <LogOut className="size-4 text-crimson"/>
                      <div>
                        <p className="text-sm font-medium text-crimson">{t("set.signout")}</p>
                        <p className="text-xs text-muted-foreground">{t("set.signout.note")}</p>
                      </div>
                    </div>
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>);
};
export default Settings;
