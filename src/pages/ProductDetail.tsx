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
import { Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define the Image type based on Medusa's types
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomDialogOpen, setIsZoomDialogOpen] = useState(false);

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

  const getImageUrl = (image: Image | string): string => {
    return typeof image === 'string' ? image : image.url;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Dialog open={isZoomDialogOpen} onOpenChange={setIsZoomDialogOpen}>
              <DialogTrigger asChild>
                <img
                  src={getImageUrl(images[currentImageIndex]) || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover cursor-zoom-in"
                />
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img
                  src={getImageUrl(images[currentImageIndex]) || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </DialogContent>
            </Dialog>
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-accent"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={getImageUrl(image) || "/placeholder.svg"}
                    alt={`${product.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
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