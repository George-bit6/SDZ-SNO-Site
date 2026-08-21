/**
 * Accent Color Mapping for Subgroups
 * Assigns unique accent colors based on subgroup IDs or names
 */

// Predefined accent colors that work well with the design system
const ACCENT_COLORS = [
  '#4A7DFF', // Blue (default)
  '#FF5C5C', // Red
  '#34D399', // Green
  '#FFC107', // Yellow/Gold
  '#9B59B6', // Purple
  '#FF6B6B', // Coral
  '#1ABC9C', // Teal
  '#E67E22', // Orange
  '#3498DB', // Light Blue
  '#2ECC71', // Emerald
  '#F39C12', // Dark Orange
  '#D35400', // Pumpkin
  '#8E44AD', // Violet
  '#27AE60', // Dark Green
  '#C0392B', // Dark Red
  '#16A085', // Dark Teal
  '#2980B9', // Dark Blue
  '#F1C40F', // Sunflower
  '#E74C3C', // Alizarin
  '#9B59B6', // Amethyst
];

/**
 * Get accent color based on subgroup ID
 * Uses a hash function to consistently assign the same color to the same subgroup
 * @param {string} subgroupId - Subgroup ID
 * @returns {string} Hex color code
 */
export function getAccentColorBySubgroupId(subgroupId) {
  if (!subgroupId) return '#4A7DFF'; // Default blue

  // Simple hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < subgroupId.length; i++) {
    const char = subgroupId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Use absolute value and modulo to get consistent color index
  const colorIndex = Math.abs(hash) % ACCENT_COLORS.length;
  return ACCENT_COLORS[colorIndex];
}

/**
 * Get accent color based on subgroup name
 * @param {string} subgroupName - Subgroup name
 * @returns {string} Hex color code
 */
export function getAccentColorBySubgroupName(subgroupName) {
  if (!subgroupName) return '#4A7DFF'; // Default blue

  // Simple hash function for name
  let hash = 0;
  for (let i = 0; i < subgroupName.length; i++) {
    const char = subgroupName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  const colorIndex = Math.abs(hash) % ACCENT_COLORS.length;
  return ACCENT_COLORS[colorIndex];
}

/**
 * Get a predefined accent color by index
 * @param {number} index - Color index
 * @returns {string} Hex color code
 */
export function getAccentColorByIndex(index) {
  return ACCENT_COLORS[index % ACCENT_COLORS.length] || '#4A7DFF';
}

/**
 * Get all available accent colors
 * @returns {Array<string>} Array of hex color codes
 */
export function getAllAccentColors() {
  return [...ACCENT_COLORS];
}