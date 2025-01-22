import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { productService } from "@/lib/vendure-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface WishlistItem {
  id: string;
  product_id: string;
  variant_id: string;
  created_at: string;
  product: {
    id: string;
    title: string;
    thumbnail: string;
    handle: string;
    variants: any[];
  };
}

export function Wishlist() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ["wishlist-items"],
    queryFn: async () => {
      console.log("Fetching wishlist items...");
      const storedItems = localStorage.getItem("wishlist");
      const items = storedItems ? JSON.parse(storedItems) : [];
      
      try {
        const itemsWithDetails = await Promise.all(
          items.map(async (item: string) => {
            const { product } = await productService.retrieve(item);
            return {
              id: product.id,
              product_id: product.id,
              created_at: new Date().toISOString(),
              product: {
                id: product.id,
                title: product.name,
                thumbnail: product.featuredAsset?.preview || "/placeholder.svg",
                handle: product.handle,
                variants: product.variants,
              },
            };
          })
        );
        
        console.log("Wishlist items fetched:", itemsWithDetails);
        return itemsWithDetails;
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        toast({
          title: "Error",
          description: "Failed to load wishlist items",
          variant: "destructive",
        });
        return [];
      }
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      console.log("Removing item from wishlist:", productId);
      const storedItems = localStorage.getItem("wishlist");
      const items = storedItems ? JSON.parse(storedItems) : [];
      const updatedItems = items.filter((id: string) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updatedItems));
      return productId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist-items"] });
      toast({
        title: "Success",
        description: "Item removed from wishlist",
      });
    },
    onError: (error) => {
      console.error("Error removing item from wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  if (!wishlistItems.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Your wishlist is empty</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.href = "/products"}
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {wishlistItems.map((item: WishlistItem) => (
        <Card key={item.id} className="p-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => removeFromWishlistMutation.mutate(item.product_id)}
              disabled={removeFromWishlistMutation.isPending}
            >
              {removeFromWishlistMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
            <div className="aspect-square relative mb-4">
              <img
                src={item.product.thumbnail || "/placeholder.svg"}
                alt={item.product.title}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <div>
              <h3 className="font-medium">{item.product.title}</h3>
              <Button
                variant="secondary"
                className="w-full mt-4"
                onClick={() => {
                  window.location.href = `/products/${item.product.handle}`;
                }}
              >
                View Product
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}