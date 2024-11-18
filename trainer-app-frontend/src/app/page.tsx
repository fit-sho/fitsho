import { Header } from "@/homeSections/Header";
import { Hero } from "@/homeSections/Hero";
import { TextTicker } from "@/homeSections/TextTicker";
import { ProductShowcase } from "@/homeSections/ProductShowcase";
import { Pricing } from "@/homeSections/Pricing";
import { CallToAction } from "@/homeSections/CallToAction";
import { Footer } from "@/homeSections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TextTicker />
      <ProductShowcase />
      <Pricing />
      <CallToAction />
      <Footer />
    </>
  );
}
