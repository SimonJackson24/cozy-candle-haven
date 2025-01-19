import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface CartOptionsProps {
  orderNotes: string;
  isGift: boolean;
  onNotesChange: (notes: string) => void;
  onGiftChange: (isGift: boolean) => void;
}

export function CartOptions({
  orderNotes,
  isGift,
  onNotesChange,
  onGiftChange,
}: CartOptionsProps) {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Add any notes about your order..."
        value={orderNotes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="w-full"
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="gift"
          checked={isGift}
          onCheckedChange={(checked) => onGiftChange(checked as boolean)}
        />
        <label
          htmlFor="gift"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          This is a gift
        </label>
      </div>
    </div>
  );
}