import Image from "next/image";
import { Carousel } from "../components/carousel";
import { ReadyToWear } from "../components/ready-to-wear";
import CreativeCards from '../components/trust-badge'
import { Footer } from "../components/ui/footer";
// import { CallToAction } from "../components/call-to-action";
import { ShopByCategory } from "../components/shop-by-category";
export default function Home() {
  return (
    <>
      <Carousel />
      <ShopByCategory />
      <ReadyToWear />
      {/* <CallToAction /> */}
      <CreativeCards />
      <Footer />
    </>
  );
}
