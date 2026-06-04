import { useMemo, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "@/hooks/use-toast";
import { Boxes, Pencil, Plus, RotateCcw, Search, ShieldCheck, Trash2, PackageCheck, PackageSearch, } from "lucide-react";
// --- Mock current user (one designated Secretary of Logistics)
const CURRENT_LEADER = "Tony Maalouf";
const SECRETARY_OF_LOGISTICS = "Tony Maalouf"; // toggle to test non-secretary
const SEED_ITEMS = [
    {
        id: "i1",
        name: "4-Person Tent",
        category: "camping",
        condition: "good",
        unit: "tent",
        total: 12,
        location: "Storage Room A · Shelf 1",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80&auto=format&fit=crop",
        notes: "Waterproof, 3-season.",
    },
    {
        id: "i2",
        name: "Sleeping Bag",
        category: "camping",
        condition: "good",
        unit: "bag",
        total: 30,
        location: "Storage Room A · Bin 3",
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "i3",
        name: "Scout Neckerchief",
        category: "uniform",
        condition: "new",
        unit: "pc",
        total: 80,
        location: "Uniform Closet",
        image: "https://images.unsplash.com/photo-1542596594-649edbc13630?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "i4",
        name: "First Aid Kit",
        category: "firstaid",
        condition: "good",
        unit: "kit",
        total: 8,
        location: "Office · Cabinet B",
        image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&q=80&auto=format&fit=crop",
        notes: "Check expiry quarterly.",
    },
    {
        id: "i5",
        name: "Gas Camp Stove",
        category: "cooking",
        condition: "fair",
        unit: "stove",
        total: 6,
        location: "Storage Room B",
        image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "i6",
        name: "Rope Coil (30m)",
        category: "tools",
        condition: "good",
        unit: "coil",
        total: 20,
        location: "Storage Room B · Hook 2",
        image: "https://images.unsplash.com/photo-1530034424942-d4ee2fcb0db9?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "i7",
        name: "Group Flag",
        category: "documents",
        condition: "new",
        unit: "flag",
        total: 3,
        location: "Office · Drawer 1",
        image: "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "i8",
        name: "Compass",
        category: "tools",
        condition: "good",
        unit: "pc",
        total: 25,
        location: "Office · Cabinet A",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80&auto=format&fit=crop",
    },
];
const SEED_RES = [
    {
        id: "r1",
        itemId: "i1",
        amount: 4,
        leader: "Maya Saliba",
        purpose: "St. George Camp",
        date: "2026-05-12",
        returned: false,
    },
    {
        id: "r2",
        itemId: "i2",
        amount: 6,
        leader: "Tony Maalouf",
        purpose: "Weekly Meeting · Scouts",
        date: "2026-05-15",
        returned: false,
    },
];
const CATEGORIES = [
    "all",
    "camping",
    "uniform",
    "firstaid",
    "cooking",
    "tools",
    "documents",
];
const condClass = {
    new: "bg-gold/15 text-gold border-gold/40",
    good: "bg-secondary/60 text-secondary-foreground border-secondary",
    fair: "bg-muted text-muted-foreground border-border",
    repair: "bg-crimson/20 text-crimson border-crimson/40",
};
const emptyDraft = {
    name: "",
    category: "camping",
    condition: "good",
    unit: "pc",
    total: 1,
    location: "",
    image: "",
    notes: "",
};
const Inventory = () => {
    const { t } = useI18n();
    const isSecretary = CURRENT_LEADER === SECRETARY_OF_LOGISTICS;
    const [items, setItems] = useState(SEED_ITEMS);
    const [reservations, setReservations] = useState(SEED_RES);
    const [q, setQ] = useState("");
    const [cat, setCat] = useState("all");
    const [editOpen, setEditOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [draft, setDraft] = useState(emptyDraft);
    const [resOpen, setResOpen] = useState(false);
    const [resItem, setResItem] = useState(null);
    const [resAmount, setResAmount] = useState(1);
    const [resPurpose, setResPurpose] = useState("");
    const reservedByItem = useMemo(() => {
        const map = new Map();
        reservations
            .filter((r) => !r.returned)
            .forEach((r) => map.set(r.itemId, (map.get(r.itemId) ?? 0) + r.amount));
        return map;
    }, [reservations]);
    const filtered = items.filter((i) => {
        const matchesQ = i.name.toLowerCase().includes(q.toLowerCase());
        const matchesC = cat === "all" || i.category === cat;
        return matchesQ && matchesC;
    });
    const myActive = reservations.filter((r) => r.leader === CURRENT_LEADER && !r.returned);
    const stats = [
        { label: t("inv.stat.items"), value: items.length },
        { label: t("inv.stat.units"), value: items.reduce((s, i) => s + i.total, 0) },
        {
            label: t("inv.stat.reserved"),
            value: Array.from(reservedByItem.values()).reduce((s, n) => s + n, 0),
        },
        { label: t("inv.stat.mine"), value: myActive.length },
    ];
    const openNew = () => {
        if (!isSecretary)
            return toast({ title: t("inv.toast.denied") });
        setEditing(null);
        setDraft(emptyDraft);
        setEditOpen(true);
    };
    const openEdit = (item) => {
        if (!isSecretary)
            return toast({ title: t("inv.toast.denied") });
        setEditing(item);
        const { id: _id, ...rest } = item;
        setDraft(rest);
        setEditOpen(true);
    };
    const saveItem = () => {
        if (!draft.name.trim())
            return;
        if (editing) {
            setItems((prev) => prev.map((i) => (i.id === editing.id ? { ...editing, ...draft } : i)));
        }
        else {
            setItems((prev) => [
                ...prev,
                { ...draft, id: `i${Date.now()}` },
            ]);
        }
        setEditOpen(false);
        toast({ title: t("inv.toast.saved") });
    };
    const deleteItem = (item) => {
        if (!isSecretary)
            return toast({ title: t("inv.toast.denied") });
        setItems((prev) => prev.filter((i) => i.id !== item.id));
        setReservations((prev) => prev.filter((r) => r.itemId !== item.id));
        toast({ title: t("inv.toast.deleted") });
    };
    const openReserve = (item) => {
        setResItem(item);
        setResAmount(1);
        setResPurpose("");
        setResOpen(true);
    };
    const confirmReserve = () => {
        if (!resItem)
            return;
        const available = resItem.total - (reservedByItem.get(resItem.id) ?? 0);
        const amt = Math.max(1, Math.min(resAmount, available));
        if (amt <= 0 || !resPurpose.trim())
            return;
        setReservations((prev) => [
            ...prev,
            {
                id: `r${Date.now()}`,
                itemId: resItem.id,
                amount: amt,
                leader: CURRENT_LEADER,
                purpose: resPurpose.trim(),
                date: new Date().toISOString().slice(0, 10),
                returned: false,
            },
        ]);
        setResOpen(false);
        toast({ title: t("inv.toast.reserved") });
    };
    const markReturned = (rid) => {
        setReservations((prev) => prev.map((r) => (r.id === rid ? { ...r, returned: true } : r)));
        toast({ title: t("inv.toast.returned") });
    };
    return (<div className="min-h-screen flex bg-background">
      <AppSidebar role="leader"/>
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name={CURRENT_LEADER} rank={t("rank.subleader")} subgroup={t("groups.scouts.name")} initials="TM"/>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4 animate-fade-up">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
                <Boxes className="inline size-3 me-2 -mt-0.5"/>
                {t("inv.kicker")}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl">{t("inv.title")}</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">{t("inv.intro")}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-gold"/>
                {isSecretary ? t("inv.youAreSecretary") : t("inv.secretaryOnly")}
              </p>
            </div>
            {isSecretary && (<Button variant="hero" size="sm" onClick={openNew}>
                <Plus /> {t("inv.new")}
              </Button>)}
          </div>

          {/* Stats */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (<div key={s.label} className="relative rounded-lg border border-border bg-card p-5 shadow-card overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"/>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.label}
                </p>
                <p className="font-serif text-4xl gold-text mt-2">{s.value}</p>
              </div>))}
          </section>

          {/* My reservations */}
          <section className="mb-8 rounded-lg border border-border bg-card shadow-card overflow-hidden">
            <header className="px-6 py-4 border-b border-border flex items-center gap-2">
              <PackageCheck className="size-4 text-gold"/>
              <h2 className="font-serif text-xl">{t("inv.myReservations")}</h2>
              <span className="text-xs text-muted-foreground">· {myActive.length}</span>
            </header>
            {myActive.length === 0 ? (<div className="px-6 py-10 text-center text-sm text-muted-foreground">
                {t("inv.noReservations")}
              </div>) : (<ul className="divide-y divide-border">
                {myActive.map((r) => {
                const item = items.find((i) => i.id === r.itemId);
                if (!item)
                    return null;
                return (<li key={r.id} className="px-6 py-4 flex items-center gap-4 flex-wrap">
                      <img src={item.image} alt={item.name} loading="lazy" className="size-14 rounded-md object-cover border border-border"/>
                      <div className="flex-1 min-w-[180px]">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.amount} {item.unit} · {r.purpose} · {r.date}
                        </p>
                      </div>
                      <Button size="sm" variant="gold-outline" onClick={() => markReturned(r.id)}>
                        <RotateCcw className="size-3.5"/> {t("inv.markReturned")}
                      </Button>
                    </li>);
            })}
              </ul>)}
          </section>

          {/* Filters */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex flex-wrap gap-1">
              {CATEGORIES.map((c) => (<button key={c} onClick={() => setCat(c)} className={`text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-md border transition-colors ${cat === c
                ? "border-gold text-gold bg-gold/10"
                : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {t(`inv.cat.${c}`)}
                </button>))}
            </div>
            <div className="relative">
              <Search className="absolute top-1/2 -translate-y-1/2 start-2.5 size-3.5 text-muted-foreground"/>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("inv.search")} className="bg-background border border-border rounded-md ps-8 pe-3 py-1.5 text-xs w-60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"/>
            </div>
          </div>

          {/* Item grid */}
          {filtered.length === 0 ? (<div className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground flex flex-col items-center gap-3">
              <PackageSearch className="size-8 text-muted-foreground/60"/>
              {t("inv.empty")}
            </div>) : (<section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item) => {
                const reserved = reservedByItem.get(item.id) ?? 0;
                const available = item.total - reserved;
                const pct = item.total ? (reserved / item.total) * 100 : 0;
                const itemRes = reservations.filter((r) => r.itemId === item.id && !r.returned);
                return (<article key={item.id} className="group rounded-lg border border-border bg-card shadow-card overflow-hidden flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                      <span className={`absolute top-3 end-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${condClass[item.condition]}`}>
                        {t(`inv.cond.${item.condition}`)}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                            {t(`inv.cat.${item.category}`)}
                          </p>
                          <h3 className="font-serif text-xl leading-tight mt-0.5 truncate">
                            {item.name}
                          </h3>
                        </div>
                        {isSecretary && (<div className="flex shrink-0 -me-1">
                            <Button size="icon" variant="ghost" className="size-8" onClick={() => openEdit(item)}>
                              <Pencil className="size-3.5"/>
                            </Button>
                            <Button size="icon" variant="ghost" className="size-8 text-crimson hover:text-crimson" onClick={() => deleteItem(item)}>
                              <Trash2 className="size-3.5"/>
                            </Button>
                          </div>)}
                      </div>

                      <p className="text-xs text-muted-foreground mt-2">{item.location}</p>
                      {item.notes && (<p className="text-xs text-muted-foreground/80 mt-1 italic">
                          {item.notes}
                        </p>)}

                      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-md border border-border py-2">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {t("inv.total")}
                          </p>
                          <p className="font-serif text-lg">{item.total}</p>
                        </div>
                        <div className="rounded-md border border-gold/30 bg-gold/5 py-2">
                          <p className="text-[10px] uppercase tracking-wider text-gold/80">
                            {t("inv.available")}
                          </p>
                          <p className="font-serif text-lg gold-text">{available}</p>
                        </div>
                        <div className="rounded-md border border-border py-2">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {t("inv.reserved")}
                          </p>
                          <p className="font-serif text-lg">{reserved}</p>
                        </div>
                      </div>

                      <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-gradient-gold" style={{ width: `${pct}%` }}/>
                      </div>

                      {itemRes.length > 0 && (<ul className="mt-3 space-y-1">
                          {itemRes.map((r) => (<li key={r.id} className="text-[11px] text-muted-foreground flex items-center justify-between gap-2">
                              <span className="truncate">
                                · {r.amount} {item.unit} — {r.leader} ({r.purpose})
                              </span>
                              {r.leader === CURRENT_LEADER && (<button className="text-gold hover:underline shrink-0" onClick={() => markReturned(r.id)}>
                                  {t("inv.return")}
                                </button>)}
                            </li>))}
                        </ul>)}

                      <div className="mt-auto pt-4">
                        <Button variant="gold-outline" size="sm" className="w-full" disabled={available <= 0} onClick={() => openReserve(item)}>
                          {t("inv.reserve")}
                        </Button>
                      </div>
                    </div>
                  </article>);
            })}
            </section>)}
        </main>
      </div>

      {/* Reserve dialog */}
      <Dialog open={resOpen} onOpenChange={setResOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("inv.reserveFor")} · {resItem?.name}
            </DialogTitle>
            <DialogDescription>
              {resItem &&
            `${t("inv.available")}: ${resItem.total - (reservedByItem.get(resItem.id) ?? 0)} ${resItem.unit}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t("inv.amount")}</Label>
              <Input type="number" min={1} max={resItem ? resItem.total - (reservedByItem.get(resItem.id) ?? 0) : 1} value={resAmount} onChange={(e) => setResAmount(parseInt(e.target.value || "1", 10))}/>
            </div>
            <div>
              <Label>{t("inv.purpose")}</Label>
              <Input placeholder={t("inv.purpose.ph")} value={resPurpose} onChange={(e) => setResPurpose(e.target.value)}/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setResOpen(false)}>
              {t("prog.cancel")}
            </Button>
            <Button variant="hero" onClick={confirmReserve}>
              {t("inv.confirmReserve")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit / new item dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing ? t("inv.edit") : t("inv.new")}</DialogTitle>
          </DialogHeader>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label>{t("prog.field.title")}</Label>
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })}/>
            </div>
            <div>
              <Label>{t("inv.category")}</Label>
              <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                {["camping", "uniform", "firstaid", "cooking", "tools", "documents"].map((c) => (<option key={c} value={c}>
                      {t(`inv.cat.${c}`)}
                    </option>))}
              </select>
            </div>
            <div>
              <Label>{t("inv.condition")}</Label>
              <select value={draft.condition} onChange={(e) => setDraft({ ...draft, condition: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                {["new", "good", "fair", "repair"].map((c) => (<option key={c} value={c}>
                    {t(`inv.cond.${c}`)}
                  </option>))}
              </select>
            </div>
            <div>
              <Label>{t("inv.qty")}</Label>
              <Input type="number" min={1} value={draft.total} onChange={(e) => setDraft({ ...draft, total: parseInt(e.target.value || "1", 10) })}/>
            </div>
            <div>
              <Label>{t("inv.unit")}</Label>
              <Input value={draft.unit} onChange={(e) => setDraft({ ...draft, unit: e.target.value })}/>
            </div>
            <div className="sm:col-span-2">
              <Label>{t("inv.location")}</Label>
              <Input value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })}/>
            </div>
            <div className="sm:col-span-2">
              <Label>{t("inv.image")}</Label>
              <Input value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} placeholder="https://..."/>
            </div>
            <div className="sm:col-span-2">
              <Label>{t("inv.notes")}</Label>
              <Textarea value={draft.notes ?? ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} rows={3}/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>
              {t("prog.cancel")}
            </Button>
            <Button variant="hero" onClick={saveItem}>
              {t("prog.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);
};
export default Inventory;
