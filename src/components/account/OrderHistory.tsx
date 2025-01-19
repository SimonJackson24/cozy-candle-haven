import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { medusa } from "@/lib/medusa";

interface OrderHistoryProps {
  orders?: any[];
  isLoading?: boolean;
}

export function OrderHistory({ orders: initialOrders, isLoading: initialLoading }: OrderHistoryProps) {
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["customer-orders"],
    queryFn: async () => {
      console.log("Fetching customer orders...");
      const response = await medusa.customers.listOrders();
      console.log("Orders fetched:", response.orders);
      return response.orders;
    },
    initialData: initialOrders,
  });

  if (isLoading || initialLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!ordersData || ordersData.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ordersData.map((order: any) => (
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
              <p className="font-medium">${(order.total / 100).toFixed(2)}</p>
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