import { Bell, Search } from "lucide-react";
import { Crest } from "./Crest";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "@/i18n/I18nProvider";
export const Topbar = ({ name, rank, subgroup, initials }) => {
    const { t } = useI18n();
    return (<header className="flex align-items h-16 shrink-0 border-b border-border  border-black/15 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 px-4 md:px-8 flex items-center justify-between">
      

      <div className="flex items-center gap-3">
        <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs">
          <span className="size-1.5 rounded-full bg-gold"/>
          <span className="text-gold tracking-wide">{subgroup}</span>
        </span>

        <LanguageToggle />
        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4"/>
          <span className="absolute top-2 end-2 size-1.5 rounded-full bg-crimson"/>
        </Button>

        <div className="flex items-center gap-3 ps-3 border-s border-border">
          <div className="text-end hidden sm:block">
            <p className="text-sm font-medium leading-tight">{name}</p>
            <p className="text-xs text-muted-foreground">{rank}</p>
          </div>
          <Crest initials={initials} className="size-9"/>
        </div>
      </div>
    </header>);
};
