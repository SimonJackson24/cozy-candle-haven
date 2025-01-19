import { ProductCard } from "./ProductCard";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    title: "Lavender Dreams Candle",
    price: 24.99,
    image: "/placeholder.svg",
    description: "Soothing lavender scent for relaxation",
  },
  {
    id: 2,
    title: "Vanilla Bean Melt",
    price: 12.99,
    image: "/placeholder.svg",
    description: "Rich vanilla fragrance for cozy spaces",
  },
  {
    id: 3,
    title: "Ceramic Wax Burner",
    price: 34.99,
    image: "/placeholder.svg",
    description: "Elegant design with ambient lighting",
  },
  {
    id: 4,
    title: "Ocean Breeze Candle",
    price: 22.99,
    image: "/placeholder.svg",
    description: "Fresh marine scent for any room",
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-12 bg-primary/20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};