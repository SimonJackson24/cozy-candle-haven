import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client for Vendure (we'll use it as Medusa replacement)
const client = new ApolloClient({
  uri: import.meta.env.VITE_VENDURE_API_URL || 'http://localhost:3000/shop-api',
  cache: new InMemoryCache(),
});

// Types to match Medusa's interface
export interface LineItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  thumbnail?: string;
  variant: {
    id: string;
    title: string;
  };
}

export interface Order {
  id: string;
  display_id: string;
  status: string;
  items: LineItem[];
  total: number;
  subtotal: number;
  shipping_total: number;
  tax_total: number;
  created_at: string;
  shipping_address?: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    province: string;
    postal_code: string;
    country_code: string;
  };
}

// Medusa-compatible client
export const medusa = {
  carts: {
    create: async () => {
      const { data } = await client.mutate({
        mutation: gql`
          mutation CreateCart {
            createCart {
              id
            }
          }
        `,
      });
      return { cart: data.createCart };
    },

    retrieve: async (cartId: string) => {
      const { data } = await client.query({
        query: gql`
          query GetCart($id: ID!) {
            order(id: $id) {
              id
              total
              lines {
                id
                quantity
                productVariant {
                  id
                  name
                  price
                }
              }
            }
          }
        `,
        variables: { id: cartId },
      });
      
      // Transform Vendure response to match Medusa format
      const cart = {
        ...data.order,
        items: data.order.lines.map((line: any) => ({
          id: line.id,
          title: line.productVariant.name,
          quantity: line.quantity,
          unit_price: line.productVariant.price,
          variant: {
            id: line.productVariant.id,
            title: line.productVariant.name,
          },
        })),
      };
      
      return { cart };
    },

    lineItems: {
      create: async (cartId: string, data: { variant_id: string; quantity: number }) => {
        const response = await client.mutate({
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
                    }
                  }
                }
              }
            }
          `,
          variables: {
            cartId,
            variantId: data.variant_id,
            quantity: data.quantity,
          },
        });
        return { cart: response.data.addItemToOrder };
      },

      update: async (cartId: string, lineId: string, data: { quantity: number }) => {
        const response = await client.mutate({
          mutation: gql`
            mutation UpdateCartItem($lineId: ID!, $quantity: Int!) {
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
                    }
                  }
                }
              }
            }
          `,
          variables: {
            lineId,
            quantity: data.quantity,
          },
        });
        return { cart: response.data.adjustOrderLine };
      },

      delete: async (cartId: string, lineId: string) => {
        const response = await client.mutate({
          mutation: gql`
            mutation RemoveCartItem($lineId: ID!) {
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
                    }
                  }
                }
              }
            }
          `,
          variables: { lineId },
        });
        return { cart: response.data.removeOrderLine };
      },
    },

    complete: async (cartId: string) => {
      const response = await client.mutate({
        mutation: gql`
          mutation TransitionOrderToState($id: ID!) {
            transitionOrderToState(
              id: $id,
              state: "ArrangingPayment"
            ) {
              ... on Order {
                id
                state
              }
            }
          }
        `,
        variables: { id: cartId },
      });
      return response.data.transitionOrderToState;
    },
  },

  customers: {
    retrieve: async () => {
      const { data } = await client.query({
        query: gql`
          query GetCustomer {
            activeCustomer {
              id
              firstName
              lastName
              emailAddress
              phoneNumber
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
            }
          }
        `,
      });
      return { customer: data.activeCustomer };
    },

    update: async (data: any) => {
      const response = await client.mutate({
        mutation: gql`
          mutation UpdateCustomer($input: UpdateCustomerInput!) {
            updateCustomer(input: $input) {
              id
            }
          }
        `,
        variables: { input: data },
      });
      return response.data.updateCustomer;
    },
  },

  orders: {
    retrieve: async (orderId: string) => {
      const { data } = await client.query({
        query: gql`
          query GetOrder($id: ID!) {
            order(id: $id) {
              id
              code
              state
              total
              subTotal
              shipping
              shippingAddress {
                fullName
                streetLine1
                streetLine2
                city
                province
                postalCode
                country
              }
              lines {
                id
                quantity
                productVariant {
                  id
                  name
                  price
                }
              }
            }
          }
        `,
        variables: { id: orderId },
      });

      // Transform to match Medusa format
      const order: Order = {
        id: data.order.id,
        display_id: data.order.code,
        status: data.order.state,
        total: data.order.total,
        subtotal: data.order.subTotal,
        shipping_total: data.order.shipping,
        tax_total: data.order.total - data.order.subTotal - data.order.shipping,
        created_at: new Date().toISOString(), // Vendure doesn't provide this directly
        items: data.order.lines.map((line: any) => ({
          id: line.id,
          title: line.productVariant.name,
          quantity: line.quantity,
          unit_price: line.productVariant.price,
          variant: {
            id: line.productVariant.id,
            title: line.productVariant.name,
          },
        })),
        shipping_address: data.order.shippingAddress ? {
          first_name: data.order.shippingAddress.fullName.split(' ')[0],
          last_name: data.order.shippingAddress.fullName.split(' ').slice(1).join(' '),
          address_1: data.order.shippingAddress.streetLine1,
          address_2: data.order.shippingAddress.streetLine2,
          city: data.order.shippingAddress.city,
          province: data.order.shippingAddress.province,
          postal_code: data.order.shippingAddress.postalCode,
          country_code: data.order.shippingAddress.country,
        } : undefined,
      };

      return { order };
    },
  },
};