import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { customerService } from "@/lib/vendure-client";
import { Button } from "@/components/ui/button";

interface OrderHistoryProps {
  orders?: any[];
  isLoading?: boolean;
}

export function OrderHistory({ orders: initialOrders, isLoading: initialLoading }: OrderHistoryProps) {
  const navigate = useNavigate();
  
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["customer-orders"],
    queryFn: async () => {
      console.log("Fetching customer orders...");
      const { customer } = await customerService.retrieve();
      console.log("Orders fetched:", customer.orders);
      return customer.orders;
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
              <p className="font-medium">Order #{order.code}</p>
              <p className="text-sm text-muted-foreground">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">${(order.total / 100).toFixed(2)}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {order.state}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {order.lines?.length || 0} items
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/order-confirmation?order_id=${order.id}`)}
            >
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}