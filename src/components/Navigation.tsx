import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cart } from "@/components/Cart";
import { SearchBar } from "@/components/SearchBar";

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="font-serif text-xl shrink-0">
          Lovable Candles
        </Link>
        <div className="hidden md:block flex-1 max-w-xl">
          <SearchBar />
        </div>
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