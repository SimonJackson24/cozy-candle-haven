import { Leaf, Recycle, Shield, Flame } from "lucide-react";

export const Sustainability = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary/10">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 animate-fadeIn">
          <span className="text-accent inline-block font-medium tracking-wider text-sm uppercase">
            Our Commitment
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">Sustainable Luxury</h2>
          <p className="text-gray-600 leading-relaxed">
            We believe in creating beautiful products that respect our environment
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: <Leaf className="w-6 h-6" />,
              title: "Natural Ingredients",
              description: "100% natural soy wax and essential oils sourced responsibly"
            },
            {
              icon: <Recycle className="w-6 h-6" />,
              title: "Eco-Friendly Packaging",
              description: "Recyclable and biodegradable packaging materials"
            },
            {
              icon: <Flame className="w-6 h-6" />,
              title: "Clean Burning",
              description: "Lead-free cotton wicks for a clean, even burn"
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Cruelty-Free",
              description: "Never tested on animals, always kind to nature"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-white/50 backdrop-blur-sm rounded-lg flex gap-4 items-start hover:shadow-lg transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};