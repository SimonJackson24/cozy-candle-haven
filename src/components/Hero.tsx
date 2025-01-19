import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-r from-primary to-secondary">
      <div className="container">
        <div className="max-w-2xl space-y-6 animate-slideIn">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            Illuminate Your Space with Handcrafted Candles
          </h1>
          <p className="text-lg text-gray-700">
            Discover our collection of artisanal candles, wax melts, and burners designed to create the perfect ambiance.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
              <Flame className="w-5 h-5" />
              Shop Now
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};