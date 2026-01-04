"use client";
import { Button } from "@/app/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";
import { InsertProductPayLoad } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {toast} from "sonner"

export default function ProductPage() {
  const [products, setproducts] = useState<InsertProductPayLoad[]>([]);
  const [filteredProducts, setfilteredProducts] = useState<
    InsertProductPayLoad[]
  >([]);
  const [searchQuery, setsearchQuery] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    async function fetchProducts() 
    {
        try 
        {
            const response = await fetch("/api/products");
            const data = await response.json();
            setproducts(data);
            setfilteredProducts(data);

        }catch(error)
        {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch products");
        }
    }
    fetchProducts();
  }, []);
  return (
    <div className="w-full flex flex-col items-center flex-1 px-4 py-6">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">All Product</h1>
            <p className="text-sm text-muted-foreground">
              Manage your products here.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="cursor-pointer">
              Create new Product
            </Button>
          </div>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
          />
        </div>
        <Table>
      <TableCaption>List of all Products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Thumbnail</TableHead>
          <TableHead className="">Name</TableHead>
          <TableHead>Price (USD)</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Tax Class</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProducts.map((product, index) => (
          <TableRow key={index} className="cursor-pointer" onClick={() => router.push(`/admin/products/edit/${product._id}`)}>
            <TableCell><img src={product.images && product.images.length > 0 ? product.images[0].filename : '/placeholder.svg'} alt={product.productName} className="w-15 h-15 object-cover rounded-md"/></TableCell>
            <TableCell className="font-medium">{product.productName}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell className="text-right">{product.taxClass}</TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
      </div>
    </div>
  );
}


