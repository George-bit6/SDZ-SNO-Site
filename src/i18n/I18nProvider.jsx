import { createContext, useContext, useEffect, useState } from "react";
import { dictionary } from "./dictionary";
const I18nContext = createContext(undefined);
const STORAGE_KEY = "antioch-lang";
export const I18nProvider = ({ children }) => {
    const [lang, setLangState] = useState(() => {
        if (typeof window === "undefined")
            return "en";
        return localStorage.getItem(STORAGE_KEY) || "en";
    });
    const dir = lang === "ar" ? "rtl" : "ltr";
    useEffect(() => {
        const html = document.documentElement;
        html.lang = lang;
        html.dir = dir;
        html.classList.toggle("font-arabic", lang === "ar");
        localStorage.setItem(STORAGE_KEY, lang);
    }, [lang, dir]);
    const t = (key, vars) => {
        let str = dictionary[lang][key] ?? dictionary.en[key] ?? key;
        if (vars) {
            Object.entries(vars).forEach(([k, v]) => {
                str = str.replace(`{${k}}`, String(v));
            });
        }
        return str;
    };
    const setLang = (l) => setLangState(l);
    const toggleLang = () => setLangState((l) => (l === "en" ? "ar" : "en"));
    return (<I18nContext.Provider value={{ lang, dir, toggleLang, setLang, t }}>
      {children}
    </I18nContext.Provider>);
};
export const useI18n = () => {
    const ctx = useContext(I18nContext);
    if (!ctx)
        throw new Error("useI18n must be used within I18nProvider");
    return ctx;
};
