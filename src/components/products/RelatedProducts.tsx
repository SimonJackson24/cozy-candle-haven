import { useQuery } from "@tanstack/react-query";
import { getProducts, type MedusaProduct } from "@/lib/medusa";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedProductsProps {
  currentProductId: string;
  collectionId?: string;
  tags?: string[];
}

export const RelatedProducts = ({ currentProductId, collectionId, tags }: RelatedProductsProps) => {
  const { data: products, isLoading } = useQuery<MedusaProduct[]>({
    queryKey: ["related-products", collectionId, tags],
    queryFn: getProducts,
  });

  console.log("Related products data:", products);

  const relatedProducts = products
    ?.filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-[300px] w-full" />
        ))}
      </div>
    );
  }

  if (!relatedProducts?.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-serif">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title || ""}
            price={product.variants?.[0]?.prices?.[0]?.amount || 0}
            image={product.thumbnail || "/placeholder.svg"}
            description={product.description || ""}
            productId={product.id}
          />
        ))}
      </div>
    </div>
  );
};