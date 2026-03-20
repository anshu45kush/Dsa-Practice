export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden">
      <div className="skeleton h-44 w-full rounded-none" />
      <div className="px-3.5 pt-3 pb-3.5 space-y-2">
        <div className="skeleton h-3 w-4/5 rounded-full" />
        <div className="skeleton h-3 w-2/3 rounded-full" />
        <div className="flex justify-between mt-1">
          <div className="skeleton h-4 w-1/3 rounded-full" />
          <div className="skeleton h-3 w-1/4 rounded-full" />
        </div>
      </div>
    </div>
  )
}
