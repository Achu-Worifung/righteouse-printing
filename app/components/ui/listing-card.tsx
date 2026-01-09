import { Description } from "@radix-ui/react-dialog";
import { ShoppingCart } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { Heart } from "lucide-react";
import { Star } from "lucide-react";
import { Button } from "./button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

export function ListingCard({
  name,
  price,
  rating,
  review_score,
  discount,
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
  description: string;
  variants: variant;
}) {
  review_score = 3.5; // Hardcoded for demo purposes
  description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam consectetur explicabo odit ducimus! A, mollitia! Sit, quos voluptate dolor sed unde itaque in nihil ullam consectetur dolores culpa illum. Quos."; // Hardcoded for demo purposes
  return (
    <div className="w-full max-w-sm flex flex-row sm:flex-col  bg-white rounded-sm shadow overflow-hidden   hover:shadow-xl ">
      <div className="relative h-fit overflow-hidden bg-gray-100">
        <img
          src={img}
          alt={name}
          className="w-full h-[80%] object-cover object-center transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* product details  */}
      <div className="p-4">
        <div className="text-indigo-600 text-sm sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
          {category}
        </div>

        <h2 className="text-lg md:text-3xl font-bold text-gray-900 leading-tight sm:mb-3 mb-1">
          {name}
        </h2>

        {/* ratings  */}
        <div className="flex items-center mr-2">
          {/* Define gradients once outside the stars */}
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              {Array.from({ length: 5 }).map((_, index) => {
                const fillPercentage =
                  Math.min(Math.max(rating - index, 0), 1) * 100;

                return (
                  <linearGradient key={index} id={`star-gradient-${index}`}>
                    <stop offset={`${fillPercentage}%`} stopColor="#FACC15" />
                    <stop offset={`${fillPercentage}%`} stopColor="#D1D5DB" />
                  </linearGradient>
                );
              })}
            </defs>
          </svg>

          {/* Render stars referencing the gradients */}

          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="w-4 h-4 md:w-6 md:h-6 mr-1"
              style={{
                fill: `url(#star-gradient-${index})`,
                stroke: "#D1D5DB",
              }}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-no-wrap items-start sm:items-center flex-col sm:flex-row sm:justify-between gap-4">
          {/* price container  */}
          <div className="text-2xl md:text-4xl font-extrabold text-gray-900">
            <span>${price}</span>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="lg"
                className="flex items-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
            </SheetTrigger>

            <SheetContent side={"bottom"}>
              <SheetHeader>
                <SheetTitle>Add To Cart</SheetTitle>
                <SheetDescription className="flex  items-start gap-1">
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
                    {/* Updated to dynamically render variants data */}
                    {variants.map((variant, variantIndex) => (
                      <div key={variant.sku} className="mb-4">
                        <p className="font-semibold">Variant SKU: {variant.sku}</p>
                        <p>Size: {variant.size}</p>
                        <p>Price: ${variant.price}</p>
                        <p>Quantity: {variant.quantity}</p>
                        <p>Status: {variant.status}</p>

                        {/* Render variant images */}
                        {variant.images && variant.images.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {variant.images.map((image, imageIndex) => (
                              <img
                                key={imageIndex}
                                src={image.url}
                                alt={image.filename}
                                className="w-16 h-16 object-cover rounded"
                              />
                            ))}
                          </div>
                        )}

                        {/* Render color options */}
                        {variant.color && variant.color.length > 0 && (
                          <div className="mt-2">
                            <p>Colors:</p>
                            <RadioGroup defaultValue={variant.color[0]}>
                              {variant.color.map((colorOption, colorIndex) => (
                                <div key={colorIndex} className="flex items-center space-x-2">
                                  <RadioGroupItem value={colorOption} id={`${variant.sku}-color-${colorIndex}`} />
                                  <Label htmlFor={`${variant.sku}-color-${colorIndex}`}>{colorOption}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        )}
                      </div>
                    ))}
                  </span>
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Username</Label>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </div>
              <SheetFooter>
                <Button type="submit">Save changes</Button>
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
