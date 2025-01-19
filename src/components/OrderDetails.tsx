import { useQuery } from "@tanstack/react-query";
import { medusa } from "@/lib/medusa";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface OrderDetailsProps {
  orderId: string;
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      console.log("Fetching order details:", orderId);
      const response = await medusa.orders.retrieve(orderId);
      console.log("Order details retrieved:", response.order);
      return response.order;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">Order #{order.display_id}</h2>
          <p className="text-sm text-muted-foreground">
            Placed on {formatDate(order.created_at)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">${(order.total / 100).toFixed(2)}</p>
          <p className="text-sm text-muted-foreground capitalize">
            {order.status}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {order.items?.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b border-border pb-4"
          >
            <img
              src={item.thumbnail || "/placeholder.svg"}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                Quantity: {item.quantity}
              </p>
            </div>
            <p className="font-medium">
              ${((item.unit_price * item.quantity) / 100).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${(order.subtotal / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>${(order.shipping_total / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${(order.tax_total / 100).toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${(order.total / 100).toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Shipping Information</h3>
        <div className="text-sm space-y-1">
          <p>{order.shipping_address?.first_name} {order.shipping_address?.last_name}</p>
          <p>{order.shipping_address?.address_1}</p>
          {order.shipping_address?.address_2 && (
            <p>{order.shipping_address.address_2}</p>
          )}
          <p>
            {order.shipping_address?.city}, {order.shipping_address?.province} {order.shipping_address?.postal_code}
          </p>
          <p>{order.shipping_address?.country_code}</p>
        </div>
      </div>
    </div>
  );
}