import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
  subtotal: number;
  estimatedTax: number;
  total: number;
}

export function CartSummary({ subtotal, estimatedTax, total }: CartSummaryProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>${(subtotal / 100).toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Estimated Tax</span>
        <span>${(estimatedTax / 100).toFixed(2)}</span>
      </div>
      <Separator />
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>${(total / 100).toFixed(2)}</span>
      </div>
    </div>
  );
}