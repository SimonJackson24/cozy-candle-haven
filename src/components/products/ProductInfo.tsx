import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { medusa } from "@/lib/medusa";
import { ProductVariantSelector } from "./ProductVariantSelector";
import { QuantitySelector } from "./QuantitySelector";

interface ProductInfoProps {
  product: any;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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

  return (
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
  );
};