import {Users, MoreHorizontal} from "lucide-react";
import { Crest } from "@/components/Crest";
import {useI18n} from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";


export default function MembersTable(props){

    const {t} = useI18n();

    return (
        <section className="rounded-lg  bg-card border-black/5 border shadow-[0_0_6px_rgba(0,0,0,0.1)]  overflow-hidden">
                            <header className="px-6 py-4 border-b border-border flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="size-4" style={{color: props.accentColor}} />
                                    <h2 className="font-serif text-xl">{t("ld.members")}</h2>
                                    <span className="text-xs text-muted-foreground">· {props.members.length}</span>
                                </div>
                                <input placeholder={t("ld.searchMembers")} className="bg-background border border-border rounded-md px-3 py-1.5 text-xs w-48 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40" />
                            </header>

                            {/* Scrollable table showing member details. */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-background/50">
                                        <tr className="text-start text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                            <th className="py-3 px-6 font-medium text-start">{t("ld.col.member")}</th>
                                            <th className="py-3 px-2 font-medium text-start">{t("ld.col.tasks")}</th>
                                            <th className="py-3 px-2 font-medium text-start">{t("ld.col.progress")}</th>
                                            <th className="py-3 px-2 font-medium text-start">{t("ld.col.last")}</th>
                                            <th className="py-3 px-6 font-medium text-end">{t("ld.col.actions")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.members.map((m) => (
                                            <tr key={m.name} className="border-t border-border hover:bg-background/40 transition-colors">
                                                <td className="py-3 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <Crest initials={m.initials} variant="muted" className="size-9" />
                                                        <div>
                                                            <p className="font-medium leading-tight">{m.name}</p>
                                                            <p className="text-xs text-muted-foreground">{m.rank}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2 text-muted-foreground">
                                                    {m.done}<span className="opacity-50">/{m.assigned}</span>
                                                </td>
                                                <td className="py-3 px-2 min-w-[160px]">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                                            <div className="h-full bg-gradient-gold" style={{ width: `${m.progress}%` }} />
                                                        </div>
                                                        <span className="text-xs w-9 text-end text-muted-foreground">{m.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2 text-xs text-muted-foreground">{m.last}</td>
                                                <td className="py-3 px-6 text-end">
                                                    <Button size="sm" variant="ghost" className={`hover:bg-${accentColor}`} style={{color: accentColor}}>
                                                        {t("ld.assignBtn")}
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="size-8">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
    )
}