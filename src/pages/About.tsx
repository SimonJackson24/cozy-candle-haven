import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif">Our Story</h1>
            <p className="text-muted-foreground">Crafting moments of warmth and tranquility</p>
          </div>
          
          <div className="prose prose-lg mx-auto">
            <p>
              Founded in 2020, Lovable Candles began with a simple mission: to create
              premium, sustainable candles that transform spaces and uplift spirits.
            </p>
            
            <p>
              Our journey started in a small workshop, where we experimented with
              different wax blends, essential oils, and natural ingredients to create
              the perfect candle. Today, we continue to handcraft each candle with
              the same dedication to quality and sustainability.
            </p>
            
            <h2 className="font-serif">Our Values</h2>
            <ul>
              <li>Quality craftsmanship in every candle</li>
              <li>Sustainable and eco-friendly practices</li>
              <li>Supporting local communities</li>
              <li>Creating moments of joy and relaxation</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default About;