import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeaturedProducts />
    </main>
  );
};

export default Index;