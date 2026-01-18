import Link from "next/link"
import { ArrowRight } from 'lucide-react';
import { Stars } from "./stars";

interface ReadyMadeWearProps
{
    // Define the props for the ReadyMadeWear component
    img:string,
    title:string, //title of the product
    price:number | null,
    discount:number | null,
    rating:number | null,
    reviews:string,
    id:string,
    url:string, //url to etsy store
    type:string //shirt, hoodie, etc
}
export function ReadyMadeWear(product:ReadyMadeWearProps)
{
    return (
        <>
            {product && (
                <Link href={product.url} className="group w-full max-w-xs bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
                    {/* Image Container */}
                    <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                        <img 
                          src={product.img} 
                          alt={product.title} 
                          width={280}
                          height={192}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-[#570009] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                          {product.type}
                        </div>
                    </div>
                    
                    {/* Content Container */}
                    <div className="p-3 flex flex-col flex-1 justify-between gap-1">
                        {/* Title and Rating on one line */}
                        <div className="flex items-center justify-between gap-2">
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
                          <button className="p-1.5 rounded-full bg-[#570009] text-white hover:bg-[#7a020e] transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                    </div>
                </Link>
            )}
        </>
    )
}