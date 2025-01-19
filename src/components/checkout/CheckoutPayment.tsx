import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { medusa } from "@/lib/medusa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number cannot exceed 19 digits")
    .regex(/^[0-9\s-]+$/, "Invalid card number format"),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date format (MM/YY)"),
  cvv: z.string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV cannot exceed 4 digits")
    .regex(/^[0-9]+$/, "CVV must contain only numbers"),
  nameOnCard: z.string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface CheckoutPaymentProps {
  onComplete: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export function CheckoutPayment({ onComplete, onBack, isLoading }: CheckoutPaymentProps) {
  const { toast } = useToast();
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
    },
  });

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{0,2})/, "$1/$2")
      .slice(0, 5);
  };

  const onSubmit = async (data: PaymentFormValues) => {
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

      // Complete the cart
      console.log("Completing cart...");
      const response = await medusa.carts.complete(cartId);
      console.log("Cart completion response:", response);

      if (!response.type.includes('order')) {
        throw new Error('Failed to complete order');
      }

      // Clear the cart ID from localStorage
      localStorage.removeItem("cartId");

      toast({
        title: "Success",
        description: "Order has been placed successfully!",
      });

      // Move to order confirmation
      onComplete();
    } catch (error) {
      console.error("Error completing order:", error);
      toast({
        title: "Error",
        description: "Failed to complete order",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-semibold">Payment Information</h2>
        
        <FormField
          control={form.control}
          name="nameOnCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name on Card</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  onChange={(e) => {
                    field.onChange(formatCardNumber(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={(e) => {
                      field.onChange(formatExpiryDate(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    maxLength={4}
                    placeholder="123"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
    </Form>
  );
}