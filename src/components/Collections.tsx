import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Collections = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 animate-fadeIn">
          <span className="text-accent inline-block font-medium tracking-wider text-sm uppercase">
            Our Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">Signature Scents</h2>
          <p className="text-gray-600 leading-relaxed">
            Explore our carefully curated collections, each designed to create a unique atmosphere
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Botanical Garden",
              description: "Fresh floral and herbal scents inspired by nature's beauty",
              image: "/placeholder.svg"
            },
            {
              title: "Cozy Moments",
              description: "Warm and comforting fragrances for peaceful evenings",
              image: "/placeholder.svg"
            },
            {
              title: "Seasonal Delights",
              description: "Limited edition scents that capture the essence of each season",
              image: "/placeholder.svg"
            }
          ].map((collection, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-[4/5]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end text-white">
                <h3 className="font-serif text-2xl mb-2">{collection.title}</h3>
                <p className="text-white/80 mb-4">{collection.description}</p>
                <Button 
                  variant="outline" 
                  className="w-fit bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};