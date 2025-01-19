import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { medusa } from "@/lib/medusa";
import { CheckoutAddress } from "@/components/checkout/CheckoutAddress";
import { CheckoutShipping } from "@/components/checkout/CheckoutShipping";
import { CheckoutPayment } from "@/components/checkout/CheckoutPayment";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";

type CheckoutStep = "address" | "shipping" | "payment";

const Checkout = () => {
  const [step, setStep] = useState<CheckoutStep>("address");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartData, setCartData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId");
    if (!storedCartId) {
      navigate("/");
      return;
    }
    setCartId(storedCartId);
    fetchCart(storedCartId);
  }, [navigate]);

  const fetchCart = async (id: string) => {
    try {
      const { cart } = await medusa.carts.retrieve(id);
      setCartData(cart);
      console.log("Cart data in checkout:", cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast({
        title: "Error",
        description: "Failed to load cart details",
        variant: "destructive",
      });
    }
  };

  const handleStepComplete = async (nextStep: CheckoutStep | "complete") => {
    try {
      setIsLoading(true);
      if (nextStep === "complete") {
        console.log("Processing order completion");
        toast({
          title: "Order Completed",
          description: "Thank you for your purchase!",
        });
        navigate("/order-confirmation");
        return;
      }
      setStep(nextStep);
    } catch (error) {
      console.error("Error processing step:", error);
      toast({
        title: "Error",
        description: "There was an error processing your request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Display order notes and gift status if present
  const orderNotes = cartData?.context?.order_notes;
  const isGift = cartData?.context?.is_gift;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            <div className={`flex items-center ${step === "address" ? "text-primary" : "text-muted-foreground"}`}>
              <span className="w-8 h-8 rounded-full border flex items-center justify-center mr-2">1</span>
              Address
            </div>
            <div className={`flex items-center ${step === "shipping" ? "text-primary" : "text-muted-foreground"}`}>
              <span className="w-8 h-8 rounded-full border flex items-center justify-center mr-2">2</span>
              Shipping
            </div>
            <div className={`flex items-center ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
              <span className="w-8 h-8 rounded-full border flex items-center justify-center mr-2">3</span>
              Payment
            </div>
          </div>

          <Separator />

          {orderNotes && (
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Order Notes:</h3>
              <p className="text-sm text-muted-foreground">{orderNotes}</p>
            </div>
          )}

          {isGift && (
            <div className="bg-accent/10 p-4 rounded-lg">
              <h3 className="font-medium text-accent">🎁 This order is a gift</h3>
            </div>
          )}

          {/* Step Content */}
          {step === "address" && (
            <CheckoutAddress 
              onComplete={() => handleStepComplete("shipping")}
              isLoading={isLoading}
            />
          )}
          
          {step === "shipping" && (
            <CheckoutShipping
              onComplete={() => handleStepComplete("payment")}
              onBack={() => setStep("address")}
              isLoading={isLoading}
            />
          )}
          
          {step === "payment" && (
            <CheckoutPayment
              onComplete={() => handleStepComplete("complete")}
              onBack={() => setStep("shipping")}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;