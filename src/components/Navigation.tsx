import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cart } from "@/components/Cart";

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl">
          Lovable Candles
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/products">
            <Button variant="ghost">Products</Button>
          </Link>
          <Cart />
        </div>
      </div>
    </nav>
  );
}