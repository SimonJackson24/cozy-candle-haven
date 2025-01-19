import { Button } from "@/components/ui/button";
import { Clock, Ruler, Scissors, AlertTriangle } from "lucide-react";

export const CandleCare = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 animate-fadeIn">
          <span className="text-accent inline-block font-medium tracking-wider text-sm uppercase">
            Care Guide
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">Get the Most from Your Candles</h2>
          <p className="text-gray-600 leading-relaxed">
            Follow these essential tips to ensure the best experience with your luxury candles
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Clock className="w-6 h-6" />,
              title: "First Burn",
              description: "Allow 2-3 hours for the first burn to create an even wax pool"
            },
            {
              icon: <Ruler className="w-6 h-6" />,
              title: "Trim the Wick",
              description: "Keep wick trimmed to 1/4 inch before each lighting"
            },
            {
              icon: <Scissors className="w-6 h-6" />,
              title: "Clean Surface",
              description: "Keep the wax pool free from wick trimmings and matches"
            },
            {
              icon: <AlertTriangle className="w-6 h-6" />,
              title: "Safety First",
              description: "Never leave a burning candle unattended"
            }
          ].map((tip, index) => (
            <div 
              key={index}
              className="p-6 bg-white/50 backdrop-blur-sm rounded-lg text-center space-y-4 hover:shadow-lg transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto bg-primary rounded-full flex items-center justify-center text-accent">
                {tip.icon}
              </div>
              <h3 className="font-serif text-xl">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" className="gap-2">
            Download Complete Care Guide
          </Button>
        </div>
      </div>
    </section>
  );
};