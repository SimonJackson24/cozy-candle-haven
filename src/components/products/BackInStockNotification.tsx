import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotifications } from "@/lib/notifications";

interface BackInStockNotificationProps {
  productId: string;
}

export function BackInStockNotification({ productId }: BackInStockNotificationProps) {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { subscribeToBackInStock } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    try {
      await subscribeToBackInStock(productId, email);
      setEmail("");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubscribing}
      >
        Notify When Available
      </Button>
    </form>
  );
}