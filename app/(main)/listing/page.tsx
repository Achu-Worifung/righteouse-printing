"use client";

import { useListings } from "@/hooks/useListings";
import { ListingCard } from "@/app/components/ui/listing-card";
import { useState, useEffect } from "react";
import { ListingFilterMobile, ListingFilterDesktop } from "@/app/components/listing-filter";
import {
  filterOptions,
  Color,
} from "@/lib/types";

export default function Listings() {
  const [filters, setFilters] = useState<filterOptions>({});

  const { listings, loading, error } = useListings();
  useEffect(() => {
    const sizes: string[] = [];
    const colors: string[] = [];
    const type: string[] = [];

    listings.forEach((listing) => {
      console.log("Listing Options:", listing.options);

      if (listing.options && listing.options.sizes) {
        listing.options.sizes.forEach((size: string) => {
          if (!sizes.includes(size)) {
            sizes.push(size);
          }
        });
      }

      if (listing.options?.colors) {
        listing.options.colors.map((color: Color) => {
          if (!colors.includes(color?.name)) {
            colors.push(color.name);
          }
        });
      }

      console.log('all colors:', colors);

      if (listing.category && !type.includes(listing.category)) {
        type.push(listing.category);
      }
    });

    setFilters({ sizes, colors, type });
  }, [listings]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex gap-6">
      {/* Desktop Sidebar Filter */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <ListingFilterDesktop
          sizes={filters.sizes}
          colors={filters.colors}
          type={filters.type}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Filter */}
        <div className="lg:hidden mb-4">
          <ListingFilterMobile
            sizes={filters.sizes}
            colors={filters.colors}
            type={filters.type}
          />
        </div>

        <p className="mb-4">Listings found: {listings.length}</p>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
