import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductFiltersProps {
  priceRange: string;
  setPriceRange: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
}

export const ProductFilters = ({
  priceRange,
  setPriceRange,
  category,
  setCategory,
}: ProductFiltersProps) => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Filters</SheetTitle>
        <SheetDescription>Refine your product search</SheetDescription>
      </SheetHeader>
      <div className="py-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under50">Under $50</SelectItem>
              <SelectItem value="50to100">$50 - $100</SelectItem>
              <SelectItem value="over100">Over $100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="candles">Candles</SelectItem>
              <SelectItem value="melts">Melts</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </SheetContent>
  );
};