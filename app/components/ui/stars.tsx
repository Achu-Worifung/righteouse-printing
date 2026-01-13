import { Star } from "lucide-react";

import { rating } from "@/lib/types";

export function Stars({ rating }: { rating: rating }) {
  return (
    <div className="flex items-center gap-1">
      {rating ? (
        <>
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => {
              const fill = Math.max(0, Math.min(1, (rating.avg || 0) - i));

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
              );
            })}
          </div>
        </>
      ) : (
        <div  className={`w-fit flex`}>
          {
            Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className=" inset-0  text-gray-300 md:w-5 md:h-5 w-4 h-4"
                fill="currentColor"
              />
            ))
          }
        </div>
      )}

      <span className="ml-2 text-sm text-gray-600">({rating?.count || 0})</span>
    </div>
  );
}
