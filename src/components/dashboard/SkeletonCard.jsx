/**
 * Animated skeleton placeholder shown while dashboard stats are loading.
 * Matches the exact dimensions of StatsCard so there is no layout shift.
 */
export default function SkeletonCard() {
    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm animate-pulse">
            {/* Icon placeholder */}
            <div className="size-12 rounded-2xl bg-gray-100" />

            {/* Value placeholder */}
            <div className="mt-5 h-10 w-24 rounded-xl bg-gray-100" />

            {/* Label placeholder */}
            <div className="mt-2 h-4 w-32 rounded-lg bg-gray-100" />
        </div>
    );
}
