"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import data from "./singleListing.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SizeTemplate } from "@/components/ui/size-template";
import { Stars } from "@/components/ui/stars";
import Image from "next/image";
import { ImageType, InsertProductPayLoad, variant, Color } from "@/lib/types";

interface ListingImg extends ImageType {
  sku: string;
  size: string | undefined;
  color: string;
  filename: string;
  type: string;
  url: string;
}

export default function ListingItem() {
  const { id } = useParams();

  // State
  const [product, setProduct] = useState<InsertProductPayLoad | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<ListingImg | null>(null);

  // Simulate fetch
  useEffect(() => {
    setProduct(data);
    console.log("Loaded product data:", data.variants);
  }, []);

  // Enabled variants
  const enabledVariants = useMemo(() => {
    if (!product || !product.variants) return [];
    return product.variants.filter(
      (v) => v.status === "enabled" && v.quantity > 0
    );
  }, [product]);

  // Gallery images (all variant images deduped)
  const galleryImages = useMemo(() => {
    if (!enabledVariants.length) return [];

    const images = enabledVariants.flatMap((v: variant) =>
      (v.images || []).map((img: ImageType) => ({
        ...img,
        sku: v.sku,
        size: v.size,
        color: v.color,
      }))
    );

    // remove duplicates by url
    return Array.from(new Map(images.map((img) => [img.url, img])).values());
  }, [enabledVariants]);

  // Set initial main image when gallery images are available
  useEffect(() => {
    if (galleryImages.length && !mainImage) {
      setMainImage(galleryImages[0]);
    }
  }, [galleryImages, mainImage]);

  // Size options (derived from variants)
  const sizeOptions = useMemo(() => {
    if (!product) return [];



    return product.options.sizes.map((size: string) => {
      const enabled = enabledVariants.some((v: variant) => v.size === size);
      return { size, enabled };
    });
  }, [product, enabledVariants]);

// Color options (depends on selected size)
  const colorOptions = useMemo(() => {
    if (!product) return [];

    // If no size selected, show all colors but disabled
    if (!selectedSize) {
      return product.options.colors.map((color: Color) => ({
        color: color.name,
        hex: color.hex,
        enabled: false,
      }));
    }

    // Show all colors, enabled if there's a variant with the selected size
    return product.options.colors.map((color: Color) => {
      const enabled = enabledVariants.some(
        (v: variant) => v.size === selectedSize && v.color === color.name
      );
      return { color: color.name, hex: color.hex, enabled };
    });
  }, [product, selectedSize, enabledVariants]);

  // Selected variant (size + color)
  const selectedVariant = useMemo(() => {
    if (!selectedSize || !selectedColor) return null;

    return enabledVariants.find(
      (v: variant) => v.size === selectedSize && v.color === selectedColor
    );
  }, [selectedSize, selectedColor, enabledVariants]);

  // Update main image when variant changes
  useEffect(() => {
    if (selectedVariant?.images?.length) {
      setMainImage(selectedVariant.images[0]);
    }
  }, [selectedVariant]);

  // Reset color when size changes
  useEffect(() => {
   function resetColor() {
      setSelectedColor(null);
    }
    resetColor();
  }, [selectedSize]);

  // Reset invalid color if it no longer exists
  useEffect(() => {
    if (!selectedColor || !selectedSize) return;

    const stillValid = enabledVariants.some(
      (v: variant) => v.size === selectedSize && v.color === selectedColor
    );

    if (!stillValid) {
      function resetColor() {
        setSelectedColor(null);
      }
      resetColor();
    }
  }, [selectedSize, selectedColor, enabledVariants]);

  // Debug logs
  useEffect(() => {
    console.log("Debug info:");
    console.log("Selected size:", selectedSize);
    console.log("Color options:", colorOptions);
    console.log("Enabled variants count:", enabledVariants.length);
    if (product) {
      console.log("Product colors:", product.options.colors);
      console.log("Product variants:", product.variants);
    }
  }, [selectedSize, colorOptions, enabledVariants, product]);

  if (!product) return null;

  return (
    <div className="space-y-4 md:flex md:space-y-0 md:gap-8 lg:gap-16 md:p-8">
      {/* Main image */}
      <div className="md:w-1/2 flex flex-col ">
        {mainImage && (
          <div className="w-full">
            <Image
              width={420}
              height={420}
              src={mainImage.url}
              alt=""
              className="w-full h-[420px] object-cover rounded-lg"
            />
          </div>
        )}

        {/* Gallery thumbnails */}
        <div className="mt-4 grid grid-cols-5 gap-2">
          {galleryImages.map((img: ListingImg) => {
            const isVariantImage =
              selectedVariant &&
              img.size === selectedVariant.size &&
              img.color === selectedVariant.color;

            return (
              <button
                key={img.url}
                onClick={() => setMainImage(img)}
                className={`border rounded overflow-hidden ${
                  mainImage?.url === img.url
                    ? "ring-2 ring-black"
                    : isVariantImage
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
              >
                <Image
                  width={420}
                  height={420}
                  src={img.url}
                  alt=""
                  className="h-20 w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Product info */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <h1 className="text-2xl font-bold line-clamp-2 ">
          {product.productName}
        </h1>
        <Stars rating={product.rating || null} />

        {/* Size selector */}
        <div>
          <div className="flex justify-between">
            <p className="font-medium mb-2">Size</p>
            <SizeTemplate />
          </div>
          <Select value={selectedSize || ""} onValueChange={setSelectedSize}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sizes</SelectLabel>
                {sizeOptions.map(
                  ({ size, enabled }: { size: string; enabled: boolean }) => (
                    <SelectItem key={size} value={size} disabled={!enabled}>
                      {size}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Color selector - FIXED: Removed empty value SelectItem */}
        <div>
          <p className="font-medium mb-2">Color</p>
          <Select
            disabled={!selectedSize || colorOptions.length === 0}
            value={selectedColor || ""}
            onValueChange={setSelectedColor}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  !selectedSize
                    ? "Select a size first"
                    : colorOptions.length === 0
                    ? "No colors available for this size"
                    : "Select a color"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colors</SelectLabel>
                {colorOptions.length > 0 ? (
                  colorOptions.map(
                    (
                      {
                        color,
                        hex,
                        enabled,
                      }: { color: string; hex: string; enabled: boolean },
                      index: number
                    ) => (
                      <SelectItem key={index} value={color}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: hex }}
                          />
                          <span>{color}</span>
                        </div>
                      </SelectItem>
                    )
                  )
                ) : (
                  // Changed from SelectItem to div to avoid empty value error
                  <div className="px-2 py-1.5 text-sm text-gray-500">
                    No colors available for this size
                  </div>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Variant info */}
        <div className="pt-4 border-t space-y-4">
          <div className="flex gap-3 flex-col">
            <button
              disabled={!selectedVariant}
              className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                // Add to cart logic here
                console.log("Added to cart:", selectedVariant);
              }}
            >
              Add to Cart
            </button>
            <button
              disabled={!selectedVariant}
              className="flex-1 px-6 py-3 bg-white text-black border-2 border-black rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                // Buy now logic here
                console.log("Buy now:", selectedVariant);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
        <p className="text-lg text-black mb-3">Product description</p>
        <p className="text-md text-gray-600 mb-6">{product.description}</p>
      </div>
    </div>
  );
}
