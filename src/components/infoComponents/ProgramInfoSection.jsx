import { InfoListCard } from "../ui/info-list-card";
import { TestimonialCard } from "../ui/testimonial-card";
import { cn } from "@/lib/utils";

/**
 * ProgramInfoSection component with two-column layout.
 * 
 * This component displays program information in a two-column layout with
 * an info list on the left and testimonials on the right. It follows the
 * JSON design system for content sections.
 * 
 * @param {string} infoTitle - Title for the info list column
 * @param {Array} infoItems - Array of info items with { label, value, icon }
 * @param {boolean} showIcons - Whether to show icons in info list
 * @param {string} testimonialsTitle - Title for the testimonials column
 * @param {Array} testimonials - Array of testimonial objects with { name, role, quote }
 * @param {string} className - Additional CSS classes
 * @param {string} backgroundColor - Background color (default: #FAFAF9)
 */
export default function ProgramInfoSection({
  infoTitle = "Our Program",
  infoItems = [],
  showIcons = true,
  testimonialsTitle = "Community Voices",
  testimonials = [],
  className,
  backgroundColor = "#F0F0F0",
}) {
  return (
    <section className={cn("py-24", className)} style={{ backgroundColor }}>
      <div className="container mx-auto px-6 lg:px-16 ">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info List */}
          <div>
            <h2 className="text-[36px] font-bold leading-[1.25] text-[#111827] mb-8">
              {infoTitle}
            </h2>
            <InfoListCard items={infoItems} showIcons={showIcons} />
          </div>

          {/* Right Column - Testimonials */}
          <div>
            <h2 className="text-[36px] font-bold leading-[1.25] text-[#111827] mb-8">
              {testimonialsTitle}
            </h2>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  quote={testimonial.quote}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}