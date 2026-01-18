"use client";
import { ReadyMadeWear } from "./ui/ready-made-wears";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
export function ReadyToWear() {
  const [products, setProducts] = useState<ReadyMadeWearProps[] | null>(null);
  const [activeTab, setActiveTab] = useState<string>("FEATURED");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts() {
      console.log("Fetching products for tab:", activeTab);
      try {
        setLoading(true);
        // Build query based on tab
        let query = "";
        if (activeTab === "FEATURED") {
          query = "?feature=true";
        } else if (activeTab === "NEW_ARRIVAL") {
          query = "?sort=updatedAt&order=desc&type=new";
        } else if (activeTab === "BEST_SELLERS") {
          query = "?type=best";
        }

        const response = await fetch(`/api/ready-to-wear${query}`);
        const data = await response.json();
        
        // Transform API data to match ReadyMadeWearProps
        const transformedData = data.map((product: Record<string, unknown>) => {
          const variants = product.variants as Array<{images?: Array<{url: string}>}> || [];
          const rating = product.rating as {avg?: number; count?: number} || {};
          const productName = (product.productName as string) || "Product";
          
          return {
            id: product._id,
            title: productName,
            img: variants?.[0]?.images?.[0]?.url || "/placeholder-image.png",
            price: product.price as number,
            type: product.category as string,
            discount: null,
            rating: rating?.avg || null,
            reviews: rating?.count?.toString() || "0",
            url: `/listing/${productName.replace(/\s+/g, "-").toLowerCase()}`
          };
        });
        
        setProducts(transformedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeTab]);

  return (
    <div className="w-full flex items-center flex-col justify-center py-10">
      <div className="text-center p-10 w-full flex flex-col items-center justify-center gap-6">
        <h1 className="font-bold text-2xl sm:text-4xl uppercase">
          Featured Products
        </h1>
        <Tabs
          value={activeTab}
          className=" mt-5 w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className=" mx-auto">
            <TabsTrigger value="FEATURED" className="px-4">
              Featured
            </TabsTrigger>
            <TabsTrigger value="NEW_ARRIVAL" className="px-4">
              New Arrival
            </TabsTrigger>
            <TabsTrigger value="BEST_SELLERS" className="px-4">
              Best Sellers
            </TabsTrigger>
          </TabsList>
          {loading ? (
            <div className="flex flex-wrap items-center gap-4 justify-center mt-10 min-w-full">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-80 h-96 bg-gray-300 rounded-lg"
                />
              ))}
            </div>
          ) : (
            <>
              <TabsContent value="FEATURED">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center mt-12 px-4 w-full">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <ReadyMadeWear key={product.id} {...product} />
                    ))
                  ) : (
                    <p className="text-gray-600 col-span-full text-center">No featured products available</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="NEW_ARRIVAL">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center mt-12 px-4 w-full">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <ReadyMadeWear key={product.id} {...product} />
                    ))
                  ) : (
                    <p className="text-gray-600 col-span-full text-center">No new arrivals available</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="BEST_SELLERS">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center mt-12 px-4 w-full">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <ReadyMadeWear key={product.id} {...product} />
                    ))
                  ) : (
                    <p className="text-gray-600 col-span-full text-center">No best sellers available</p>
                  )}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>

      <button className="w-[150px] justify-center text-lg group flex items-center  py-1  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 ease-in-out shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] cursor-pointer active:scale-95 transform-all ">
        View More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="group-hover:animate-accordion-open inline-block h-7 w-7 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none ml-1"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
