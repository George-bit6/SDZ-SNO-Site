import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
    const location = useLocation();
    const { t } = useI18n();
    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);
    return (<div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="size-20 rounded-full bg-background flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground">404</span>
          </div>
        </div>
        <h1 className="mb-4 text-3xl sm:text-4xl font-bold">{t("nf.title")}</h1>
        <p className="mb-6 text-lg sm:text-xl text-muted-foreground">{t("nf.body")}</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 text-sm font-medium transition-colors"
        >
          <Home className="size-4" />
          {t("nf.home")}
        </Link>
      </div>
    </div>);
};
export default NotFound;
