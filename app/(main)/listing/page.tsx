'use client'

import { useListings } from '@/hooks/useListings'
import data  from './listing.json'
import { ListingCard } from '@/app/components/ui/listing-card'; 
import {useState, useEffect} from 'react';
import { ListingFilterMobile } from "@/app/components/listing-filter";
import { filterOptions, InsertProductPayLoad, ListingCardProps } from '@/lib/types';

export default function Listings() {

  const [filters, setFilters] = useState<filterOptions>({});
const [listings, setListings] = useState<InsertProductPayLoad[]>(data as InsertProductPayLoad[]);

  useEffect(() => {
    // Here you would normally fetch data based on filters
    // all i want to extract is sizes colors types from the listings
    const sizes: string[] = [];
    const colors: string[] = [];
    const type: string[] = [];

    data.forEach((listing) => {

      console.log("Listing Options:", listing.options);


      // Extract sizes
      if (listing.options && listing.options.sizes) {
        listing.options.sizes.forEach((size: string) => {
          if (!sizes.includes(size)) {
            sizes.push(size);
          }
        });
      }

    

      if(listing.options && listing.options.colors)
      {
        listing.options.colors.forEach((color: string) => {
          if (!colors.includes(color)) {
            colors.push(color);
          }
        });
      }

      if(listing.category && !type.includes(listing.category))
      {
        type.push(listing.category);
      }
    });

    setFilters({ sizes, colors, type });

  }, []);
  // const { listings, loading, error } = useListings()

  // if (loading) return <p>Loading…</p>
  // if (error) return <p>{error}</p>

  // console.log('Listings:', listings)

  // if (listings.length === 0) {
  //   return <p>No listings found.</p>
  // }
  // console.log("Listings:", listings);
  console.log("Listings:", listings);

  return (
    <div>
          <ListingFilterMobile sizes={filters.sizes} colors={filters.colors} type={filters.type} />

      <p>Listings found: {data.length}</p>

      {/* Example render */}
      <ul className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 '>
        {listings.map(listing => (
          <li key={listing._id}>
            <ListingCard listing={listing} />
          </li>
        ))}
      </ul>
    </div>
  )
}
