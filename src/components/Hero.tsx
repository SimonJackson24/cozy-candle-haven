import { Button } from "@/components/ui/button";
import { Flame, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section 
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary via-secondary to-white overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center mix-blend-overlay" role="presentation" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-white/20 backdrop-blur-sm" role="presentation" />
      <div className="container relative z-10">
        <div className="max-w-2xl space-y-8 animate-slideIn">
          <span className="text-accent inline-block font-medium tracking-wider text-sm uppercase" role="doc-subtitle">
            Handcrafted with Love
          </span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight" itemProp="headline">
            Transform Your Space with Artisanal Candles
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed" itemProp="description">
            Discover our collection of luxury handcrafted candles and wax melts, designed to create the perfect ambiance in your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-base group"
              aria-label="Shop our collection"
            >
              <Flame className="w-5 h-5 transition-all group-hover:rotate-12" aria-hidden="true" />
              Shop Collection
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group gap-2 text-base hover:bg-accent/5"
              aria-label="Learn more about our products"
            >
              Learn More
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};