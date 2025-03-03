import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getProducts, type VendureProduct } from "@/lib/vendure";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductSort } from "@/components/products/ProductSort";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState("all");
  const [category, setCategory] = useState("all");
  const itemsPerPage = 12;

  const { data: products, isLoading, error } = useQuery<VendureProduct[]>({
    queryKey: ["products", sortBy, searchQuery],
    queryFn: getProducts,
  });

  console.log("Search query:", searchQuery);
  console.log("Products loaded:", products?.length);

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = searchQuery
      ? product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = category === "all" || product.collections?.some(c => c.slug === category);
    const price = product.variants?.[0]?.priceWithTax || 0;
    const matchesPrice = priceRange === "all" ||
      (priceRange === "under50" && price < 5000) ||
      (priceRange === "50to100" && price >= 5000 && price <= 10000) ||
      (priceRange === "over100" && price > 10000);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

  if (error) {
    console.error("Error loading products:", error);
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-serif">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Our Products"}
            </h1>
            <p className="text-muted-foreground">
              {searchQuery
                ? `Showing results for "${searchQuery}"`
                : "Discover our collection of handcrafted luxury candles"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Filter in results..."
                value={searchQuery}
                readOnly
                className="w-full bg-muted"
              />
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <ProductFilters
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  category={category}
                  setCategory={setCategory}
                />
              </Sheet>
            </div>
          </div>

          <ProductGrid products={paginatedProducts} isLoading={isLoading} />

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;