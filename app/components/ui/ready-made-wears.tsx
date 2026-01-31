import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stars } from "./stars";
import Image from "next/image";
import { motion } from "framer-motion";

interface ReadyMadeWearProps {
  // Define the props for the ReadyMadeWear component
  img: string;
  title: string; //title of the product
  price: number | null;
  discount: number | null;
  rating: number | null;
  reviews: string;
  id: string;
  url: string; //url to etsy store
  type: string; //shirt, hoodie, etc
}
export function ReadyMadeWear(product: ReadyMadeWearProps) {
  return (
    <>
      {product && (
        <Link
          href={product.url}
          className="group w-full max-w-xs shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
        >
          {/* Image Container */}
          <div className="relative w-full h-48 overflow-hidden ">
            <Image
              src={product.img}
              alt={product.title}
              width={280}
              height={192}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute top-3 left-0 bg-burgundy text-white px-3 py-1 rounded-r-md text-xs font-semibold uppercase"
            >
              <h2 className="stroke-3 px-2 pl-4  stroke-ptext bottom-4  text-sm font-normal text-white leading-relaxed">
                {product.type}
              </h2>
            </motion.div>
          </div>

          {/* Content Container */}
          <div className="p-3 flex flex-col flex-1 justify-between gap-1">
            {/* Title and Rating on one line */}
            <div className="flex items-start justify-between gap-2 flex-col">
              <h3 className="text-left text-sm md:text-base font-bold text-gray-800 line-clamp-2 group-hover:text-[#570009] transition-colors flex-1">
                {product.title}
              </h3>
              <div className="flex-shrink-0">
                <Stars rating={product.rating || null} />
              </div>
            </div>
            {product.rating && (
              <span className="text-xs text-gray-600">
                {product.rating.toFixed(1)} ({product.reviews})
              </span>
            )}

            {/* Price Section */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
              <div className="flex items-baseline gap-1">
                <span className="text-lg md:text-xl font-bold text-gray-900">
                  ${product.price?.toFixed(2)}
                </span>
                {product.discount && (
                  <span className="text-xs text-gray-500 line-through">
                    ${product.discount.toFixed(2)}
                  </span>
                )}
              </div>
              <button className="p-1.5 rounded-full bg-burgundy text-white hover:bg-[#7a020e] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
