import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct, medusa } from "@/lib/medusa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductVariantSelector } from "@/components/products/ProductVariantSelector";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type Image = {
  url: string;
  id?: string;
};

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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

  const addToCart = async () => {
    if (!selectedVariant) {
      toast({
        title: "Error",
        description: "Please select a variant",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAddingToCart(true);
      let cartId = localStorage.getItem("cartId");

      if (!cartId) {
        const { cart } = await medusa.carts.create();
        cartId = cart.id;
        localStorage.setItem("cartId", cart.id);
      }

      await medusa.carts.lineItems.create(cartId, {
        variant_id: selectedVariant,
        quantity,
      });

      toast({
        title: "Success",
        description: "Item added to cart",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

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
      <div className="grid md:grid-cols-2 gap-8">
        <ProductGallery images={images} title={product.title} />
        <div>
          <h1 className="text-3xl font-serif mb-4">{product.title}</h1>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          <div className="space-y-6">
            <ProductVariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
            <Button
              className="w-full"
              onClick={addToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                "Add to Cart"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}