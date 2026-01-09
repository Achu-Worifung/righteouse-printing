'use client';
import {useEffect, useState, useMemo} from "react";
import { useSearchParams } from "next/navigation";


export function useListings() 
{
    const searchParams = useSearchParams();
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    // Extract filters from search params
    const filterString = useMemo(() =>
    {
        return new URLSearchParams(searchParams.toString());
    }, [searchParams]);


    useEffect(() =>
    {
        const controller = new AbortController();
        async function fetchListings() 
        {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`/api/products?${filterString.toString()}`, {
                    signal: controller.signal
                });
                const data = await res.json();
                setListings(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products");
                setLoading(false);
            }
        }
        fetchListings();
        return () => controller.abort();
    }, [filterString]);

    return { listings, loading, error };
}