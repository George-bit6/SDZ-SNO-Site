import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Shield } from "lucide-react";
import heroEmblem from "@/assets/stDemetriosIcon.png";
import { useI18n } from "@/i18n/I18nProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import submit from "@/processes/auth";

const Login = () => {
  const [role, setRole] = useState("member");
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const success = await submit(email, password);

    if (success) {
      navigate(role === "member" ? "/member" : "/leader");
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div
        className=" absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url(${heroEmblem})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 from-background/40 via-transparent to-background/80" />

      <div className="absolute top-4 end-4 flex items-center gap-1 z-10">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className=" relative w-full max-w-md">
        <Link
          to="/"
          className="mb-16 block text-center text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors mb-6"
        >
          {t("login.back")}
        </Link>

        <div className="relative">
          <div className="absolute -top-10 inset-x-0 flex justify-center">
            <div className="size-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow border-4 border-background">
              <Shield
                className="size-9 text-primary-foreground"
                strokeWidth={1.5}
              />
            </div>
            <div className="size-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow border-4 border-background">
              <Shield
                className="size-9 text-primary-foreground"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card shadow-card pt-16 pb-8 px-8">
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl mb-1">{t("login.title")}</h1>
              <p className="text-sm text-muted-foreground">
                {t("login.subtitle")}
              </p>
              <div className="gold-divider w-16 mx-auto mt-4" />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs uppercase tracking-wider text-muted-foreground"
                >
                  {t("login.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Your Email"
                  className="bg-background border-border focus-visible:ring-gold focus-visible:border-gold h-11"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs uppercase tracking-wider text-muted-foreground"
                >
                  {t("login.password")}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="bg-background border-border focus-visible:ring-gold focus-visible:border-gold h-11"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex gap-1 rounded-md border border-border p-0.5">
                  <Button
                    type="button"
                    name="memberSetterButton"
                    onClick={() => setRole("member")}
                    className={`px-3 py-1 rounded text-xs transition-colors ${role === "member" ? "bg-gold text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {t("login.role.scout")}
                  </Button>
                  <Button
                    type="button"
                    name="leaderSetterButton"
                    onClick={() => setRole("leader")}
                    className={`px-3 py-1 rounded text-xs transition-colors ${role === "leader" ? "bg-gold text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {t("login.role.leader")}
                  </Button>
                </div>
                <a href="#" className="text-muted-foreground hover:text-gold">
                  {t("login.forgot")}
                </a>
              </div>

              <Button type="submit" variant="hero" className=" w-full h-11">
                {t("login.submit")} <ArrowRight className="rtl-flip" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
