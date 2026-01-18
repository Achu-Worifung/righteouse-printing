import { ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ListingCardProps, variant, Color } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Stars } from "./stars";
import Image from "next/image";
import { addToCart } from "@/lib/to-cart";
export function ListingCard({ listing }: ListingCardProps) {
  const {
    productName,
    price,
    category,
    description,
    variants,
    options,
    rating,
  } = listing;
  const img = variants?.[0]?.images?.[0]?.url;
  // Derive enabled variants based on availability
  const enabledVariants = (variants || []).filter(
    (v: variant) => v.status === "enabled" && (v.quantity ?? 0) > 0
  );

  // Size options derived from enabled variants
  const sizeOptions: string[] = Array.from(
    new Set(
      enabledVariants
        .map((v: variant) => v.size)
        .filter((s): s is string => typeof s === "string" && s.length > 0)
    )
  );

  // Manage selected size (start with no selection)
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Color options depend on selected size (match names to option color objects)
  const colorOptions: { name: string; hex: string }[] = (() => {
    const names: string[] = selectedSize
      ? Array.from(
          new Set(
            enabledVariants
              .filter((v: variant) => v.size === selectedSize)
              .map((v: variant) => v.color)
              .filter((c): c is string => typeof c === "string" && c.length > 0)
          )
        )
      : Array.from(
          new Set(
            enabledVariants
              .map((v: variant) => v.color)
              .filter((c): c is string => typeof c === "string" && c.length > 0)
          )
        );

    // Map color names to configured option colors to retain hex and references
    const optionColors = options?.colors || [];
    return names
      .map((name) => optionColors.find((c: Color) => c.name === name))
      .filter((c): c is { name: string; hex: string } => !!c);
  })();

  // Manage selected color (object reference from options.colors, start with no selection)
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(
    null
  );

  // Find the selected variant based on size and color
  const selectedVariant = enabledVariants.find(
    (v: variant) => v.size === selectedSize && v.color === selectedColor?.name
  );

  const router = useRouter();
  return (
    <div
      className="group w-full max-w-sm flex flex-col bg-white rounded-sm shadow overflow-hidden hover:shadow-xl"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/listing/${productName.replace(/\s+/g, "-").toLowerCase()}`);
      }}
      onMouseEnter={() =>
        router.prefetch(`/listing/${productName.replace(/\s+/g, "-").toLowerCase()}`)
      }
    >
        <div className="relative w-full h-40 sm:h-48 md:h-64 overflow-hidden">
          <Image
            src={img || "/placeholder-image.png"}
            width={300}
            height={300}
            alt={productName}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>

      {/* product details  */}
      <div className="ms:p-4 p-2">
        <div className="text-indigo-600 text-sm sm:text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
          {category}
        </div>

        <h2 className="text-lg md:text-3xl font-bold text-gray-900 leading-tight sm:mb-3 mb-1">
          {productName}
        </h2>
        <Stars rating = {rating || null} />

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div
          className="mt-1 sm:mt-3 flex flex-no-wrap items-start flex-col sm:flex-row justify-start sm:justify-between sm:gap-1"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
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
                    <Image
                      src={img || "/placeholder-image.png"}
                      width={128}
                      height={128}
                      alt={productName}
                      className="w-32 h-32 object-cover mb-4 rounded"
                    />
                    <span>
                      <p className="mb-2 font-semibold">{productName}</p>
                      <Stars rating = {rating || null}/>

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
                      <p className="mb-2 font-semibold">Size: {selectedSize || "Select a size"}</p>
                      <Link
                        href={"/shirt-size-measurement"}
                        className="underline"
                      >
                        How to measure shirt size?
                      </Link>
                    </span>
                    <span className="min-w-full ">
                      <RadioGroup
                        value={selectedSize || ""}
                        onValueChange={(size) => {
                          setSelectedSize(size);
                          setSelectedColor(null);
                        }}
                        className="flex flex-row gap-4"
                      >
                        {sizeOptions.map((size) => (
                          <div
                            key={size}
                            className="flex items-center text-center justify-center "
                          >
                            <RadioGroupItem
                              value={size}
                              id={`${size}`}
                              className="hidden"
                            />
                            <span
                              className={`border rounded-full select-none flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-gray-200 ${
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
                        Color: {selectedColor?.name ?? (selectedSize ? "Select a color" : "Select a size first")}
                      </p>
                    </span>
                    <span className="min-w-full ">
                      <RadioGroup
                        value={selectedColor?.name || ""}
                        onValueChange={(colorName) => {
                          const color = colorOptions.find(c => c.name === colorName);
                          if (color) setSelectedColor(color);
                        }}
                        className="flex flex-row gap-4"
                      >
                        {colorOptions.map((color) => (
                          <div
                            key={color.name}
                            className="flex items-center text-center justify-center "
                          >
                            <RadioGroupItem
                              value={color.name}
                              id={`${color.name}`}
                              className="hidden"
                            />
                            <Label
                              htmlFor={`${color.name}`}
                              className={`cursor-pointer rounded-full flex items-center justify-center h-10 w-10  border border-black`}
                              style={{ backgroundColor: color.hex }}
                            >
                              <span
                                className={`h-5 w-5 rounded-full ${
                                  color.name === "White"
                                    ? "ring-black"
                                    : "ring-white"
                                } ${
                                  selectedColor?.name === color.name
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
                <Button 
                  type="button"
                  disabled={!selectedVariant}
                  onClick={() => {
                    if (selectedVariant) {
                      addToCart({
                        productId: listing._id || '',
                        productName: productName,
                        selectedVariant: selectedVariant
                      });
                      alert(`Added ${productName} (${selectedSize}, ${selectedColor?.name}) to cart!`);
                    }
                  }}
                >
                  Add to Cart
                </Button>
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
