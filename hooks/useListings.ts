'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { InsertProductPayLoad } from '@/lib/types'
export function useListings() {
  const searchParams = useSearchParams()

  const [listings, setListings] = useState<InsertProductPayLoad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const filterString = useMemo(() => {
    return searchParams.toString()
  }, [searchParams])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchListings() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `/api/products?${filterString}`, 
          { signal: controller.signal }
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
