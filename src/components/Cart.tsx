import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { medusa } from "@/lib/medusa";

interface CartItem {
  id: string;
  title: string;
  variant: {
    id: string;
    title: string;
  };
  quantity: number;
  unit_price: number;
  thumbnail: string;
}

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [cartId, setCartId] = useState<string | null>(null);

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
      const { cart } = await medusa.carts.retrieve(id);
      setCartItems(cart.items);
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
      const { cart } = await medusa.carts.lineItems.update(cartId, itemId, {
        quantity,
      });
      setCartItems(cart.items);
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
      const { cart } = await medusa.carts.lineItems.delete(cartId, itemId);
      setCartItems(cart.items);
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

  const total = cartItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

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
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-border pb-4"
                >
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.variant.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1 || isLoading}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${((item.unit_price * item.quantity) / 100).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-2"
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4">Proceed to Checkout</Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}