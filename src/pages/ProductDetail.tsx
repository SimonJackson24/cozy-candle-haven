import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/medusa";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductReviews } from "@/components/products/ProductReviews";
import { RelatedProducts } from "@/components/products/RelatedProducts";

type Image = {
  url: string;
  id?: string;
};

export default function ProductDetail() {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
  });

  console.log("Product data:", product);

  const images: (Image | string)[] = product?.images || [];
  if (product?.thumbnail) {
    const thumbnailUrl = typeof product.thumbnail === 'string' 
      ? product.thumbnail 
      : (product.thumbnail as Image).url;
    if (!images.some(img => (typeof img === 'string' ? img : (img as Image).url) === thumbnailUrl)) {
      images.unshift(product.thumbnail);
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <ProductGallery images={images} title={product.title} />
        <ProductInfo product={product} />
      </div>

      <div className="space-y-16">
        <ProductReviews 
          productId={product.id} 
          reviews={[
            {
              id: "1",
              rating: 5,
              comment: "Great product! Exactly as described.",
              customer_name: "John D.",
              created_at: "2024-02-20",
            },
            {
              id: "2",
              rating: 4,
              comment: "Good quality, fast shipping.",
              customer_name: "Sarah M.",
              created_at: "2024-02-19",
            },
          ]} 
        />

        <RelatedProducts 
          currentProductId={product.id}
          collectionId={product.collection?.id}
          tags={product.tags?.map(tag => tag.value)}
        />
      </div>
    </div>
  );
}