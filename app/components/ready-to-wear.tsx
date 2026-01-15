"use client";
import { ReadyMadeWear } from "./ui/ready-made-wears";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
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
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts() {
      console.log("Fetching products for tab:", activeTab);
      try {
        setLoading(true);
        const response = await fetch(`/api/ready-to-wear?type=${activeTab}`);
        const data = await response.json();
        setProducts(data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        // setLoading(false);
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
          <TabsList className=" bg-gray-600 mx-auto">
            <TabsTrigger value="ALL" className="px-4">
              All
            </TabsTrigger>
            <TabsTrigger value="New Arrival" className="px-4">
              New Arrival
            </TabsTrigger>
            <TabsTrigger value="Best Sellers" className="px-4">
              Best Sellers
            </TabsTrigger>
          </TabsList>
          {loading ? (
            <div className="flex flex-wrap items-center  gap-4 justify-center mt-10 min-w-full">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-1/2 flex-1 h-72 bg-gray-600"
                />
              ))}
            </div>
          ) : (
            <>
              <TabsContent value="account">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
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
