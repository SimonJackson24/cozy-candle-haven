import Medusa from "@medusajs/medusa-js";
import type { 
  Product, 
  ProductCollection,
  StorePostCartsReq,
  Cart,
  Order,
  Customer,
  Region
} from "@medusajs/medusa";

// Initialize the Medusa client
export const medusa = new Medusa({
  baseUrl: import.meta.env.VITE_MEDUSA_API_URL || "http://localhost:9000",
  maxRetries: 3,
});

// Products
export const getProducts = async () => {
  console.log("Fetching products from Medusa...");
  const { products } = await medusa.products.list();
  console.log("Products fetched:", products);
  return products;
};

export const getProduct = async (productId: string) => {
  console.log("Fetching product details:", productId);
  const { product } = await medusa.products.retrieve(productId);
  console.log("Product details fetched:", product);
  return product;
};

// Collections
export const getCollections = async (): Promise<ProductCollection[]> => {
  console.log("Fetching collections...");
  const { collections } = await medusa.collections.list();
  console.log("Collections fetched:", collections);
  return collections;
};

export const getCollection = async (handle: string) => {
  console.log("Fetching collection by handle:", handle);
  const { collection } = await medusa.collections.retrieve(handle);
  console.log("Collection fetched:", collection);
  return collection;
};

// Cart
export const createCart = async (data?: StorePostCartsReq): Promise<Cart> => {
  console.log("Creating new cart with data:", data);
  const { cart } = await medusa.carts.create(data);
  console.log("Cart created:", cart);
  return cart;
};

// Orders
export const getOrder = async (orderId: string): Promise<Order> => {
  console.log("Fetching order details:", orderId);
  const { order } = await medusa.orders.retrieve(orderId);
  console.log("Order details fetched:", order);
  return order;
};

// Customer
export const getCustomer = async (): Promise<Customer> => {
  console.log("Fetching customer profile...");
  const { customer } = await medusa.customers.retrieve();
  console.log("Customer profile fetched:", customer);
  return customer;
};

// Regions
export const getRegions = async (): Promise<Region[]> => {
  console.log("Fetching regions...");
  const { regions } = await medusa.regions.list();
  console.log("Regions fetched:", regions);
  return regions;
};

// Types
export type MedusaProduct = Product;
export type MedusaCollection = ProductCollection;
export type MedusaCart = Cart;
export type MedusaOrder = Order;
export type MedusaCustomer = Customer;