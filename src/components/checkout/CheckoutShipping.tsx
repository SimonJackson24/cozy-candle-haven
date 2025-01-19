import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { medusa } from "@/lib/medusa";

interface CheckoutShippingProps {
  onComplete: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export function CheckoutShipping({ onComplete, onBack, isLoading }: CheckoutShippingProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchShippingOptions = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        if (!cartId) return;

        console.log("Fetching shipping options...");
        const { shipping_options } = await medusa.shippingOptions.list();
        console.log("Available shipping options:", shipping_options);
        setShippingOptions(shipping_options);
      } catch (error) {
        console.error("Error fetching shipping options:", error);
      }
    };

    fetchShippingOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Please select a shipping method",
        variant: "destructive",
      });
      return;
    }

    try {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) {
        toast({
          title: "Error",
          description: "No cart found",
          variant: "destructive",
        });
        return;
      }

      console.log("Adding shipping method to cart...");
      const { cart } = await medusa.carts.addShippingMethod(cartId, {
        option_id: selectedMethod,
      });
      
      console.log("Shipping method added successfully:", cart);
      onComplete();
    } catch (error) {
      console.error("Error adding shipping method:", error);
      toast({
        title: "Error",
        description: "Failed to add shipping method",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Shipping Method</h2>
      
      <RadioGroup
        value={selectedMethod}
        onValueChange={setSelectedMethod}
        className="space-y-4"
      >
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary"
          >
            <RadioGroupItem value={option.id} id={option.id} />
            <Label
              htmlFor={option.id}
              className="flex flex-1 justify-between cursor-pointer"
            >
              <div>
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-muted-foreground">
                  {option.data?.description || "Standard shipping"}
                </div>
              </div>
              <div className="font-medium">
                ${(option.amount / 100).toFixed(2)}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Processing..." : "Continue to Payment"}
        </Button>
      </div>
    </form>
  );
}