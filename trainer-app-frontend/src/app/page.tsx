import { Header } from "@/homeSections/Header";
import { Hero } from "@/homeSections/Hero";
import { TextTicker } from "@/homeSections/TextTicker";
import { ProductShowcase } from "@/homeSections/ProductShowcase";
import { Pricing } from "@/homeSections/Pricing";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TextTicker />
      <ProductShowcase />
      <Pricing />
    </>
  );
}
