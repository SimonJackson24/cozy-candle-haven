import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CheckoutShippingProps {
  onComplete: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export function CheckoutShipping({ onComplete, onBack, isLoading }: CheckoutShippingProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const { toast } = useToast();

  const shippingMethods = [
    { id: "standard", name: "Standard Shipping", price: 5.99, duration: "3-5 business days" },
    { id: "express", name: "Express Shipping", price: 15.99, duration: "1-2 business days" },
    { id: "overnight", name: "Overnight Shipping", price: 29.99, duration: "Next business day" },
  ];

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

    // Here we'll add the shipping method to the cart via Medusa's API
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Shipping Method</h2>
      
      <RadioGroup
        value={selectedMethod}
        onValueChange={setSelectedMethod}
        className="space-y-4"
      >
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary"
          >
            <RadioGroupItem value={method.id} id={method.id} />
            <Label
              htmlFor={method.id}
              className="flex flex-1 justify-between cursor-pointer"
            >
              <div>
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-muted-foreground">
                  {method.duration}
                </div>
              </div>
              <div className="font-medium">
                ${method.price.toFixed(2)}
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