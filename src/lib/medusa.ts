import Medusa from "@medusajs/medusa-js";

// Initialize the Medusa client
export const medusa = new Medusa({
  baseUrl: "http://localhost:9000", // Your Medusa server URL
  maxRetries: 3,
});

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

export const createCart = async () => {
  try {
    console.log("Creating new cart...");
    const { cart } = await medusa.carts.create();
    console.log("Cart created:", cart);
    return cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

export const addToCart = async (cartId: string, variantId: string, quantity: number) => {
  try {
    console.log("Adding item to cart...", { cartId, variantId, quantity });
    const { cart } = await medusa.carts.lineItems.create(cartId, {
      variant_id: variantId,
      quantity: quantity,
    });
    console.log("Item added to cart:", cart);
    return cart;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const getCollections = async () => {
  try {
    console.log("Fetching collections from Medusa...");
    const { collections } = await medusa.collections.list();
    console.log("Collections fetched:", collections);
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

export const getCollection = async (id: string) => {
  try {
    console.log("Fetching collection details for:", id);
    const { collection } = await medusa.collections.retrieve(id);
    console.log("Collection details:", collection);
    return collection;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
};
