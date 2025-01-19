import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/medusa";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal } from "lucide-react";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", sortBy],
    queryFn: getProducts,
  });

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Products loaded:", products?.length);
  console.log("Filtered products:", filteredProducts?.length);

  if (error) {
    console.error("Error loading products:", error);
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-serif">Our Products</h1>
            <p className="text-muted-foreground">
              Discover our collection of handcrafted luxury candles
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="space-y-4">
                      <Skeleton className="h-[300px] w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))
              : filteredProducts?.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.variants[0]?.prices[0]?.amount || 0}
                    image={product.thumbnail || "/placeholder.svg"}
                    description={product.description || ""}
                  />
                ))}
          </div>

          {/* Empty State */}
          {filteredProducts?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;