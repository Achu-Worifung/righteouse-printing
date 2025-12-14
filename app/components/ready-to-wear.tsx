
import { ReadyMadeWear } from "./ui/ready-made-wears"
interface ReadyMadeWearProps
{
    // Define the props for the ReadyMadeWear component
    img:string,
    title:string, //title of the product
    price:number | null,
    discount:number | null,
    rating:number | null,
    reviews:string,
    id:string,
    url:string, //url to etsy store
    type:string //shirt, hoodie, etc
}
export function ReadyToWear() {
  const products: ReadyMadeWearProps[] = [
    {
      id: "1",
      img: "/childofgod.png",
      title: "Classic T-Shirt",
      price: 149,
      discount: 199,
      rating: 4.5,
      reviews: "128",
      url: "https://www.etsy.com",
      type: "shirt",
    },
    {
      id: "2",
      img: "/childofgod.png",
      title: "Premium Hoodie",
      price: 149,
      discount: 199,
      rating: 4.8,
      reviews: "95",
      url: "https://www.etsy.com",
      type: "hoodie",
    },
    {
      id: "3",
      img: "/childofgod.png",
      title: "Designer Cap",
      price: 149,
      discount: 199,
      rating: 4.3,
      reviews: "67",
      url: "https://www.etsy.com",
      type: "cap",
    },
    {
      id: "4",
      img: "/childofgod.png",
      title: "Vintage Sweater",
      price: 149,
      discount: 199,
      rating: 4.6,
      reviews: "112",
      url: "https://www.etsy.com",
      type: "sweater",
    },
    {
      id: "5",
      img: "/childofgod.png",
      title: "Graphic Tee",
      price: 149,
      discount: 199,
      rating: 4.7,
      reviews: "89",
      url: "https://www.etsy.com",
      type: "shirt",
    },
    {
      id: "6",
      img: "/childofgod.png",
      title: "Athletic Jacket",
      price: 149,
      discount: 199,
      rating: 4.4,
      reviews: "76",
      url: "https://www.etsy.com",
      type: "jacket",
    },
  ];

  return (
    <div className="w-full flex items-center flex-col justify-center mt-10!">
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-6 uppercase">
          Shope our Ready to Wear Collection
        </h1>
        <h1 className="text-3xl mb-4">Shop Now</h1>
      </div>

      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 !my-4">
        {products.map((product) => (
            <ReadyMadeWear key={product.id} {...product} />
        ))}
      </section>

      
    </div>
  );
}
