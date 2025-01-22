import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/lib/vendure-client";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductReviews } from "@/components/products/ProductReviews";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail() {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");
      console.log("Fetching product details:", id);
      const { product } = await productService.retrieve(id);
      console.log("Product details retrieved:", product);
      return product;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <ProductGallery
          images={[
            product.featuredAsset?.preview || "/placeholder.svg",
            // Add additional images here if available
          ]}
        />
        <ProductInfo
          product={{
            id: product.id,
            title: product.name,
            description: product.description,
            price: product.variants[0]?.priceWithTax || 0,
            variants: product.variants.map((variant) => ({
              id: variant.id,
              title: variant.name,
              price: variant.priceWithTax,
              original_price: variant.price,
              calculated_price: variant.priceWithTax,
            })),
          }}
        />
      </div>

      <div className="space-y-16">
        <ProductReviews productId={product.id} />
        <RelatedProducts
          currentProductId={product.id}
          collectionId={product.collections?.[0]?.id}
        />
      </div>
    </div>
  );
}