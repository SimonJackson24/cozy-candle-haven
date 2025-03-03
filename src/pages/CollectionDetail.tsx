import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCollection } from "@/lib/vendure";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import type { VendureProduct } from "@/lib/vendure";

interface CollectionWithProducts {
  id: string;
  name: string;
  description: string;
  products: VendureProduct[];
}

export default function CollectionDetail() {
  const { handle } = useParams();

  const { data: collection, isLoading, error } = useQuery<CollectionWithProducts>({
    queryKey: ["collection", handle],
    queryFn: () => getCollection(handle!),
    enabled: !!handle,
  });

  if (error) {
    return (
      <div className="container py-8">
        <div className="text-center text-red-500">
          Failed to load collection. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="text-4xl font-serif mb-4">{collection?.name || "Collection"}</h1>
            <p className="text-muted-foreground">
              {collection?.description || "Explore our collection"}
            </p>
          </div>
        )}
        <ProductGrid products={collection?.products} isLoading={isLoading} />
      </div>
    </div>
  );
}