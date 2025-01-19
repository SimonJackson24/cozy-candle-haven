import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

interface OrderHistoryProps {
  orders: any[];
  isLoading: boolean;
}

export function OrderHistory({ orders, isLoading }: OrderHistoryProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 hover:bg-accent transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-medium">Order #{order.display_id}</p>
              <p className="text-sm text-muted-foreground">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">{order.total}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {order.status}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              {order.items?.length || 0} items
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}