import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct, medusa } from "@/lib/medusa";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus } from "lucide-react";

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
        <div>
          <img
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-serif mb-4">{product.title}</h1>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Variant</label>
              <Select
                value={selectedVariant}
                onValueChange={setSelectedVariant}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a variant" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.title} - ${(variant.prices[0].amount / 100).toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
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