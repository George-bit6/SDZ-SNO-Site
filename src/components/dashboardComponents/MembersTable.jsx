import {Users} from "lucide-react";
import { Crest } from "@/components/Crest";
import {useI18n} from "@/i18n/I18nProvider";

// Helper function to calculate age from birthdate
const calculateAge = (birthdate) => {
    if (!birthdate) return "N/A";
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

// Helper function to format date
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function MembersTable(props){
    const {t} = useI18n();
    const accentColor = props.accentColor || '#4A7DFF';

    return (
        <section className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                            <header className="px-6 py-4 border-b border-[#E8ECF4] flex items-center justify-between flex-wrap gap-3">
                                <div className="flex items-center gap-2">
                                    <Users className="size-4" style={{color: accentColor}}/>
                                    <h2 className="text-[18px] font-semibold text-[#253858]">{t("ld.members")}</h2>
                                    <span className="text-xs text-[#8A94A6]">· {props.members.length}</span>
                                </div>
                            </header>

                            {/* Scrollable table showing member details. */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-[#F4F6FB]/50">
                                        <tr className="text-[10px] uppercase tracking-[0.2em] text-[#8A94A6]">
                                            <th className="py-3 px-6 font-medium text-start">{t("ld.col.member")}</th>
                                            <th className="py-3 px-2 font-medium text-start">{"subgroup"}</th>
                                            <th className="py-3 px-2 font-medium text-start">{"unit"}</th>
                                            <th className="py-3 px-2 font-medium text-start">{"age"}</th>
                                            <th className="py-3 px-2 font-medium text-start">{"unit role"}</th>
                                            <th className="py-3 px-2 font-medium text-start">{"date of membership"}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.members.map((m) => (
                                            <tr key={m.id || m.Scout_id || m.name} className="border-t border-[#E8ECF4] hover:bg-[#F4F6FB]/40 transition-colors">
                                                <td className="py-3 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <Crest initials={m.initials} variant="muted" className="size-9"/>
                                                        <div className="min-w-0">
                                                            <p className="font-medium leading-tight text-[#1E2A45]">{m.fullName || m.name}</p>
                                                            <p className="text-xs text-[#8A94A6]">{m.unitTitle || m.rank || "Scout"}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.subgroupName || "Unknown"}</td>
                                                <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.unitName || t("groups.scouts.name")}</td>
                                                <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.age || calculateAge(m.birthdate)}</td>
                                                <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.unitTitle || m.rank || "Scout"}</td>
                                                <td className="py-3 px-2 text-xs text-[#8A94A6]">{m.membershipDate ? formatDate(m.membershipDate) : "N/A"}</td>
                                            </tr>
                                        ))}
                                        {props.members.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="py-12 text-center text-sm text-[#8A94A6]">
                                                    {t("tasks.empty")}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
    )
}