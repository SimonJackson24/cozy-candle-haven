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
    <section className="py-24 bg-gradient-to-b from-white to-primary/10">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-accent inline-block font-medium tracking-wider text-sm uppercase">
            Our Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">Featured Products</h2>
          <p className="text-gray-600 leading-relaxed">
            Discover our most loved candles and melts, handcrafted with premium ingredients
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};