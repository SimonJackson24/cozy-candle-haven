import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/medusa";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Heart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
    enabled: !!id,
  });

  console.log("Product detail data:", product);

  if (error) {
    console.error("Error loading product:", error);
    return (
      <div className="container py-12">
        <div className="text-center text-red-500">
          Failed to load product. Please try again later.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[500px] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product?.thumbnail || "/placeholder.svg"}
            alt={product?.title}
            className="w-full h-auto rounded-lg"
          />
          <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-serif">{product?.title}</h1>
          <p className="text-2xl font-medium">
            ${(product?.variants[0]?.prices[0]?.amount || 0).toFixed(2)}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {product?.description}
          </p>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;