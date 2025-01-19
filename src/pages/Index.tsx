import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <Footer />
    </main>
  );
};

export default Index;