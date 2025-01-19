import { ProductCard } from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/medusa";
import { Skeleton } from "@/components/ui/skeleton";

export const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (error) {
    console.error("Error loading products:", error);
    return (
      <div className="text-center text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary/10">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 animate-fadeIn">
          <span className="text-accent inline-block font-medium tracking-wider text-sm uppercase">
            Our Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">Featured Products</h2>
          <p className="text-gray-600 leading-relaxed">
            Discover our most loved candles and melts, handcrafted with premium ingredients
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-[300px] w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            products?.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                title={product.title}
                price={product.variants[0]?.prices[0]?.amount || 0}
                image={product.thumbnail || "/placeholder.svg"}
                description={product.description || ""}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};