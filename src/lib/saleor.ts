import { ApolloClient, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client for Saleor
export const saleorClient = new ApolloClient({
  uri: 'YOUR_SALEOR_API_URL', // Replace with your Saleor API URL
  cache: new InMemoryCache(),
});

// Product types
export interface SaleorProduct {
  id: string;
  name: string;
  description: string;
  thumbnail?: {
    url: string;
  };
  pricing: {
    priceRange: {
      start: {
        gross: {
          amount: number;
        };
      };
    };
  };
  variants: Array<{
    id: string;
    name: string;
    pricing: {
      price: {
        gross: {
          amount: number;
        };
      };
    };
  }>;
}

// Fetch products from Saleor
export const getProducts = async () => {
  console.log("Fetching products from Saleor...");
  const { data } = await saleorClient.query({
    query: PRODUCTS_QUERY,
  });
  console.log("Products fetched:", data.products);
  return data.products.edges.map((edge: any) => edge.node);
};

// Get single product
export const getProduct = async (id: string) => {
  console.log("Fetching product details for:", id);
  const { data } = await saleorClient.query({
    query: PRODUCT_QUERY,
    variables: { id },
  });
  console.log("Product details:", data.product);
  return data.product;
};

// GraphQL Queries
const PRODUCTS_QUERY = `
  query Products {
    products(first: 100, channel: "default-channel") {
      edges {
        node {
          id
          name
          description
          thumbnail {
            url
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                }
              }
            }
          }
          variants {
            id
            name
            pricing {
              price {
                gross {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_QUERY = `
  query Product($id: ID!) {
    product(id: $id, channel: "default-channel") {
      id
      name
      description
      thumbnail {
        url
      }
      pricing {
        priceRange {
          start {
            gross {
              amount
            }
          }
        }
      }
      variants {
        id
        name
        pricing {
          price {
            gross {
              amount
            }
          }
        }
      }
    }
  }
`;