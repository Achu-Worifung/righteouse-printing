
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
    <div className="w-full flex items-center flex-col justify-center py-10">
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
      <button className="w-[150px] justify-center text-lg group flex items-center  py-1  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 ease-in-out shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] cursor-pointer active:scale-95 transform-all ">
          View More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="group-hover:animate-accordion-open inline-block h-7 w-7 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none ml-1"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

      
    </div>
  );
}
