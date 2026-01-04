'use client';
import ProductForm from "@/app/components/product-form";
import { useParams } from "next/navigation";
import {  useEffect , useState} from "react";
import { InsertProductPayLoad } from "@/lib/types";
export default function EditProductPage()
{
    const params = useParams();
    const [productData, setProductData] = useState<InsertProductPayLoad | null>(null);
    const { id } = params;
    console.log("Editing product with ID:", id);
    useEffect(() =>{
        async function fetchProductData()
        {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            setProductData(data);

            console.log("Fetched product data:", data);
        }
        fetchProductData();
    }, []);
    return (
        <ProductForm initialData={productData} />
    );
}