import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { medusa } from "@/lib/medusa";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CheckoutShippingProps {
  onComplete: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export function CheckoutShipping({ onComplete, onBack, isLoading }: CheckoutShippingProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchShippingOptions = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        if (!cartId) {
          setError("No cart found");
          return;
        }

        setLoadingOptions(true);
        console.log("Fetching shipping options...");
        const { shipping_options } = await medusa.shippingOptions.list();
        console.log("Available shipping options:", shipping_options);
        setShippingOptions(shipping_options);
        setError(null);
      } catch (error) {
        console.error("Error fetching shipping options:", error);
        setError("Failed to load shipping options");
      } finally {
        setLoadingOptions(false);
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
      toast({
        title: "Success",
        description: "Shipping method has been selected",
      });
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

  if (loadingOptions) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Method</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Shipping Method</h2>
      
      {shippingOptions.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Shipping Options</AlertTitle>
          <AlertDescription>
            No shipping options are available for your location.
          </AlertDescription>
        </Alert>
      ) : (
        <RadioGroup
          value={selectedMethod}
          onValueChange={setSelectedMethod}
          className="space-y-4"
        >
          {shippingOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
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
      )}

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1" 
          disabled={isLoading || !selectedMethod || shippingOptions.length === 0}
        >
          {isLoading ? "Processing..." : "Continue to Payment"}
        </Button>
      </div>
    </form>
  );
}