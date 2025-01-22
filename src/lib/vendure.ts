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
  featuredAsset?: {
    preview: string;
  };
  variants: Array<{
    id: string;
    name: string;
    price: number;
    priceWithTax: number;
  }>;
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
    return data.products.items.map((product: VendureProduct) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      thumbnail: {
        url: product.featuredAsset?.preview || '/placeholder.svg'
      },
      pricing: {
        priceRange: {
          start: {
            gross: {
              amount: product.variants[0]?.priceWithTax || 0
            }
          }
        }
      },
      variants: product.variants.map(variant => ({
        id: variant.id,
        name: variant.name,
        pricing: {
          price: {
            gross: {
              amount: variant.priceWithTax
            }
          }
        }
      }))
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
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
    
    const product = data.product;
    console.log("Product details:", product);
    
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      thumbnail: {
        url: product.featuredAsset?.preview || '/placeholder.svg'
      },
      pricing: {
        priceRange: {
          start: {
            gross: {
              amount: product.variants[0]?.priceWithTax || 0
            }
          }
        }
      },
      variants: product.variants.map((variant: any) => ({
        id: variant.id,
        name: variant.name,
        pricing: {
          price: {
            gross: {
              amount: variant.priceWithTax
            }
          }
        }
      }))
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};