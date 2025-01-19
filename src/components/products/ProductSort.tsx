import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductSortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const ProductSort = ({ sortBy, onSortChange }: ProductSortProps) => {
  return (
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};