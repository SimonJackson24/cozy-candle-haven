import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cart } from "@/components/Cart";
import { SearchBar } from "@/components/SearchBar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { User } from "lucide-react";

export function Navigation() {
  return (
    <>
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="font-serif text-xl shrink-0">
            Lovable Candles
          </Link>
          <div className="hidden md:block flex-1 max-w-xl">
            <SearchBar />
          </div>
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link to="/products" className="block p-2 hover:bg-accent rounded-md">
                          All Products
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/collections/seasonal" className="block p-2 hover:bg-accent rounded-md">
                          Seasonal Collection
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/collections/bestsellers" className="block p-2 hover:bg-accent rounded-md">
                          Best Sellers
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/collections/new" className="block p-2 hover:bg-accent rounded-md">
                          New Arrivals
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[300px]">
                      <NavigationMenuLink asChild>
                        <Link to="/about" className="block p-2 hover:bg-accent rounded-md">
                          Our Story
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/sustainability" className="block p-2 hover:bg-accent rounded-md">
                          Sustainability
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/contact" className="block p-2 hover:bg-accent rounded-md">
                          Contact Us
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Cart />
          </div>
        </div>
      </nav>
    </>
  );
}