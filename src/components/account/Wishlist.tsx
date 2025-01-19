import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  return (
    <div>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}