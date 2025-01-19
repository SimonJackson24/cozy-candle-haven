import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProduct, createCart, addToCart } from "@/lib/medusa";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
    enabled: !!id,
  });

  const createCartMutation = useMutation({
    mutationFn: createCart,
    onSuccess: async (cart) => {
      if (selectedVariant) {
        await addToCartMutation.mutateAsync({
          cartId: cart.id,
          variantId: selectedVariant,
          quantity,
        });
      }
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: ({ cartId, variantId, quantity }: { cartId: string; variantId: string; quantity: number }) =>
      addToCart(cartId, variantId, quantity),
    onSuccess: () => {
      toast({
        title: "Added to cart",
        description: "The item has been added to your cart",
      });
    },
  });

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast({
        title: "Please select a variant",
        description: "You must select a variant before adding to cart",
        variant: "destructive",
      });
      return;
    }
    await createCartMutation.mutateAsync();
  };

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
            ${((product?.variants[0]?.prices[0]?.amount || 0) / 100).toFixed(2)}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {product?.description}
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Variant</label>
              <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  {product?.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
            onClick={handleAddToCart}
            disabled={createCartMutation.isPending || addToCartMutation.isPending}
          >
            <ShoppingCart className="w-4 h-4" />
            {createCartMutation.isPending || addToCartMutation.isPending
              ? "Adding to Cart..."
              : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;