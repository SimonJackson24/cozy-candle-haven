import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { medusa } from "@/lib/medusa";

interface ReturnRequestProps {
  orderId: string;
  items: any[];
  onRequestSubmitted?: () => void;
}

export function ReturnRequest({ orderId, items, onRequestSubmitted }: ReturnRequestProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one item to return",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Submitting return request:", {
        order_id: orderId,
        items: selectedItems.map(id => ({
          item_id: id,
          quantity: 1, // You might want to make this dynamic
        })),
        reason,
      });
      
      await medusa.returns.create({
        order_id: orderId,
        items: selectedItems.map(id => ({
          item_id: id,
          quantity: 1,
        })),
        return_shipping: {
          option_id: "manual",
          price: 0,
        },
      });
      
      console.log("Return request submitted successfully");
      toast({
        title: "Return Requested",
        description: "Your return request has been submitted successfully",
      });
      onRequestSubmitted?.();
    } catch (error) {
      console.error("Error submitting return request:", error);
      toast({
        title: "Error",
        description: "Failed to submit return request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Select Items to Return</Label>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <input
              type="checkbox"
              id={item.id}
              checked={selectedItems.includes(item.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedItems([...selectedItems, item.id]);
                } else {
                  setSelectedItems(selectedItems.filter(id => id !== item.id));
                }
              }}
              className="h-4 w-4"
            />
            <Label htmlFor={item.id} className="flex-1">
              {item.title} - Quantity: {item.quantity}
            </Label>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Return</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Please explain why you want to return these items"
          required
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Return Request"}
      </Button>
    </form>
  );
}