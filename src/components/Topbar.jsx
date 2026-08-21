import { Bell, Search, Menu } from "lucide-react";
import { Crest } from "./Crest";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "@/i18n/I18nProvider";
import { useSidebar } from "@/App";

export const Topbar = ({ name, rank, subgroup, initials, accentColor = "#D4AF37" }) => {
    const { t } = useI18n();
    const { toggleSidebar } = useSidebar();

    return (
        <header className="flex h-16 shrink-0 border-b border-border border-black/15 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 px-4 md:px-8 items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Menu button - visible on all screen sizes */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    aria-label="Toggle menu"
                >
                    <Menu className="size-5" />
                </button>

                <span
                    className="hidden md:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs border"
                    style={{
                        borderColor: `${accentColor}4D`, // Adds 30% opacity (Hex 4D)
                        backgroundColor: `${accentColor}1A`, // Adds 10% opacity (Hex 1A)
                        color: accentColor
                    }}
                >
                    <span
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: accentColor }}
                    />
                    <span className="tracking-wide">
                        {subgroup}
                    </span>
                </span>

                <LanguageToggle className="hidden md:inline-flex" />

                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="size-4"/>
                    <span className="absolute top-2 end-2 size-1.5 rounded-full bg-crimson"/>
                </Button>

                <div className="flex items-center gap-3 ps-3 border-s border-border">
                    <div className="text-end hidden sm:block">
                        <p className="text-sm font-medium leading-tight">{name}</p>
                        <p className="text-xs text-muted-foreground">{rank}</p>
                    </div>
                    <Crest initials={initials} accentColor={accentColor} className="size-9"/>
                </div>
            </div>
        </header>
    );
};