"use client";
import { useListings } from "@/hooks/useListings";
export default function UniqueListing() {
  const { listings, loading, error } = useListings();
  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
    console.log("Listings:", listings);
  return null;
}
