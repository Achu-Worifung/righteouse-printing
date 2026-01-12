import { Star } from "lucide-react"

interface StarsProps {
  count: number;
  avg: number;
  sum: number;
}

export function Stars({ count, avg,}: StarsProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => {
          const fill = Math.max(0, Math.min(1, avg - i))

          return (
            <div key={i} className={`relative md:w-5 md:h-5 w-4 h-4`}>
              <Star
                className="absolute inset-0 w-full h-full text-gray-300"
                fill="currentColor"
              />

              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >

                <Star
                  className={`text-amber-400 md:w-5 md:h-5 w-4 h-4`}
                  fill="currentColor"
                />
              </div>
            </div>
          )
        })}
      </div>

      <span className="ml-2 text-sm text-gray-600">
        ({count})
      </span>
    </div>
  )
}