import { Star } from "lucide-react"

export function Stars({ count, avg }: { count: number; avg: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, avg - i))

        return (
          <div key={i} className="relative w-5 h-5">
            <Star
              className="absolute inset-0 text-gray-300"
              fill="currentColor"
            />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                className="text-amber-400"
                fill="currentColor"
              />
            </div>
          </div>
        )
      })}

      <span className="ml-2 text-sm text-gray-600">
        ({count} Reviews)
      </span>
    </div>
  )
}
