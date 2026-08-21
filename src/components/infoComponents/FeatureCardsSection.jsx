import { ImageOverlayCard } from "../ui/image-overlay-card";
import { cn } from "@/lib/utils";

/**
 * FeatureCardsSection component with three-column card grid.
 * 
 * This component displays a section with a heading, description, and a grid
 * of image overlay cards. It follows the JSON design system for card layouts
 * and spacing.
 * 
 * @param {string} title - Section heading text
 * @param {string} description - Section description/subtitle text
 * @param {Array} cards - Array of card objects with { image, badge, title, description }
 * @param {string} className - Additional CSS classes
 * @param {string} backgroundColor - Background color (default: white)
 * @param {number} columns - Number of columns in the grid (default: 3)
 */
export default function FeatureCardsSection({
  title = "Parish Life",
  description = "Moments from our community life, service projects, and spiritual gatherings.",
  cards = [],
  className,
  backgroundColor = "white",
  columns = 3,
}) {
  // Determine grid columns based on the columns prop
  const gridCols = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={cn("py-24", className)} style={{ backgroundColor }}>
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] font-bold leading-[1.25] text-[#111827] mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-[16px] leading-[1.6] text-[#6B7280] max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Card Grid */}
        <div className={cn("grid gap-6", gridCols)}>
          {cards.map((card, index) => (
            <ImageOverlayCard
              key={index}
              image={card.image}
              badge={card.badge}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}