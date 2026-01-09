'use client'

import { useListings } from '@/hooks/useListings'

export default function Listings() {
  const { listings, loading, error } = useListings()

  if (loading) return <p>Loading…</p>
  if (error) return <p>{error}</p>

  console.log('Listings:', listings)

  if (listings.length === 0) {
    return <p>No listings found.</p>
  }

  return (
    <div>
      <p>Listings found: {listings.length}</p>

      {/* Example render */}
      <ul>
        {listings.map(listing => (
          <li key={listing.id}>
            {listing.title} — ${listing.price}
          </li>
        ))}
      </ul>
    </div>
  )
}
