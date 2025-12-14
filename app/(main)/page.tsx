import Image from "next/image";
import { Carousel } from "../components/carousel";
import { ReadyToWear } from "../components/ready-to-wear";
import CreativeCards from '../components/trust-badge'

export default function Home() {
  return (
    <>
      <Carousel />
      <ReadyToWear />
      <CreativeCards />
    </>
  );
}
