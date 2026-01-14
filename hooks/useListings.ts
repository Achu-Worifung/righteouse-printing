'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { InsertProductPayLoad } from '@/lib/types'

type Filters = {
  size: string[];
  color: string[];
  type: string[];
  rating: string[];
};
export function useListings() {
  const searchParams = useSearchParams()

  const [listings, setListings] = useState<InsertProductPayLoad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState<Filters>({
    size: [],
    color: [],
    type: [],
    rating: [],
  });

  const filterString = useMemo(() => {

 if (searchParams.getAll('size').length) {
      searchParams.getAll('size').forEach((s) => filters.size.push(s))
    }
    if (searchParams.getAll('color').length) {
      searchParams.getAll('color').forEach((c) => filters.color.push(c))
    }
    if (searchParams.getAll('type').length) {
      searchParams.getAll('type').forEach((t) => filters.type.push(t))
    }
    if (searchParams.getAll('rating').length) {
      searchParams.getAll('rating').forEach((r) => filters.rating.push(r))
    }
    // console.log('Sizes in filterString:', filters.size) 
    // console.log('Colors in filterString:', filters.color) 
    // console.log('Types in filterString:', filters.type) 
    // console.log('Ratings in filterString:', filters.rating)

    return searchParams.toString()
  }, [searchParams, filters]);


  useEffect(() => {
    const controller = new AbortController()

    async function fetchListings() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `/api/products?${filterString}`, 
          {
            method: 'GET',
            signal: controller.signal,
          }
        )

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`)
        }

        const json = await res.json()
        console.log('Fetched listings:', json)
        setListings(json.data ?? [])
      } catch (err: unknown) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error fetching listings:', err)
          setError('Failed to fetch listings')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
    return () => controller.abort()
  }, [filterString])

  return { listings, loading, error }
}
