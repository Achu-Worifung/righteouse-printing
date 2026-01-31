"use client";
import { ReadyMadeWear } from "./ui/ready-made-wears";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
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
  const [activeTab, setActiveTab] = useState<string>("featured");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const TABS = [
    {
      key: "featured",
      label: "Featured",
      subtitle: "Handpicked by our studio",
    },
    {
      key: "new",
      label: "New Arrivals",
      subtitle: "Fresh additions to the collection",
    },
    { key: "popular", label: "Most Purchased", subtitle: "Customer favorites" },
  ];

  useEffect(() => {
    async function fetchProducts() {
      console.log("Fetching products for tab:", activeTab);
      try {
        setLoading(true);
        // Build query based on tab
        let query = "";
        if (activeTab === "featured") {
          query = "?feature=true";
        } else if (activeTab === "new") {
          query = "?sort=updatedAt&order=desc&type=new";
        } else if (activeTab === "popular") {
          query = "?type=best";
        }

        const response = await fetch(`/api/ready-to-wear${query}`);
        const data = await response.json();

        // Transform API data to match ReadyMadeWearProps
        const transformedData = data.map((product: Record<string, unknown>) => {
          const variants =
            (product.variants as Array<{ images?: Array<{ url: string }> }>) ||
            [];
          const rating =
            (product.rating as { avg?: number; count?: number }) || {};
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
            url: `/listing/${productName.replace(/\s+/g, "-").toLowerCase()}`,
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
      <div className="text-center p-2 w-full flex flex-col items-center justify-center gap-4">
        <div className="">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab + "1"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative font-serif text-3xl md:text-5xl text-forest mb-2 tracking-tighter text-center"
            >
              {TABS.find((tab) => tab.key === activeTab)?.label}
            </motion.p>
            <motion.p
              key={activeTab + "2"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-black mt-3"
            >
              {TABS.find((tab) => tab.key === activeTab)?.subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        <Tabs
          value={activeTab}
          className=" mt-5 w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className=" mx-auto">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key} className="px-4">
                {tab.label}
              </TabsTrigger>
            ))}
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
              <TabsContent value="featured">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-center mt-12 w-full">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <ReadyMadeWear key={product.id} {...product} />
                    ))
                  ) : (
                    <p className="text-softGray col-span-full max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-lg text-center mb-10">
                      No featured products available
                    </p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="new">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-center mt-12 w-full">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <ReadyMadeWear key={product.id} {...product} />
                    ))
                  ) : (
                    <p className="text-softGray max-w-2xl col-span-full mx-auto font-light leading-relaxed text-sm md:text-lg text-center mb-10">
                      No new arrivals available
                    </p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="popular">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-center mt-12  w-full">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <ReadyMadeWear key={product.id} {...product} />
                    ))
                  ) : (
                    <p className="text-softGray max-w-2xl col-span-full mx-auto font-light leading-relaxed text-sm md:text-lg text-center mb-10">
                      No most purchased available
                    </p>
                  )}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>

      <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{scale:.90}}
      onClick={() => router.push("/listing")}
      transition={{duration:.03
      }}
      className="my-5 w-[150px] justify-center text-lg group flex items-center  py-1  border-2 border-black dark:border-white uppercase bg-offwhite text-black transition duration-200 ease-in-out shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] cursor-pointer active:scale-95 transform-all ">
        View More
     
      </motion.button>
    </div>
  );
}
