import { Truck, Clock, Shield, Leaf } from "lucide-react";

export const USPBanner = () => {
  return (
    <div className="w-full bg-primary/5 border-b">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-2 text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2 px-4">
            <Truck className="w-4 h-4" />
            <span>Free Shipping Over $50</span>
          </div>
          <div className="flex items-center justify-center gap-2 px-4">
            <Clock className="w-4 h-4" />
            <span>30-Day Returns</span>
          </div>
          <div className="flex items-center justify-center gap-2 px-4">
            <Shield className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center justify-center gap-2 px-4">
            <Leaf className="w-4 h-4" />
            <span>100% Natural Ingredients</span>
          </div>
        </div>
      </div>
    </div>
  );
};