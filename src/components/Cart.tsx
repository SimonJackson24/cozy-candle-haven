import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cartService } from "@/lib/vendure-client";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./cart/CartItem";
import { CartSummary } from "./cart/CartSummary";
import { CartOptions } from "./cart/CartOptions";

interface CartItem {
  id: string;
  productVariant: {
    id: string;
    name: string;
    price: number;
    priceWithTax: number;
    product?: {
      name: string;
      featuredAsset?: {
        preview: string;
      };
    };
  };
  quantity: number;
}

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");
  const [isGift, setIsGift] = useState(false);
  const { toast } = useToast();
  const [cartId, setCartId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId");
    if (storedCartId) {
      setCartId(storedCartId);
      fetchCart(storedCartId);
    }
  }, []);

  const fetchCart = async (id: string) => {
    try {
      setIsLoading(true);
      console.log("Fetching cart with ID:", id);
      const { cart } = await cartService.retrieve(id);
      console.log("Cart data retrieved:", cart);
      setCartItems(cart.lines);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast({
        title: "Error",
        description: "Failed to fetch cart items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateItemQuantity = async (itemId: string, quantity: number) => {
    if (!cartId) return;

    try {
      setIsLoading(true);
      console.log("Updating item quantity:", { itemId, quantity });
      const { cart } = await cartService.updateItem(cartId, itemId, quantity);
      console.log("Cart updated:", cart);
      setCartItems(cart.lines);
      toast({
        title: "Cart Updated",
        description: "Item quantity has been updated",
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!cartId) return;

    try {
      setIsLoading(true);
      console.log("Removing item from cart:", itemId);
      const { cart } = await cartService.removeItem(cartId, itemId);
      console.log("Item removed, updated cart:", cart);
      setCartItems(cart.lines);
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error("Error removing item:", error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const proceedToCheckout = async () => {
    if (!cartId) {
      toast({
        title: "Error",
        description: "No cart found",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      navigate("/checkout");
      setIsOpen(false);
    } catch (error) {
      console.error("Error proceeding to checkout:", error);
      toast({
        title: "Error",
        description: "Failed to proceed to checkout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productVariant.priceWithTax * item.quantity,
    0
  );

  const estimatedTax = subtotal * 0.1;
  const total = subtotal + estimatedTax;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center text-muted-foreground">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[40vh] overflow-y-auto">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    title={item.productVariant.product?.name || item.productVariant.name}
                    variant={{
                      id: item.productVariant.id,
                      title: item.productVariant.name
                    }}
                    quantity={item.quantity}
                    unit_price={item.productVariant.priceWithTax}
                    thumbnail={item.productVariant.product?.featuredAsset?.preview || ""}
                    onUpdateQuantity={updateItemQuantity}
                    onRemove={removeItem}
                    isLoading={isLoading}
                  />
                ))}
              </div>

              <CartOptions
                orderNotes={orderNotes}
                isGift={isGift}
                onNotesChange={setOrderNotes}
                onGiftChange={setIsGift}
              />

              <Separator />

              <CartSummary
                subtotal={subtotal}
                estimatedTax={estimatedTax}
                total={total}
              />

              <Button 
                className="w-full" 
                onClick={proceedToCheckout}
                disabled={isLoading || cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}