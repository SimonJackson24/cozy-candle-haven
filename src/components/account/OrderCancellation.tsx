import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { medusa } from "@/lib/medusa";
import { useState } from "react";

interface OrderCancellationProps {
  orderId: string;
  onCancelled?: () => void;
}

export function OrderCancellation({ orderId, onCancelled }: OrderCancellationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCancellation = async () => {
    setIsLoading(true);
    try {
      console.log("Cancelling order:", orderId);
      await medusa.orders.cancelOrder(orderId);
      console.log("Order cancelled successfully");
      
      toast({
        title: "Order Cancelled",
        description: "Your order has been cancelled successfully",
      });
      onCancelled?.();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast({
        title: "Error",
        description: "Failed to cancel order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleCancellation} 
      disabled={isLoading}
    >
      {isLoading ? "Cancelling..." : "Cancel Order"}
    </Button>
  );
}