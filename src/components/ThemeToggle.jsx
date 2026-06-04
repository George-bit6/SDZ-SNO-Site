import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (<Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="text-muted-foreground hover:text-gold">
      {theme === "dark" ? <Sun className="size-4"/> : <Moon className="size-4"/>}
    </Button>);
};
