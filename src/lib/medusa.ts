import Medusa from "@medusajs/medusa-js";

// Initialize the Medusa client
export const medusa = new Medusa({
  baseUrl: "http://localhost:9000", // Your Medusa server URL
  maxRetries: 3,
});

// Utility functions for common operations
export const getProducts = async () => {
  try {
    console.log("Fetching products from Medusa...");
    const { products } = await medusa.products.list();
    console.log("Products fetched:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    console.log("Fetching product details for:", id);
    const { product } = await medusa.products.retrieve(id);
    console.log("Product details:", product);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};