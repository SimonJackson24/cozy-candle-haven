import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Initialize Apollo Client for Vendure
export const vendureClient = new ApolloClient({
  uri: import.meta.env.VITE_VENDURE_API_URL || 'http://localhost:3000/shop-api',
  cache: new InMemoryCache(),
});

// Cart operations
export const cartService = {
  async create() {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation CreateCart {
          createCart {
            id
            total
            lines {
              id
              quantity
              productVariant {
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
    return { cart: data.createCart };
  },

  async retrieve(cartId: string) {
    const { data } = await vendureClient.query({
      query: gql`
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            total
            lines {
              id
              quantity
              productVariant {
                id
                name
                price
                priceWithTax
                product {
                  id
                  name
                  featuredAsset {
                    preview
                  }
                }
              }
            }
          }
        }
      `,
      variables: { cartId },
    });
    return { cart: data.cart };
  },

  async addItem(cartId: string, variantId: string, quantity: number) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation AddItemToCart($cartId: ID!, $variantId: ID!, $quantity: Int!) {
          addItemToOrder(
            productVariantId: $variantId,
            quantity: $quantity
          ) {
            ... on Order {
              id
              total
              lines {
                id
                quantity
                productVariant {
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
      variables: { cartId, variantId, quantity },
    });
    return { cart: data.addItemToOrder };
  },

  async updateItem(cartId: string, lineId: string, quantity: number) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation AdjustOrderLine($lineId: ID!, $quantity: Int!) {
          adjustOrderLine(
            orderLineId: $lineId,
            quantity: $quantity
          ) {
            ... on Order {
              id
              total
              lines {
                id
                quantity
                productVariant {
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
      variables: { lineId, quantity },
    });
    return { cart: data.adjustOrderLine };
  },

  async removeItem(cartId: string, lineId: string) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation RemoveOrderLine($lineId: ID!) {
          removeOrderLine(
            orderLineId: $lineId
          ) {
            ... on Order {
              id
              total
              lines {
                id
                quantity
                productVariant {
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
      variables: { lineId },
    });
    return { cart: data.removeOrderLine };
  }
};

// Customer operations
export const customerService = {
  async retrieve() {
    const { data } = await vendureClient.query({
      query: gql`
        query GetCustomer {
          activeCustomer {
            id
            firstName
            lastName
            emailAddress
            addresses {
              id
              fullName
              streetLine1
              streetLine2
              city
              province
              postalCode
              country
            }
            orders {
              id
              code
              state
              total
              createdAt
              lines {
                id
                quantity
                productVariant {
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
    return { customer: data.activeCustomer };
  },

  async update(input: any) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation UpdateCustomer($input: UpdateCustomerInput!) {
          updateCustomer(input: $input) {
            id
            firstName
            lastName
            emailAddress
          }
        }
      `,
      variables: { input },
    });
    return { customer: data.updateCustomer };
  },

  async createAddress(input: any) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation CreateCustomerAddress($input: CreateAddressInput!) {
          createCustomerAddress(input: $input) {
            id
            fullName
            streetLine1
            streetLine2
            city
            province
            postalCode
            country
          }
        }
      `,
      variables: { input },
    });
    return { address: data.createCustomerAddress };
  },

  async deleteAddress(id: string) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation DeleteCustomerAddress($id: ID!) {
          deleteCustomerAddress(id: $id) {
            success
          }
        }
      `,
      variables: { id },
    });
    return { success: data.deleteCustomerAddress.success };
  }
};

// Order operations
export const orderService = {
  async retrieve(id: string) {
    const { data } = await vendureClient.query({
      query: gql`
        query GetOrder($id: ID!) {
          order(id: $id) {
            id
            code
            state
            total
            createdAt
            lines {
              id
              quantity
              productVariant {
                id
                name
                price
                priceWithTax
              }
            }
            shippingAddress {
              fullName
              streetLine1
              streetLine2
              city
              province
              postalCode
              country
            }
          }
        }
      `,
      variables: { id },
    });
    return { order: data.order };
  },

  async cancel(id: string) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation CancelOrder($id: ID!) {
          cancelOrder(id: $id) {
            id
            state
          }
        }
      `,
      variables: { id },
    });
    return { order: data.cancelOrder };
  }
};

// Product operations
export const productService = {
  async list() {
    const { data } = await vendureClient.query({
      query: gql`
        query GetProducts {
          products {
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
    return { products: data.products.items };
  },

  async retrieve(id: string) {
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
    return { product: data.product };
  }
};

// Shipping operations
export const shippingService = {
  async getEligibleMethods(cartId: string) {
    const { data } = await vendureClient.query({
      query: gql`
        query GetEligibleShippingMethods($cartId: ID!) {
          eligibleShippingMethods(cartId: $cartId) {
            id
            name
            description
            price
            priceWithTax
          }
        }
      `,
      variables: { cartId },
    });
    return { shipping_options: data.eligibleShippingMethods };
  },

  async setMethod(cartId: string, methodId: string) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation SetShippingMethod($cartId: ID!, $methodId: ID!) {
          setOrderShippingMethod(shippingMethodId: $methodId) {
            ... on Order {
              id
              shipping {
                method {
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
      variables: { cartId, methodId },
    });
    return { cart: data.setOrderShippingMethod };
  }
};

// Types
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

export interface VendureCart {
  id: string;
  total: number;
  lines: Array<{
    id: string;
    quantity: number;
    productVariant: {
      id: string;
      name: string;
      price: number;
      priceWithTax: number;
      product?: {
        id: string;
        name: string;
        featuredAsset?: {
          preview: string;
        };
      };
    };
  }>;
}

export interface VendureCustomer {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  addresses: Array<{
    id: string;
    fullName: string;
    streetLine1: string;
    streetLine2?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  }>;
}

export interface VendureOrder {
  id: string;
  code: string;
  state: string;
  total: number;
  createdAt: string;
  lines: Array<{
    id: string;
    quantity: number;
    productVariant: {
      id: string;
      name: string;
      price: number;
      priceWithTax: number;
    };
  }>;
  shippingAddress?: {
    fullName: string;
    streetLine1: string;
    streetLine2?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
}