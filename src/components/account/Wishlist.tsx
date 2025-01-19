import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { medusa } from "@/lib/medusa";

export function Wishlist() {
  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ["customer-wishlist"],
    queryFn: async () => {
      console.log("Fetching wishlist items...");
      // Note: This is a placeholder as Medusa doesn't have built-in wishlist functionality
      // You would need to implement this with a custom endpoint or local storage
      return [];
    },
  });

  if (isLoading) {
    return <div>Loading wishlist...</div>;
  }

  return (
    <div>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item: any) => (
            <ProductCard 
              key={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              description={item.description}
              productId={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}