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
import { Star } from "lucide-react";
export default function ListingItem() {
  const { id } = useParams();

  // State
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<any>(null);

  // Simulate fetch
  useEffect(() => {
    setProduct(data[0]);
  }, []);

  // Enabled variants
  const enabledVariants = useMemo(() => {
    if (!product) return [];
    return product.variants.filter(
      (v: any) => v.status === "enabled" && v.quantity > 0
    );
  }, [product]);

  // Gallery images (all variant images deduped)
  const galleryImages = useMemo(() => {
    if (!enabledVariants.length) return [];

    const images = enabledVariants.flatMap((v: any) =>
      (v.images || []).map((img: any) => ({
        ...img,
        sku: v.sku,
        size: v.size,
        color: v.color,
      }))
    );

    // remove duplicates by url
    return Array.from(new Map(images.map((img) => [img.url, img])).values());
  }, [enabledVariants]);

  // Initialize main image
  useEffect(() => {
    if (product) {
      setMainImage(galleryImages[0] || null);
    }
  }, [product, galleryImages]);

  // Size options (derived from variants)
  const sizeOptions = useMemo(() => {
    if (!product) return [];

    return product.options.sizes.map((size: string) => {
      const enabled = enabledVariants.some((v: any) => v.size === size);
      return { size, enabled };
    });
  }, [product, enabledVariants]);

  // Color options (depends on selected size)
  const colorOptions = useMemo(() => {
    if (!product || !selectedSize) return [];

    return product.options.colors.map((color: string) => {
      const enabled = enabledVariants.some(
        (v: any) => v.size === selectedSize && v.color === color
      );
      return { color, enabled };
    });
  }, [product, selectedSize, enabledVariants]);

  // Selected variant (size + color)
  const selectedVariant = useMemo(() => {
    if (!selectedSize || !selectedColor) return null;

    return enabledVariants.find(
      (v: any) => v.size === selectedSize && v.color === selectedColor
    );
  }, [selectedSize, selectedColor, enabledVariants]);

  // Update main image when variant changes
  useEffect(() => {
    if (selectedVariant?.images?.length) {
      setMainImage(selectedVariant.images[0]);
    }
  }, [selectedVariant]);

  // Reset invalid color if it no longer exists
  useEffect(() => {
    if (!selectedColor) return;

    const stillValid = enabledVariants.some(
      (v: any) => v.size === selectedSize && v.color === selectedColor
    );

    if (!stillValid) {
      setSelectedColor(null);
    }
  }, [selectedSize]);

  if (!product) return null;

  return (
    <div className="space-y-4 md:flex md:space-y-0 md:gap-8 lg:gap-16 md:p-8">
      {/* Main image */}
      <div className="md:w-1/2 flex flex-col ">
        {mainImage && (
          <div className="w-full">
            <img
              src={mainImage.url}
              alt=""
              className="w-full h-[420px] object-cover rounded-lg"
            />
          </div>
        )}

        {/* Gallery thumbnails */}
        <div className="mt-4 grid grid-cols-5 gap-2">
          {galleryImages.map((img: any) => {
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
                <img
                  src={img.url}
                  alt=""
                  className="h-20 w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
      {/* Product name */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <h1 className="text-2xl font-bold line-clamp-2 ">
          {product.productName}
        </h1>
        <Stars count={34} avg={4.5} />

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
                {sizeOptions.map(({ size, enabled }: any) => (
                  <SelectItem key={size} value={size} disabled={!enabled}>
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Color selector */}
        <div>
          <p className="font-medium mb-2">Color</p>
          <Select
            disabled={!selectedSize}
            value={selectedColor || ""}
            onValueChange={setSelectedColor}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colors</SelectLabel>
                {colorOptions.map(({ color, enabled }: any) => (
                  <SelectItem key={color} value={color} disabled={!enabled}>
                    {color}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Variant info */}
        <div className="pt-4 border-t space-y-4">
          <div className="flex gap-3 flex-col">
            <button
              disabled={!selectedVariant}
              className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              onClick={() => {
                // Add to cart logic here
                console.log("Added to cart:", selectedVariant);
              }}
            >
              Add to Cart
            </button>
            <button
              disabled={!selectedVariant}
              className="flex-1 px-6 py-3 bg-white text-black border-2 border-black rounded-lg hover:bg-gray-50 transition-colors font-medium"
              onClick={() => {
                // Buy now logic here
                console.log("Buy now:", selectedVariant);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
        <p className="text-lg text-black mb-3">Product descrioption</p>
        <p className="text-md text-gray-600 mb-6">{product.description}</p>
      </div>
    </div>
  );
}
