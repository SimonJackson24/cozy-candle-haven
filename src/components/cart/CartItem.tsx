import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  title: string;
  variant: {
    id: string;
    title: string;
  };
  quantity: number;
  unit_price: number;
  thumbnail: string;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  isLoading: boolean;
}

export function CartItem({
  id,
  title,
  variant,
  quantity,
  unit_price,
  thumbnail,
  onUpdateQuantity,
  onRemove,
  isLoading,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 border-b border-border pb-4">
      <img
        src={thumbnail || "/placeholder.svg"}
        alt={title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{variant.title}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1 || isLoading}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span>{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">
          ${((unit_price * quantity) / 100).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="mt-2"
          onClick={() => onRemove(id)}
          disabled={isLoading}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}