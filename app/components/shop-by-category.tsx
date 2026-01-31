'use client';
import { motion } from "framer-motion";
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
    <div className="flex flex-col items-between justify-center py-4 w-full my-6">
      <p className=" relative font-serif text-3xl md:text-5xl text-forest mb-2 tracking-tighter text-center">
        Shop By Category
      </p>
      <p className="text-softGray max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-lg text-center mb-10">
        Explore our collections of trendy t-shirts, hoodies, and sweatshirts.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center justify-between p-2">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="relative flex flex-col items-center justify-center group overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <Image
              src={category.imageSrc}
              alt={category.name}
              width={100}
              height={100}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />

           
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}

            className="bg-burgundy absolute left-0 bottom-2 min-w-fit rounded-br-lg rounded-tr-md text-softGray">
              <h2 className="stroke-3 px-2 pl-4  stroke-ptext bottom-4  text-lg font-normal text-white leading-relaxed">
                {category.name}
              </h2>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
