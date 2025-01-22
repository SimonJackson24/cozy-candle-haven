import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Initialize Apollo Client for Saleor
export const saleorClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Update this to match your Vendure GraphQL endpoint
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

export const getProducts = async () => {
  console.log("Fetching products from Saleor...");
  try {
    const { data } = await saleorClient.query({
      query: gql`
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
      `,
    });
    console.log("Products fetched:", data.products);
    return data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  console.log("Fetching product details for:", id);
  try {
    const { data } = await saleorClient.query({
      query: gql`
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
      `,
      variables: { id },
    });
    console.log("Product details:", data.product);
    return data.product;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
