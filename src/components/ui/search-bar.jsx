import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

/**
 * Search Bar component as specified in the design system.
 * 
 * This component provides a pill-shaped search input with glass styling
 * (backdrop blur, semi-transparent background) and an embedded CTA button.
 * It follows the JSON spec for searchBar properties.
 * 
 * @param {string} placeholder - Placeholder text for the search input
 * @param {string} ctaText - Text for the embedded CTA button
 * @param {function} onSearch - Callback function when search is submitted
 * @param {string} className - Additional CSS classes
 */
const SearchBar = React.forwardRef(({ 
  placeholder = "Search...", 
  ctaText = "Search",
  onSearch,
  className,
  ...props 
}, ref) => {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className={cn(
        "relative flex items-center",
        "rounded-full",
        "bg-white/8 backdrop-blur-md",
        "border border-white/15",
        "px-4 py-3",
        "w-full max-w-2xl",
        className
      )}
      {...props}
    >
      {/* Search Icon */}
      <Search className="w-5 h-5 text-white/60 flex-shrink-0" />
      
      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/50 px-4 text-base"
      />
      
      {/* Embedded CTA Button */}
      <button
        type="submit"
        className="rounded-full bg-white text-black hover:bg-white/90 px-5 font-medium text-sm h-9 transition-colors"
      >
        {ctaText}
      </button>
    </form>
  );
});

SearchBar.displayName = "SearchBar";

export { SearchBar };