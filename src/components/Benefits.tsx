import { Flame, Leaf, Heart, Package } from "lucide-react";

const benefits = [
  {
    icon: <Flame className="w-6 h-6" />,
    title: "Hand-Crafted",
    description: "Each candle is carefully crafted with attention to detail"
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Natural Ingredients",
    description: "Made with sustainable soy wax and essential oils"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Made with Love",
    description: "Small-batch production ensures highest quality"
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Eco-Friendly",
    description: "Sustainable packaging and recyclable materials"
  }
];

export const Benefits = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 animate-fadeIn">
          <span className="text-accent inline-block font-medium tracking-wider text-sm uppercase">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">Our Promise</h2>
          <p className="text-gray-600 leading-relaxed">
            Experience the difference of artisanal candle making
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="p-6 bg-white/50 backdrop-blur-sm rounded-lg text-center space-y-4 hover:shadow-lg transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto bg-primary rounded-full flex items-center justify-center text-accent">
                {benefit.icon}
              </div>
              <h3 className="font-serif text-xl">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};