"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RequiredIndicator, InfoIndcator } from "@/app/components/ui/form-essential";
export default function AddNewProductPage() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImages = (files?: FileList | null) => {
    if (!files) {
      setImagePreviews([]);
      return;
    }

    const next = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreviews(next);
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  return (
    <div className="w-full flex flex-col items-center flex-1 px-4 py-6">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Create a new product</h1>
            <p className="text-sm text-muted-foreground">
              Provide the essential details and inventory settings below.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Product</Button>
          </div>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Product Details</CardTitle>
                  <InfoIndcator message="Core product information shown to customers." />
                </div>
                <CardDescription>All fields are required unless noted.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Product Name <RequiredIndicator />
                  </Label>
                  <Input placeholder="e.g. Classic Cotton Tee" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Price <RequiredIndicator />
                    </Label>
                    <Input type="number" min="0" step="0.01" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Tax Class <RequiredIndicator />
                    </Label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">Select tax class</option>
                      <option value="standard">Standard</option>
                      <option value="reduced">Reduced</option>
                      <option value="exempt">Exempt</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Category <RequiredIndicator />
                    </Label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">Choose category</option>
                      <option value="tshirt">T-Shirt</option>
                      <option value="long-sleeve">Long Sleeve</option>
                      <option value="jersey">Jersey</option>
                      <option value="hoodie">Hoodie</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Description <RequiredIndicator />
                    <InfoIndcator message="A concise, customer-facing summary." />
                  </Label>
                  <textarea
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Describe the product's key features, materials, and care instructions"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Media</CardTitle>
                  <InfoIndcator message="Upload product imagery. Preview updates immediately." />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Images <RequiredIndicator />
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImages(e.target.files)}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {imagePreviews.length === 0 ? (
                    <div className="col-span-full flex h-24 items-center justify-center rounded-md border border-dashed border-muted-foreground/50 text-sm text-muted-foreground">
                      No images selected
                    </div>
                  ) : (
                    imagePreviews.map((src, idx) => (
                      <div
                        key={src}
                        className="relative aspect-square overflow-hidden rounded-md border"
                      >
                        <img
                          src={src}
                          alt={`Preview ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Inventory Management</CardTitle>
                  <InfoIndcator message="Control stock availability and quantity." />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Checkpoint
                  </Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="in-stock">In stock</option>
                    <option value="out-of-stock">Out of stock</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Quantity
                  </Label>
                  <Input type="number" min="0" step="1" placeholder="0" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Attributes</CardTitle>
                  <InfoIndcator message="Define selectable variants." />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">Color</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Select color</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="navy">Navy</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">Size</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Select size</option>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                    <option value="xxl">XXL</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
