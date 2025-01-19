import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Sustainability as SustainabilitySection } from "@/components/Sustainability";

const Sustainability = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif">Our Commitment to Sustainability</h1>
            <p className="text-muted-foreground">Creating a better future, one candle at a time</p>
          </div>
          
          <div className="prose prose-lg mx-auto">
            <p>
              At Lovable Candles, sustainability isn't just a buzzword—it's at the
              core of everything we do. From sourcing raw materials to packaging
              and shipping, we're committed to minimizing our environmental impact.
            </p>
          </div>
        </div>
      </div>
      <SustainabilitySection />
      <Footer />
    </main>
  );
};

export default Sustainability;