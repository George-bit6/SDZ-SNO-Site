/**
 * Reusable dashboard statistic cards component.
 *
 * Displays a grid of metric cards with labels, values, and optional delta indicators.
 * Each card shows a key metric with a large value and supporting information.
 * The component is data-driven and can be reused across both member and leader dashboards.
 *
 * Props:
 * - stats: Array of stat objects with label, value, delta, and optional progress/color
 * - accentColor: Optional accent color for the stat values (for backward compatibility)
 * - columns: Grid column configuration (default: 2 on mobile, 4 on desktop)
 */
export default function StatisticCards({ stats = [], accentColor, columns = { mobile: 2, desktop: 4 } }) {
    return (
        <section className={`grid grid-cols-${columns.mobile} lg:grid-cols-${columns.desktop} gap-4 mb-10`}>
            {stats.length > 0 ? (
                stats.map((stat, index) => (
                    <div
                        key={stat.label || index}
                        className="relative rounded-[20px] border border-[#E8ECF4] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden"
                    >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4A7DFF]/20 to-transparent" />
                        <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#8A94A6]">
                            {stat.label}
                        </p>
                        <p
                            className="text-[20px] font-bold mt-2"
                            style={{ color: stat.color || accentColor || '#4A7DFF' }}
                        >
                            {stat.value}
                        </p>
                        {stat.delta && (
                            <p className="text-xs text-[#8A94A6] mt-2">{stat.delta}</p>
                        )}
                        {stat.progress !== undefined && (
                            <div className="mt-3">
                                <div className="h-[7px] rounded-full bg-[#E8ECF4] overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-[#4A7DFF] transition-all duration-300"
                                        style={{ width: `${stat.progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className={`lg:col-span-${columns.desktop} rounded-[20px] border border-dashed border-[#E8ECF4] bg-[#F4F6FB]/60 p-6 text-center text-sm text-[#8A94A6]`}>
                    No Stats Available
                </div>
            )}
        </section>
    );
}