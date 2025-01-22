import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { orderService } from "@/lib/vendure-client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("order_id");
    if (!id) {
      navigate("/");
      toast({
        title: "Error",
        description: "No order ID found",
        variant: "destructive",
      });
    } else {
      setOrderId(id);
    }
  }, [location, navigate, toast]);

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!orderId) return null;
      console.log("Fetching order details:", orderId);
      const { order } = await orderService.retrieve(orderId);
      console.log("Order details retrieved:", order);
      return order;
    },
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-accent rounded w-1/4"></div>
          <div className="h-4 bg-accent rounded w-1/2"></div>
          <div className="h-32 bg-accent rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order #{order.code} has been confirmed.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Status</span>
              <span className="capitalize">{order.state}</span>
            </div>
            <Separator />
            <div className="space-y-4">
              {order.lines?.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.productVariant.product?.featuredAsset?.preview || "/placeholder.svg"}
                      alt={item.productVariant.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.productVariant.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${((item.productVariant.priceWithTax * item.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(order.subTotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${(order.shippingWithTax / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${((order.totalWithTax - order.total) / 100).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(order.totalWithTax / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-2">
            <p>{order.shippingAddress?.fullName}</p>
            <p>{order.shippingAddress?.streetLine1}</p>
            {order.shippingAddress?.streetLine2 && (
              <p>{order.shippingAddress.streetLine2}</p>
            )}
            <p>
              {order.shippingAddress?.city}, {order.shippingAddress?.province} {order.shippingAddress?.postalCode}
            </p>
            <p>{order.shippingAddress?.country}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate("/account")}>View Order History</Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}