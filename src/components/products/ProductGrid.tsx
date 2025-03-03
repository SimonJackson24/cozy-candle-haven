import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { VendureProduct } from "@/lib/vendure";

interface ProductGridProps {
  products: VendureProduct[] | undefined;
  isLoading: boolean;
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.name}
          price={product.variants?.[0]?.priceWithTax || 0}
          image={product.featuredAsset?.preview || "/placeholder.svg"}
          description={product.description || ""}
          productId={product.id}
        />
      ))}
    </div>
  );
};