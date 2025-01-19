import { Button } from "@/components/ui/button";
import { Flame, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary via-secondary to-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center" />
      <div className="container relative z-10">
        <div className="max-w-2xl space-y-8 animate-slideIn">
          <span className="text-accent inline-block font-medium tracking-wider text-sm uppercase">
            Handcrafted with Love
          </span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            Transform Your Space with Artisanal Candles
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Discover our collection of luxury handcrafted candles and wax melts, designed to create the perfect ambiance in your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-base">
              <Flame className="w-5 h-5" />
              Shop Collection
            </Button>
            <Button size="lg" variant="outline" className="group gap-2 text-base">
              Learn More
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};