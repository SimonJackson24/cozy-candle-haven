import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { medusa } from "@/lib/medusa";

interface CartItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  thumbnail: string;
}

export function CheckoutSummary() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      fetchCart(cartId);
    }
  }, []);

  const fetchCart = async (cartId: string) => {
    try {
      setIsLoading(true);
      const { cart } = await medusa.carts.retrieve(cartId);
      setCartItems(cart.items);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );
  const shipping = 5.99 * 100; // Convert to cents to match Medusa's pricing
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="border rounded-lg p-6 space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6 space-y-4 sticky top-4">
      <h2 className="text-xl font-semibold">Order Summary</h2>
      
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.thumbnail || "/placeholder.svg"}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              <p className="font-medium">
                ${((item.unit_price * item.quantity) / 100).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${(subtotal / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>${(shipping / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${(tax / 100).toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>${(total / 100).toFixed(2)}</span>
      </div>
    </div>
  );
}