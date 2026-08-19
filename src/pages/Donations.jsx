import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Church, Gift, HeartHandshake, Landmark, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useState } from "react";

const givingOptions = [
  {
    title: "One-time gift",
    body: "Support a specific event, retreat, or parish outreach effort.",
    amount: "$25",
  },
  {
    title: "Monthly support",
    body: "Provide steady help for youth formation, travel, and ministry needs.",
    amount: "$50/mo",
  },
  {
    title: "Sponsor a young person",
    body: "Help cover camp, classes, service materials, and mentorship opportunities.",
    amount: "$100+",
  },
];

const impactPoints = [
  "Youth formation programs and retreats",
  "Parish service projects and community outreach",
  "Scholarships and mentorship materials",
];

export default function Donations() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_45%),linear-gradient(135deg,_#ffffff_0%,_#fcfaf5_55%,_#f7f3e8_100%)] text-foreground">
      <header className="border-b border-[#e8dcc2] bg-white/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="size-8 sm:size-10" />
            <div className="leading-tight">
              <p className="font-serif text-base sm:text-lg text-foreground">St. Demetrios Scouts</p>
              <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Support the ministry</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Button asChild variant="gold-outline" size="sm" className="rounded-full">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 sm:px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-[#eadfc4] bg-white/90 p-6 sm:p-8 lg:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-gold">
              <HeartHandshake className="size-3" />
              Give with purpose
            </div>
            <h1 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Support the spiritual growth and service of our youth ministry.
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              Your generosity helps sustain formation, retreats, service projects, and fellowship for young people growing in faith and character.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg" className="rounded-full px-6">
                <a href="https://www.stdemetrios.org/donate" target="_blank" rel="noreferrer">
                  Donate now <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button asChild variant="gold-outline" size="lg" className="rounded-full px-6">
                <Link to="/">Return home</Link>
              </Button>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-[#eadfc4] bg-[#fcfaf5] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-gold/12 text-gold">
                <Church className="size-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-gold">How your gift helps</p>
                <h2 className="font-serif text-xl sm:text-2xl">Faith in action</h2>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              {impactPoints.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-[1rem] border border-[#eadfc4] bg-white/80 p-4">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-gold" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[1.2rem] border border-[#eadfc4] bg-white p-5">
              <div className="flex items-center gap-2 text-gold">
                <Landmark className="size-4" />
                <span className="text-[10px] uppercase tracking-[0.3em]">Parish support</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every contribution is used to strengthen the life of the ministry and to bless the young people entrusted to our care.
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {givingOptions.map((option) => (
            <div 
              key={option.title} 
              className={`rounded-[1.4rem] border border-[#eadfc4] bg-white/90 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.05)] cursor-pointer transition-all hover:shadow-lg ${
                selectedAmount === option.amount ? 'ring-2 ring-gold' : ''
              }`}
              onClick={() => handleAmountSelect(option.amount)}
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-gold/12 text-gold">
                <Gift className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg sm:text-xl">{option.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.body}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShieldCheck className="size-4 text-gold" />
                {option.amount}
              </div>
            </div>
          ))}
          
          {/* Custom amount option */}
          <div className="rounded-[1.4rem] border border-[#eadfc4] bg-white/90 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
            <div className="flex size-11 items-center justify-center rounded-full bg-gold/12 text-gold">
              <Gift className="size-5" />
            </div>
            <h3 className="mt-4 font-serif text-lg sm:text-xl">Custom amount</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Enter your preferred donation amount</p>
            <div className="mt-5">
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmount}
                placeholder="$100"
                className="w-full border border-[#eadfc4] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
