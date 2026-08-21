import DesignHero from "../components/infoComponents/DesignHero";
import DesignFooter from "../components/infoComponents/DesignFooter";
import OverviewSection from "../components/infoComponents/OverviewSection";
import FeatureCardsSection from "../components/infoComponents/FeatureCardsSection";
import ProgramInfoSection from "../components/infoComponents/ProgramInfoSection";
import CTASection from "../components/infoComponents/CTASection";
import { Users, Calendar, BookOpen } from "lucide-react";
import heroImg from "../assets/breakingthebread.jpeg";
import stDemetriosIcon from "../assets/stDemetriosIcon.png";
import img1 from "../assets/20251026_123219-scaled.jpg";
import img2 from "../assets/WhatsApp Image 2026-01-02 at 2.25.52 PM.jpeg";
import img3 from "../assets/nelly-flag.jpeg";

/**
 * Home Page component following the JSON design specification.
 * 
 * This page implements the complete home page design with:
 * - Hero section with full-bleed imagery and navigation
 * - Overview section with asymmetric two-column split (~60/40)
 * - Feature sections with image overlay cards
 * - Content sections with light backgrounds
 * - CTA section with gradient banner
 * - Footer with three-column layout
 * 
 * The page is modular and composes reusable components rather than
 * containing all UI elements directly.
 */
export default function HomePage() {
  // Sample data for image cards
  const featureCards = [
    {
      image: img1,
      badge: "Community",
      title: "Together in Faith",
      description: "Our scouts gathered outside the parish on the Feast of St. Demetrios.",
    },
    {
      image: img2,
      badge: "Service",
      title: "Hands that Serve",
      description: "Planting trees in the church garden — faith made visible.",
    },
    {
      image: img3,
      badge: "Fellowship",
      title: "Fireside Fellowship",
      description: "Evening prayers and songs at our annual mountain camp.",
    },
  ];

  // Sample data for testimonials
  const testimonials = [
    {
      name: "Maria George",
      role: "Parent",
      quote: "The scout program has helped my children grow in faith and character. The community here is truly special.",
    },
    {
      name: "Father Elias",
      role: "Parish Priest",
      quote: "Seeing young people dedicate themselves to prayer and service gives me great hope for our church's future.",
    },
  ];

  // Sample data for info list
  const programInfo = [
    {
      label: "Weekly Meetings",
      value: "Saturdays, 4:00 PM - 6:00 PM",
      icon: Calendar,
    },
    {
      label: "Age Groups",
      value: "Beavers (5-7), Cubs (8-10), Scouts (11-14), Rovers (15-18)",
      icon: Users,
    },
    {
      label: "Activities",
      value: "Prayer, service projects, camping, leadership training",
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <DesignHero
        backgroundImage={heroImg}
        title="Saint Demetrios Orthodox Church"
        subtitle="Forming young Orthodox Christians in prayer, discipline, and love of neighbor — walking together on the path of the Saints."
        ctaText="Join Our Community"
        ctaLink="#join"
        showSearch={false}
      />

      

      {/* Feature Cards Section */}
      <section id="gallery">
        <FeatureCardsSection
          title="Parish Life"
          description="Moments from our community life, service projects, and spiritual gatherings."
          cards={featureCards}
          columns={3}
        />
      </section>
{/* Overview Section - Asymmetric two-column split (~60/40) */}
      <section id="mission">
        <OverviewSection
          title="Our Mission"
          description="We are dedicated to forming young Orthodox Christians in prayer, discipline, and love of neighbor. Our scout program follows the ancient traditions of the Church while helping youth navigate modern challenges."
          imageSrc={stDemetriosIcon}
          imageAlt="St. Demetrios Icon"
          ctaText="Learn More"
          ctaLink="#learn-more"
          backgroundColor="#fafadf"
        />
      </section>
      {/* Program Information Section */}
      <section id="what-we-do">
        <ProgramInfoSection
          infoTitle="Our Program"
          infoItems={programInfo}
          showIcons={true}
          testimonialsTitle="Community Voices"
          testimonials={testimonials}
        />
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold leading-[1.25] text-[#111827] mb-4">
              Why Choose Us
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#6B7280] max-w-2xl mx-auto">
              Rooted in tradition, growing in faith, serving with love.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FAFAF9] rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="size-8 text-[#D8B98A]" />
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-2">Rooted in the Fathers</h3>
              <p className="text-[#6B7280]">Every mission draws from the writings of the Church Fathers.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FAFAF9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="size-8 text-[#D8B98A]" />
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-2">Guided by Clergy</h3>
              <p className="text-[#6B7280]">Our program is blessed and led alongside the parish priest.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FAFAF9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="size-8 text-[#D8B98A]" />
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-2">Bilingual Formation</h3>
              <p className="text-[#6B7280]">All materials in English and Arabic — for every scout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#FAFAF9]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold leading-[1.25] text-[#111827] mb-4">
              Common Questions
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#6B7280] max-w-2xl mx-auto">
              The most common questions about our Church
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-[#111827] mb-2">Who can join Antioch Scouts?</h3>
              <p className="text-[#6B7280]">Any baptized child ages 8–18 whose family is part of an Eastern Orthodox parish. Catechumens are welcome with their sponsor.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-[#111827] mb-2">How often do you meet?</h3>
              <p className="text-[#6B7280]">Weekly troop meetings on Saturdays, plus monthly outings and two major camps per year.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-[#111827] mb-2">Is there a fee to participate?</h3>
              <p className="text-[#6B7280]">A small annual fee covers uniforms and camp materials. Scholarships are available through our donations program — no child is turned away.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-[#111827] mb-2">Where do donations go?</h3>
              <p className="text-[#6B7280]">100% supports scholarships, camp equipment, service projects, and pilgrimage costs. Donors receive a full annual report.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold leading-[1.25] text-[#111827] mb-4">
              Contact Us
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#6B7280] max-w-2xl mx-auto">
              Get in touch with our community
            </p>
          </div>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-[#6B7280] mb-6">
              We'd love to hear from you. Reach out for questions about our programs, events, or how to get involved.
            </p>
            <a href="#contact" className="inline-block bg-white text-[#0A0A0A] rounded-full px-6 py-3 font-medium hover:bg-white/90 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner Section - Full-bleed with gradient scrim */}
      <CTASection
        backgroundImage={img2}
        badge="Support the Mission"
        title="Support Our Church"
        description="Your gift supports the price of the Church land and the building of the Church at Saint Demetrios Zouk."
        ctaText="Donate Now"
        ctaLink="https://example.com/donate"
        subtitle="Tax-deductible · Secure via parish account"
      />

      {/* Footer */}
      <DesignFooter />
    </div>
  );
}