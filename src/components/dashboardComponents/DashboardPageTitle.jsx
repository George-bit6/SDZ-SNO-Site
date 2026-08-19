/**
 * Reusable dashboard page title component.
 *
 * Displays a page title with optional subtitle and action buttons.
 * The component is designed to be used at the top of dashboard pages
 * and provides a consistent header layout across member and leader dashboards.
 *
 * Props:
 * - title: Main page heading text
 * - subtitle: Optional subtitle/prefix text displayed above the title
 * - accentColor: Optional accent color for the subtitle (default: #4A7DFF)
 * - children: Optional action buttons/controls to display on the right side
 */
export default function DashboardPageTitle({ title, subtitle, accentColor = '#4A7DFF', children }) {
    return (
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
                {subtitle && (
                    <p
                        className="text-[12px] font-medium uppercase tracking-[0.3em] mb-2"
                        style={{ color: accentColor }}
                    >
                        {subtitle}
                    </p>
                )}
                <h1 className="text-[28px] font-bold leading-[1.3] text-[#1E2A45]">
                    {title}
                </h1>
            </div>
            <div className="flex gap-2">{children}</div>
        </div>
    );
}
