import Link from "next/link"
export function ShopByCategory() {

    const categories = [
        {
            name: "T-Shirts",
            href: "/shop?type=t-shirt",
            imageSrc: "/categories/tshirts.jpg",
        },
        {
            name: "Hoodies",
            href: "/shop?type=hoodie",
            imageSrc: "/categories/hoodies.jpg",
        },
        {
            name: "Long Sleeve",
            href: "/shop?type=sweatshirt",
            imageSrc: "/categories/sweatshirts.jpg",
        },
        {
            name: "SweatShirt",
            href: "/shop?type=sweatshirt",
            imageSrc: "/categories/sweatshirts.jpg",
        },
    ]

    
    return (
        <h1>Shop By Category</h1>

    )
}