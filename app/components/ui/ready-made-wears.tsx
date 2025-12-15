import Link from "next/link"
import { ArrowRight } from 'lucide-react';

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
                <Link href={"#"} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <img src={product.img} alt="product" width={300} height={300}
                      className="h-80 w-72 object-cover rounded-t-xl" />
                      <div className="!px-4 !py-3 w-72 flex flex-col">
                        <span>
                            <p>{product.type}</p>
                            <p className="font-bold">{product.title}</p>
                        </span>
                        <span className="flex justify-between">
                            <span>
                                <span className="text-gray-500 line-through">${product.price}</span>
                                <span className="text-red-500 font-bold">${product.discount}</span>
                            </span>
                            <span className="w-fit p-6 rounded-full hover:bg-accent">
                                <ArrowRight className="text-gray-500" />
                            </span>

                        </span>

                      </div>
                </Link>
            )}
        </>
    )
}