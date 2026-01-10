import { Description } from "@radix-ui/react-dialog";
import { Shirt, ShoppingCart } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { Heart } from "lucide-react";
import { Star } from "lucide-react";
import { Button } from "./button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShirtSizeMeasurement } from "./shirt-size-measurement";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { variant } from "@/lib/types";
import { useRouter } from "next/navigation";

export function ListingCard({
  name,
  price,
  rating,
  review_score,
  discount,
  availableSizes,
  availableColors,
  category,
  img,
  description,
  variants,
}: {
  name: string;
  price: number;
  rating: number;
  review_score: number;
  discount?: number;
  category: string;
  img: string;
  availableSizes: string[];
  availableColors: string[];
  description: string;
  variants: variant;
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    availableSizes[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    availableColors[0]
  );
  const router = useRouter();
  return (
    <div
      className="w-full max-w-sm flex flex-col  bg-white rounded-sm shadow overflow-hidden   hover:shadow-xl "
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/listing/${name.replace(/\s+/g, "-").toLowerCase()}`);
      }}
      onMouseEnter={() =>
        router.prefetch(`/listing/${name.replace(/\s+/g, "-").toLowerCase()}`)
      }
    >
      <div className="relative h-fit overflow-hidden bg-gray-100">
        <img
          src={img}
          alt={name}
          className="w-full h-[80%] object-cover object-center transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* product details  */}
      <div className="ms:p-4 p-2">
        <div className="text-indigo-600 text-sm sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
          {category}
        </div>

        <h2 className="text-lg md:text-3xl font-bold text-gray-900 leading-tight sm:mb-3 mb-1">
          {name}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="mt-1 sm:mt-3 flex flex-no-wrap items-start flex-col sm:flex-row justify-start sm:justify-between sm:gap-1"
          onClick={(e) => {
            e.stopPropagation()
          }}>
          <div className="text-lg sm:text-2xl md:text-4xl font-extrabold text-gray-900">
            <span>${price}</span>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="flex items-center gap-2 cursor-pointer rounded-2xl w-full sm:w-auto justify-center mt-3 sm:mt-0"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <ShoppingCart className="w-5 h-5 hidden sm:inline" />
                Add to Cart
              </Button>
            </SheetTrigger>

            <SheetContent side={"bottom"} onClick={(e) => e.stopPropagation()}>
              <SheetHeader>
                <SheetTitle>Add To Cart</SheetTitle>
                <div className="flex flex-col items-start gap-1">
                  <div className="flex flex-row gap-1">
                    <img
                      src={img}
                      alt={name}
                      className="w-32 h-32 object-cover mb-4"
                    />
                    <span>
                      <p className="mb-2 font-semibold">{name}</p>
                      <p className="mb-2 text-gray-600 line-clamp-2">
                        {description}
                      </p>
                      <Link href={"/listing"} className="underline">
                        See all items details
                      </Link>
                    </span>
                  </div>
                  <Separator orientation="horizontal" className="" />
                  <div className="w-full">
                    <span className="flex flex-row justify-between items-baseline min-w-full ">
                      <p className="mb-2 font-semibold">Size: {selectedSize}</p>
                      <Link
                        href={"/shirt-size-measurement"}
                        className="underline"
                      >
                        How to measure shirt size?
                      </Link>
                    </span>
                    <span className="min-w-full ">
                      <RadioGroup
                        defaultValue={availableSizes[0]}
                        className="flex flex-row gap-4"
                      >
                        {availableSizes.map((size) => (
                          <div
                            key={size}
                            className="flex items-center text-center justify-center "
                          >
                            <RadioGroupItem
                              value={size}
                              id={`${size}`}
                              onClick={() => setSelectedSize(size)}
                              className="hidden"
                            />
                            <span
                              className={`border rounded-full cursor-pointer hover:bg-gray-200 select-none flex items-center justify-center h-10 w-10 ${
                                selectedSize === size ? "bg-gray-300" : ""
                              }`}
                            >
                              <Label
                                htmlFor={`${size}`}
                                className="cursor-pointer"
                              >
                                {size}
                              </Label>
                            </span>
                          </div>
                        ))}
                      </RadioGroup>
                    </span>
                  </div>

                  <div className="w-full">
                    <span className="flex flex-row justify-between items-baseline min-w-full ">
                      <p className="mb-2 font-semibold">
                        Color: {selectedColor}
                      </p>
                    </span>
                    <span className="min-w-full ">
                      <RadioGroup
                        defaultValue={availableColors[0]}
                        className="flex flex-row gap-4"
                      >
                        {availableColors.map((color) => (
                          <div
                            key={color}
                            className="flex items-center text-center justify-center "
                          >
                            <RadioGroupItem
                              value={color}
                              id={`${color}`}
                              onClick={() => setSelectedColor(color)}
                              className="hidden"
                            />
                            <Label
                              htmlFor={`${color}`}
                              className={`cursor-pointer rounded-full flex items-center justify-center h-10 w-10 rounded-rull border border-black`}
                              style={{ backgroundColor: color.toLowerCase() }}
                            >
                              <span
                                className={`h-5 w-5 rounded-full ${
                                  selectedColor === "White"
                                    ? "ring-black"
                                    : "ring-white"
                                } ${
                                  selectedColor === color
                                    ? "ring-2  ring-offset-2"
                                    : ""
                                }`}
                              ></span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </span>
                  </div>
                </div>
              </SheetHeader>
              <SheetFooter>
                <Button type="submit">Add to Cart</Button>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
