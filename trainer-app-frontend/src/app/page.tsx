import { Header } from "@/homeSections/Header";
import { Hero } from "@/homeSections/Hero";
import { TextTicker } from "@/homeSections/TextTicker";
import { ProductShowcase } from "@/homeSections/ProductShowcase";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TextTicker />
      <ProductShowcase />
    </>
  );
}
