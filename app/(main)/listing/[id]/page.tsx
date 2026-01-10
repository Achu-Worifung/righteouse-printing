'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function ListingItem()
{
    const [item, setItem] = useState<any>(null);
        const { id  } = useParams();

    useEffect(() => {
        async function fetchItem() 
        {
            const response = await fetch(`/api/products/${id}`);
            const data = await response.json();
            setItem(data);
        }
        fetchItem();
    }, []);


    return <div>Listing Item {id}</div>
}