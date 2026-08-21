import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Heart } from "lucide-react";
import stDemetriosLogo from "@/assets/stDemetriosLogo 1.png";
import snoLogo from "@/assets/sno-logo 1.png";
import { useI18n } from "@/i18n/I18nProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Logo } from "@/components/Logo";
import { authService } from "@/services/authService";

const Login = () => {
  const [error, setError] = useState("");
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await authService.signIn(email, password);

    if (result.success) {
      const userId = await authService.getUserId();
      console.log("User ID:", userId); // Log the user ID for debugging
      
      // Determine user role from database
      const userRole = await authService.getUserRole(userId);
      console.log("User Role:", userRole);
      
      if (userRole === 'leader') {
        navigate(`/leader/${userId}`);
      } else if (userRole === 'member') {
        navigate(`/member/${userId}`);
      } else {
        setError("User role not found in database. Please contact administrator.");
      }
    } else {
      setError(result.error || t("login.error") || "Invalid email or password");
    }
  };

  const clearError = () => setError("");

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{
      backgroundColor: '#ffffff',
      background: 'radial-gradient(circle, transparent 20%, #ffffff 20%, #ffffff 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #ffffff 20%, #ffffff 80%, transparent 80%, transparent) 20px 20px, linear-gradient(#d8b98a 1.6px, transparent 1.6px) 0 -0.8px, linear-gradient(90deg, #d8b98a 1.6px, #ffffff 1.6px) -0.8px 0',
      backgroundSize: '40px 40px, 40px 40px, 20px 20px, 20px 20px'
    }}>
      {/* Navigation - Simplified for login page */}
      <header className="relative z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Left */}
            <Link to="/" className="flex items-center gap-3">
              <Logo className="size-8 text-gray-900" />
              <div className="leading-tight">
                <p className="font-medium text-gray-900 text-sm">Saint Demetrios</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500">
                  Orthodox Church
                </p>
              </div>
            </Link>

            {/* CTA Button Right */}
            <div className="flex items-center gap-4">
              <LanguageToggle className="text-gray-600 hover:text-gray-900" />
              <Button asChild size="sm" className="rounded-full bg-crimson hover:bg-crimson/90 text-white hidden sm:inline-flex">
                <a href="#donate">
                  <Heart className="size-3.5" /> Donate
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-16 py-20">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-200">
            {/* Logos */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="size-20 rounded-full bg-white flex items-center justify-center border-2 border-gray-200 overflow-hidden p-2 shadow-md">
                <img
                  src={stDemetriosLogo}
                  alt="St. Demetrios logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="size-20 rounded-full bg-white flex items-center justify-center border-2 border-gray-200 overflow-hidden p-2 shadow-md">
                <img
                  src={snoLogo}
                  alt="SNO logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-[32px] sm:text-[36px] font-medium leading-[1.15] tracking-[-0.01em] text-gray-900 mb-2">
                {t("login.title")}
              </h1>
              <p className="text-[16px] leading-[1.6] text-gray-600">
                {t("login.subtitle")}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs uppercase tracking-wider text-gray-600"
                >
                  {t("login.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  onChange={clearError}
                  placeholder="Enter Your Email"
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-gray-400 focus-visible:border-gray-400 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs uppercase tracking-wider text-gray-600"
                >
                  {t("login.password")}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={clearError}
                  placeholder="••••••••"
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-gray-400 focus-visible:border-gray-400 h-11"
                />
              </div>

              <div className="flex items-center justify-end text-xs">
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                  {t("login.forgot")}
                </a>
              </div>

              <Button type="submit" className="bg-gray-900 text-white rounded-full px-7 py-3.5 font-medium hover:shadow-[0_6px_16px_rgba(0,0,0,0.18)] transition-shadow w-full h-12 text-base">
                {t("login.submit")} <ArrowRight className="size-5 ml-2" />
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm mb-3">
                Don't have an account?
              </p>
              <Button asChild variant="outline" className="rounded-full px-6 py-3 font-medium hover:bg-gray-50 w-full h-11 border-gray-300 text-gray-900">
                <Link to="/signup">
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>

          {/* Back to Home */}
          <Link
            to="/"
            className="mt-6 block text-center text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-gray-900 transition-colors"
          >
            {t("login.back")}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
