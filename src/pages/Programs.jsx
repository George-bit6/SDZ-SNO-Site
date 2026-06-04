import { useMemo, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { CalendarDays, CalendarRange, Clock, Edit3, MapPin, Plus, Trash2, Users, ChevronRight, } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
const uid = () => Math.random().toString(36).slice(2, 9);
const SEED = [
    {
        id: uid(),
        title: "Year of the Cross · 2025–2026",
        scope: "year",
        startDate: "2025-09-01",
        endDate: "2026-08-31",
        subgroup: "groups.scouts.name",
        summary: "Annual formation arc focused on discipline, service, and faith — anchored by four seasonal camps and weekly mission cycles.",
        events: [
            {
                id: uid(),
                title: "Opening Liturgy & Investiture",
                date: "2025-09-13",
                time: "09:00",
                location: "St. Nicholas Cathedral · Beirut",
                type: "event",
                audience: "All subgroups",
                description: "The year begins with Divine Liturgy, the renewal of the Scout Oath, and investiture of new scouts.",
                schedule: [
                    { id: uid(), time: "08:30", title: "Assembly", details: "Full uniform · flag formation in the courtyard." },
                    { id: uid(), time: "09:00", title: "Divine Liturgy", details: "Procession with troop banners." },
                    { id: uid(), time: "11:00", title: "Investiture", details: "New scouts take the Oath; badges presented." },
                    { id: uid(), time: "12:30", title: "Agape Meal", details: "Shared meal hosted by the Pioneers." },
                ],
            },
        ],
    },
    {
        id: uid(),
        title: "Autumn Season · Discipline of the Path",
        scope: "season",
        startDate: "2025-09-15",
        endDate: "2025-12-15",
        subgroup: "groups.scouts.name",
        summary: "Twelve-week arc on woodcraft, navigation, and the rule of life.",
        events: [
            {
                id: uid(),
                title: "Patrol Skills Weekend",
                date: "2025-10-18",
                time: "07:00",
                location: "Cedars of Tannourine",
                type: "event",
                audience: "Scouts · Guides",
                description: "Two-day patrol camp covering knots, fire-craft, map & compass, and night watch.",
                schedule: [
                    { id: uid(), time: "07:00", title: "Departure", details: "Bus from parish hall." },
                    { id: uid(), time: "10:00", title: "Camp setup", details: "Patrol tents and gateway construction." },
                    { id: uid(), time: "14:00", title: "Skill stations", details: "Rotating: pioneering · navigation · first aid." },
                    { id: uid(), time: "20:30", title: "Campfire", details: "Songs, story of St. Demetrios, evening prayer." },
                ],
            },
        ],
    },
    {
        id: uid(),
        title: "October · Service & Stewardship",
        scope: "month",
        startDate: "2025-10-01",
        endDate: "2025-10-31",
        subgroup: "groups.guides.name",
        summary: "Monthly emphasis on parish service and care for the elderly.",
        events: [
            {
                id: uid(),
                title: "Weekly Meeting · Knots & Lashing",
                date: "2025-10-08",
                time: "17:30",
                location: "Parish Hall · Lower Room",
                type: "meeting",
                audience: "Guides",
                description: "Core skill meeting — square, diagonal, and shear lashing.",
                schedule: [
                    { id: uid(), time: "17:30", title: "Opening prayer & roll", details: "Patrol corners." },
                    { id: uid(), time: "17:45", title: "Skill instruction", details: "Demonstration by senior patrol." },
                    { id: uid(), time: "18:30", title: "Patrol challenge", details: "Build a signal tower in 20 minutes." },
                    { id: uid(), time: "19:00", title: "Closing & announcements", details: "Honor awards · dismissal." },
                ],
            },
        ],
    },
    {
        id: uid(),
        title: "Week of Nov 10 · Compass & Map",
        scope: "week",
        startDate: "2025-11-10",
        endDate: "2025-11-16",
        subgroup: "groups.scouts.name",
        summary: "Single-week sprint on orienteering ahead of the regional rally.",
        events: [
            {
                id: uid(),
                title: "Tuesday Meeting · Orienteering Drill",
                date: "2025-11-11",
                time: "17:30",
                location: "Parish Hall",
                type: "meeting",
                audience: "Scouts",
                description: "Indoor map reading and compass bearings.",
                schedule: [
                    { id: uid(), time: "17:30", title: "Warm-up", details: "Compass parts review." },
                    { id: uid(), time: "18:00", title: "Bearing drill", details: "Three-point triangulation challenge." },
                    { id: uid(), time: "18:45", title: "Debrief", details: "Patrol scoring · prayer." },
                ],
            },
        ],
    },
];
const SCOPES = ["year", "season", "month", "week"];
const formatRange = (a, b) => `${new Date(a).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} → ${new Date(b).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
const Programs = () => {
    const { t } = useI18n();
    const [programs, setPrograms] = useState(SEED);
    const [scope, setScope] = useState("all");
    const [selectedId, setSelectedId] = useState(SEED[0].id);
    const [progDialog, setProgDialog] = useState({ open: false });
    const [eventDialog, setEventDialog] = useState({
        open: false,
    });
    const filtered = useMemo(() => (scope === "all" ? programs : programs.filter((p) => p.scope === scope)), [programs, scope]);
    const selected = programs.find((p) => p.id === selectedId) ?? filtered[0];
    const stats = [
        { label: t("prog.stat.programs"), value: programs.length },
        { label: t("prog.stat.events"), value: programs.reduce((s, p) => s + p.events.length, 0) },
        {
            label: t("prog.stat.upcoming"),
            value: programs
                .flatMap((p) => p.events)
                .filter((e) => new Date(e.date) >= new Date()).length,
        },
        { label: t("prog.stat.scopes"), value: new Set(programs.map((p) => p.scope)).size },
    ];
    const saveProgram = (data) => {
        if (data.id) {
            setPrograms((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data, id: data.id } : p)));
        }
        else {
            const created = { ...data, id: uid(), events: [] };
            setPrograms((prev) => [created, ...prev]);
            setSelectedId(created.id);
        }
    };
    const deleteProgram = (id) => {
        setPrograms((prev) => prev.filter((p) => p.id !== id));
        if (selectedId === id)
            setSelectedId(programs[0]?.id ?? "");
    };
    const saveEvent = (programId, data) => {
        setPrograms((prev) => prev.map((p) => {
            if (p.id !== programId)
                return p;
            if (data.id) {
                return {
                    ...p,
                    events: p.events.map((e) => (e.id === data.id ? { ...data, id: data.id } : e)),
                };
            }
            return { ...p, events: [...p.events, { ...data, id: uid() }] };
        }));
    };
    const deleteEvent = (programId, eventId) => {
        setPrograms((prev) => prev.map((p) => p.id === programId ? { ...p, events: p.events.filter((e) => e.id !== eventId) } : p));
    };
    return (<div className="min-h-screen flex bg-background">
      <AppSidebar role="leader"/>
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name="Tony Maalouf" rank={t("rank.subleader")} subgroup={t("groups.scouts.name")} initials="TM"/>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4 animate-fade-up">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
                <CalendarRange className="inline size-3 me-2 -mt-0.5"/>
                {t("prog.kicker")}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl">{t("prog.title")}</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">{t("prog.intro")}</p>
            </div>
            <Button variant="hero" size="sm" onClick={() => setProgDialog({ open: true })}>
              <Plus /> {t("prog.new")}
            </Button>
          </div>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (<div key={s.label} className="relative rounded-lg border border-border bg-card p-5 shadow-card overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"/>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
                <p className="font-serif text-4xl gold-text mt-2">{s.value}</p>
              </div>))}
          </section>

          <div className="flex gap-2 mb-6 flex-wrap">
            {["all", ...SCOPES].map((s) => (<button key={s} onClick={() => setScope(s)} className={cn("text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md border transition-colors", scope === s
                ? "border-gold text-gold bg-gold/10"
                : "border-border text-muted-foreground hover:text-foreground")}>
                {s === "all" ? t("tasks.filter.all") : t(`prog.scope.${s}`)}
              </button>))}
          </div>

          <div className="grid lg:grid-cols-[360px_1fr] gap-6">
            {/* Program list */}
            <aside className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
              <header className="px-5 py-3 border-b border-border flex items-center justify-between">
                <h2 className="font-serif text-lg">{t("prog.list")}</h2>
                <span className="text-xs text-muted-foreground">{filtered.length}</span>
              </header>
              <ul className="divide-y divide-border max-h-[640px] overflow-y-auto">
                {filtered.map((p) => {
            const active = p.id === selected?.id;
            return (<li key={p.id}>
                      <button onClick={() => setSelectedId(p.id)} className={cn("w-full text-start px-5 py-4 transition-colors", active ? "bg-gold/5" : "hover:bg-background/50")}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] uppercase tracking-widest text-gold">
                            {t(`prog.scope.${p.scope}`)}
                          </span>
                          {active && <ChevronRight className="size-3 text-gold ms-auto"/>}
                        </div>
                        <p className="font-medium leading-tight">{p.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatRange(p.startDate, p.endDate)}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          <Users className="inline size-3 me-1 -mt-0.5"/>
                          {t(p.subgroup)}
                        </p>
                      </button>
                    </li>);
        })}
                {filtered.length === 0 && (<li className="px-5 py-12 text-center text-sm text-muted-foreground">{t("prog.empty")}</li>)}
              </ul>
            </aside>

            {/* Program detail */}
            <section className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
              {selected ? (<>
                  <header className="px-6 py-5 border-b border-border">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-gold mb-1">
                          {t(`prog.scope.${selected.scope}`)} · {formatRange(selected.startDate, selected.endDate)}
                        </p>
                        <h2 className="font-serif text-2xl">{selected.title}</h2>
                        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{selected.summary}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          <Users className="inline size-3 me-1 -mt-0.5"/>
                          {t(selected.subgroup)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="gold-outline" size="sm" onClick={() => setProgDialog({ open: true, editing: selected })}>
                          <Edit3 /> {t("prog.edit")}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-crimson hover:text-crimson hover:bg-crimson/10" onClick={() => deleteProgram(selected.id)}>
                          <Trash2 /> {t("prog.delete")}
                        </Button>
                      </div>
                    </div>
                  </header>

                  <div className="px-6 py-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-lg">{t("prog.events")}</h3>
                      <Button variant="gold" size="sm" onClick={() => setEventDialog({ open: true, programId: selected.id })}>
                        <Plus /> {t("prog.addEvent")}
                      </Button>
                    </div>

                    <ol className="space-y-4">
                      {selected.events
                .slice()
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((e) => (<li key={e.id} className="rounded-lg border border-border bg-background/40 p-5 hover:border-gold/40 transition-colors">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={cn("text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border", e.type === "event"
                    ? "border-gold/50 text-gold bg-gold/5"
                    : "border-border text-muted-foreground")}>
                                    {t(`prog.type.${e.type}`)}
                                  </span>
                                  <span className="text-xs text-muted-foreground">{e.audience}</span>
                                </div>
                                <p className="font-medium">{e.title}</p>
                                <p className="text-sm text-muted-foreground mt-1">{e.description}</p>
                                <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                                  <span>
                                    <CalendarDays className="inline size-3 me-1 -mt-0.5"/>
                                    {new Date(e.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
                                  </span>
                                  <span>
                                    <Clock className="inline size-3 me-1 -mt-0.5"/>
                                    {e.time}
                                  </span>
                                  <span>
                                    <MapPin className="inline size-3 me-1 -mt-0.5"/>
                                    {e.location}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="size-8" onClick={() => setEventDialog({ open: true, programId: selected.id, editing: e })}>
                                  <Edit3 className="size-4"/>
                                </Button>
                                <Button variant="ghost" size="icon" className="size-8 text-crimson hover:text-crimson hover:bg-crimson/10" onClick={() => deleteEvent(selected.id, e.id)}>
                                  <Trash2 className="size-4"/>
                                </Button>
                              </div>
                            </div>

                            {e.schedule.length > 0 && (<div className="mt-4 ps-4 border-s border-gold/30 space-y-2">
                                <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
                                  {t("prog.schedule")}
                                </p>
                                {e.schedule.map((s) => (<div key={s.id} className="grid grid-cols-[64px_1fr] gap-3 text-sm">
                                    <span className="font-mono text-xs text-gold pt-0.5">{s.time}</span>
                                    <div>
                                      <p className="font-medium leading-tight">{s.title}</p>
                                      {s.details && (<p className="text-xs text-muted-foreground mt-0.5">{s.details}</p>)}
                                    </div>
                                  </div>))}
                              </div>)}
                          </li>))}
                      {selected.events.length === 0 && (<li className="text-center text-sm text-muted-foreground py-12">
                          {t("prog.events.empty")}
                        </li>)}
                    </ol>
                  </div>
                </>) : (<div className="p-12 text-center text-muted-foreground">{t("prog.empty")}</div>)}
            </section>
          </div>
        </main>
      </div>

      <ProgramDialog state={progDialog} onClose={() => setProgDialog({ open: false })} onSave={saveProgram}/>
      <EventDialog state={eventDialog} onClose={() => setEventDialog({ open: false })} onSave={saveEvent}/>
    </div>);
};
/* ----------------------------- Program dialog ----------------------------- */
const SUBGROUP_KEYS = [
    "groups.cubs.name",
    "groups.scouts.name",
    "groups.guides.name",
    "groups.pioneers.name",
];
const ProgramDialog = ({ state, onClose, onSave, }) => {
    const { t } = useI18n();
    const editing = state.editing;
    const [form, setForm] = useState({
        title: "",
        scope: "month",
        startDate: "",
        endDate: "",
        subgroup: SUBGROUP_KEYS[1],
        summary: "",
    });
    // reset form when dialog opens
    const opened = state.open;
    useMemoReset(opened, () => setForm({
        title: editing?.title ?? "",
        scope: editing?.scope ?? "month",
        startDate: editing?.startDate ?? "",
        endDate: editing?.endDate ?? "",
        subgroup: editing?.subgroup ?? SUBGROUP_KEYS[1],
        summary: editing?.summary ?? "",
    }));
    const submit = () => {
        if (!form.title || !form.startDate || !form.endDate)
            return;
        onSave({ ...form, id: editing?.id });
        onClose();
    };
    return (<Dialog open={state.open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {editing ? t("prog.edit") : t("prog.new")}
          </DialogTitle>
          <DialogDescription>{t("prog.dialog.intro")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>{t("prog.field.title")}</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{t("prog.field.scope")}</Label>
              <select value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {SCOPES.map((s) => (<option key={s} value={s}>
                    {t(`prog.scope.${s}`)}
                  </option>))}
              </select>
            </div>
            <div>
              <Label>{t("prog.field.subgroup")}</Label>
              <select value={form.subgroup} onChange={(e) => setForm({ ...form, subgroup: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {SUBGROUP_KEYS.map((s) => (<option key={s} value={s}>
                    {t(s)}
                  </option>))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{t("prog.field.start")}</Label>
              <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}/>
            </div>
            <div>
              <Label>{t("prog.field.end")}</Label>
              <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}/>
            </div>
          </div>
          <div>
            <Label>{t("prog.field.summary")}</Label>
            <Textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={3}/>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            {t("prog.cancel")}
          </Button>
          <Button variant="hero" onClick={submit}>
            {t("prog.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};
/* ----------------------------- Event dialog ----------------------------- */
const EventDialog = ({ state, onClose, onSave, }) => {
    const { t } = useI18n();
    const editing = state.editing;
    const [form, setForm] = useState({
        title: "",
        date: "",
        time: "",
        location: "",
        type: "meeting",
        audience: "",
        description: "",
        schedule: [],
    });
    useMemoReset(state.open, () => setForm({
        title: editing?.title ?? "",
        date: editing?.date ?? "",
        time: editing?.time ?? "",
        location: editing?.location ?? "",
        type: editing?.type ?? "meeting",
        audience: editing?.audience ?? "",
        description: editing?.description ?? "",
        schedule: editing?.schedule ?? [],
    }));
    const updateItem = (id, patch) => setForm((f) => ({
        ...f,
        schedule: f.schedule.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
    const addItem = () => setForm((f) => ({
        ...f,
        schedule: [...f.schedule, { id: uid(), time: "", title: "", details: "" }],
    }));
    const removeItem = (id) => setForm((f) => ({ ...f, schedule: f.schedule.filter((s) => s.id !== id) }));
    const submit = () => {
        if (!state.programId || !form.title || !form.date)
            return;
        onSave(state.programId, { ...form, id: editing?.id });
        onClose();
    };
    return (<Dialog open={state.open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {editing ? t("prog.event.edit") : t("prog.event.new")}
          </DialogTitle>
          <DialogDescription>{t("prog.event.intro")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>{t("prog.field.title")}</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{t("prog.field.type")}</Label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="meeting">{t("prog.type.meeting")}</option>
                <option value="event">{t("prog.type.event")}</option>
              </select>
            </div>
            <div>
              <Label>{t("prog.field.audience")}</Label>
              <Input value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} placeholder={t("prog.field.audience.ph")}/>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>{t("prog.field.date")}</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}/>
            </div>
            <div>
              <Label>{t("prog.field.time")}</Label>
              <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}/>
            </div>
            <div>
              <Label>{t("prog.field.location")}</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}/>
            </div>
          </div>
          <div>
            <Label>{t("prog.field.description")}</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}/>
          </div>

          <div className="rounded-md border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{t("prog.schedule")}</p>
              <Button size="sm" variant="gold-outline" onClick={addItem}>
                <Plus /> {t("prog.addItem")}
              </Button>
            </div>
            <div className="space-y-3">
              {form.schedule.map((s) => (<div key={s.id} className="grid grid-cols-[80px_1fr_auto] gap-2 items-start">
                  <Input type="time" value={s.time} onChange={(e) => updateItem(s.id, { time: e.target.value })}/>
                  <div className="space-y-2">
                    <Input value={s.title} onChange={(e) => updateItem(s.id, { title: e.target.value })} placeholder={t("prog.item.title.ph")}/>
                    <Input value={s.details} onChange={(e) => updateItem(s.id, { details: e.target.value })} placeholder={t("prog.item.details.ph")}/>
                  </div>
                  <Button variant="ghost" size="icon" className="size-9 text-crimson hover:text-crimson hover:bg-crimson/10" onClick={() => removeItem(s.id)}>
                    <Trash2 className="size-4"/>
                  </Button>
                </div>))}
              {form.schedule.length === 0 && (<p className="text-xs text-muted-foreground text-center py-4">{t("prog.schedule.empty")}</p>)}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            {t("prog.cancel")}
          </Button>
          <Button variant="hero" onClick={submit}>
            {t("prog.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};
/* tiny helper: re-run an effect-like reset whenever a value flips truthy */
import { useEffect, useRef } from "react";
function useMemoReset(trigger, fn) {
    const prev = useRef(false);
    useEffect(() => {
        if (trigger && !prev.current)
            fn();
        prev.current = trigger;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);
}
export default Programs;
