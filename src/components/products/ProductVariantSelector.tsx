import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductVariantSelectorProps {
  variants: Array<{
    id: string;
    title: string;
    prices: Array<{
      amount: number;
    }>;
  }>;
  selectedVariant: string;
  onVariantChange: (value: string) => void;
}

export const ProductVariantSelector = ({
  variants,
  selectedVariant,
  onVariantChange,
}: ProductVariantSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Variant</label>
      <Select value={selectedVariant} onValueChange={onVariantChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a variant" />
        </SelectTrigger>
        <SelectContent>
          {variants.map((variant) => (
            <SelectItem key={variant.id} value={variant.id}>
              {variant.title} - ${(variant.prices[0].amount / 100).toFixed(2)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};