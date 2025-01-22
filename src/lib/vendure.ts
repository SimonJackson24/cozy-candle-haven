import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Initialize Apollo Client for Vendure
export const vendureClient = new ApolloClient({
  uri: 'http://localhost:3000/shop-api', // Vendure's GraphQL shop API endpoint
  cache: new InMemoryCache(),
});

// Define types for Vendure responses
export interface VendureProduct {
  id: string;
  name: string;
  description: string;
  collections?: {
    id: string;
    name: string;
    slug: string;
  }[];
  featuredAsset?: {
    preview: string;
  };
  variants: Array<{
    id: string;
    name: string;
    price: number;
    priceWithTax: number;
    prices: Array<{
      amount: number;
      currencyCode: string;
    }>;
    original_price: number;
    calculated_price: number;
  }>;
}

export interface VendureCollection {
  id: string;
  name: string;
  description: string;
  slug: string;
  featuredAsset?: {
    preview: string;
  };
  products: VendureProduct[];
}

// Fetch products from Vendure
export const getProducts = async () => {
  console.log("Fetching products from Vendure...");
  try {
    const { data } = await vendureClient.query({
      query: gql`
        query GetProducts {
          products(options: { take: 100 }) {
            items {
              id
              name
              description
              collections {
                id
                name
                slug
              }
              featuredAsset {
                preview
              }
              variants {
                id
                name
                price
                priceWithTax
              }
            }
          }
        }
      `,
    });
    console.log("Products fetched:", data.products.items);
    return data.products.items;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get collections from Vendure
export const getCollections = async () => {
  console.log("Fetching collections...");
  try {
    const { data } = await vendureClient.query({
      query: gql`
        query GetCollections {
          collections {
            items {
              id
              name
              description
              slug
              featuredAsset {
                preview
              }
              products {
                id
                name
                description
                featuredAsset {
                  preview
                }
                variants {
                  id
                  name
                  price
                  priceWithTax
                }
              }
            }
          }
        }
      `,
    });
    return data.collections.items;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

// Get single collection from Vendure
export const getCollection = async (slug: string) => {
  console.log("Fetching collection:", slug);
  try {
    const { data } = await vendureClient.query({
      query: gql`
        query GetCollection($slug: String!) {
          collection(slug: $slug) {
            id
            name
            description
            slug
            featuredAsset {
              preview
            }
            products {
              id
              name
              description
              featuredAsset {
                preview
              }
              variants {
                id
                name
                price
                priceWithTax
              }
            }
          }
        }
      `,
      variables: { slug },
    });
    return data.collection;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
};

// Get single product from Vendure
export const getProduct = async (id: string) => {
  console.log("Fetching product details for:", id);
  try {
    const { data } = await vendureClient.query({
      query: gql`
        query GetProduct($id: ID!) {
          product(id: $id) {
            id
            name
            description
            featuredAsset {
              preview
            }
            variants {
              id
              name
              price
              priceWithTax
            }
          }
        }
      `,
      variables: { id },
    });
    return data.product;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};