import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import { useI18n } from "../i18n/i18nProvider";
export const LanguageToggle = () => {
  const { lang, toggleLang, t } = useI18n();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLang}
      aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
      className="text-muted-foreground hover:text-gold gap-1.5 px-2"
    >
      <Languages className="size-4" />
      <span className="text-xs font-medium">{t("toggle.lang")}</span>
    </Button>
  );
};
