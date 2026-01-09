'use client'

import { useListings } from '@/hooks/useListings'
import data from './listing.json'
import { ListingCard } from '@/app/components/ui/listing-card'; 

export default function Listings() {
  // const { listings, loading, error } = useListings()

  // if (loading) return <p>Loading…</p>
  // if (error) return <p>{error}</p>

  // console.log('Listings:', listings)

  // if (listings.length === 0) {
  //   return <p>No listings found.</p>
  // }
  // console.log("Listings:", listings);
  console.log("Listings:", data);

  return (
    <div>
      <p>Listings found: {data.length}</p>

      {/* Example render */}
      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 '>
        {data.map(listing => (
          <li key={listing._id}>
            <ListingCard name={listing.productName} price={listing.price} rating={listing.rating} review_score={listing.review_score} discount={listing.discount } category={listing.category} img={listing.images[0].url} variants={listing.variants}/>
          </li>
        ))}
      </ul>
    </div>
  )
}
