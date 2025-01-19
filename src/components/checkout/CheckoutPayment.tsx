import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CheckoutPaymentProps {
  onComplete: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export function CheckoutPayment({ onComplete, onBack, isLoading }: CheckoutPaymentProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (Object.values(formData).some(value => !value)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Here we'll process the payment via Medusa's API
    onComplete();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Payment Information</h2>
      
      <div className="space-y-2">
        <Label htmlFor="nameOnCard">Name on Card</Label>
        <Input
          id="nameOnCard"
          name="nameOnCard"
          value={formData.nameOnCard}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          required
          maxLength={19}
          placeholder="1234 5678 9012 3456"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            placeholder="MM/YY"
            maxLength={5}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
            maxLength={4}
            type="password"
          />
        </div>
      </div>

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
          {isLoading ? "Processing..." : "Complete Order"}
        </Button>
      </div>
    </form>
  );
}