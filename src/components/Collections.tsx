import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/lib/medusa";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { Collection } from "@medusajs/medusa";

export const Collections = () => {
  const { data: collections, isLoading, error } = useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  if (error) {
    console.error("Error loading collections:", error);
    return (
      <div className="text-center text-red-500">
        Failed to load collections. Please try again later.
      </div>
    );
  }

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
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="aspect-[4/5]">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>
            ))
          ) : collections?.map((collection) => (
            <div 
              key={collection.id}
              className="group relative overflow-hidden rounded-lg aspect-[4/5]"
            >
              <img
                src={(collection.metadata?.thumbnail as string) || "/placeholder.svg"}
                alt={collection.title || "Collection"}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end text-white">
                <h3 className="font-serif text-2xl mb-2">{collection.title}</h3>
                <p className="text-white/80 mb-4">{(collection.metadata?.description as string) || "Explore our collection"}</p>
                <Link to={`/collections/${collection.handle}`}>
                  <Button 
                    variant="outline" 
                    className="w-fit bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    Explore Collection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};