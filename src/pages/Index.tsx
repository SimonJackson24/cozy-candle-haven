import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { Collections } from "@/components/Collections";
import { Sustainability } from "@/components/Sustainability";
import { CandleCare } from "@/components/CandleCare";
import { USPBanner } from "@/components/USPBanner";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <USPBanner />
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <Collections />
      <Sustainability />
      <CandleCare />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;