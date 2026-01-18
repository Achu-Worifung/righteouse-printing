import Link from "next/link";
import Image from "next/image";
export function ShopByCategory() {
  const categories = [
    {
      name: "T-Shirts",
      href: "/listing?type=t-shirt",
      imageSrc: "/categories/tshirts.jpg",
    },
    {
      name: "Hoodies",
      href: "/listing?type=hoodie",
      imageSrc: "/categories/hoodies.jpg",
    },
    {
      name: "Long Sleeve",
      href: "/listing?type=longsleeve",
      imageSrc: "/categories/longsleeve.jpg",
    },
    {
      name: "SweatShirt",
      href: "/listing?type=sweatshirt",
      imageSrc: "/categories/sweatshirts.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-between justify-center py-4 w-full">
      <h1 className="font-[Playfair Display] text-4xl mb-8 font-bold text-center">
        Shop By Category
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between p-2">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="relative flex flex-col items-center justify-center group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <Image
              src={category.imageSrc}
              alt={category.name}
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
            />

            {/* Gradient overlay at bottom only */}
            <div className="absolute bottom-0 left-0 right-0 h-24 rounded-lg bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

            {/* Text with subtle background */}
            <h2 className="absolute bottom-4 left-4 z-10 text-lg font-semibold text-white drop-shadow-lg">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
