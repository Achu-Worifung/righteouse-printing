"use client";

import { useListings } from "@/hooks/useListings";
import data from "./listing.json";
import { ListingCard } from "@/app/components/ui/listing-card";
import { useState, useEffect } from "react";
import { ListingFilterMobile } from "@/app/components/listing-filter";
import {
  filterOptions,
  Color,
} from "@/lib/types";

export default function Listings() {
  const [filters, setFilters] = useState<filterOptions>({});

  const { listings, loading, error } = useListings();
  useEffect(() => {
    const sizes: string[] = [];
    const colors: Color[] = [];
    const type: string[] = [];

    data.forEach((listing) => {
      console.log("Listing Options:", listing.options);

      if (listing.options && listing.options.sizes) {
        listing.options.sizes.forEach((size: string) => {
          if (!sizes.includes(size)) {
            sizes.push(size);
          }
        });
      }

      if (listing.options?.colors) {
        listing.options.colors.forEach((color: Color) => {
          if (!colors.some((c: Color) => c.name === color?.name)) {
            colors.push(color);
          }
        });
      }

      if (listing.category && !type.includes(listing.category)) {
        type.push(listing.category);
      }
    });

    setFilters({ sizes, colors, type });
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ListingFilterMobile
        sizes={filters.sizes}
        colors={filters.colors}
        type={filters.type}
      />

      <p>Listings found: {data.length}</p>

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 ">
        {listings.map((listing) => (
          <li key={listing._id}>
            <ListingCard listing={listing} />
          </li>
        ))}
      </ul>
    </div>
  );
}
