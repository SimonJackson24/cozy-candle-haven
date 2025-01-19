import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <Testimonials />
    </main>
  );
};

export default Index;