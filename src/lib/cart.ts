import { ApolloClient, gql } from '@apollo/client';
import { vendureClient } from './vendure';

export interface CartItem {
  id: string;
  quantity: number;
  variant: {
    id: string;
    name: string;
    price: number;
    priceWithTax: number;
  };
}

export const cartService = {
  async createCart() {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation CreateCart {
          createCart {
            id
          }
        }
      `,
    });
    return data.createCart;
  },

  async addItemToCart(cartId: string, variantId: string, quantity: number) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation AddItemToCart($cartId: ID!, $variantId: ID!, $quantity: Int!) {
          addItemToOrder(
            orderLineInput: { productVariantId: $variantId, quantity: $quantity }
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
    return data.addItemToCart;
  },

  async getCart(cartId: string) {
    const { data } = await vendureClient.query({
      query: gql`
        query GetCart($cartId: ID!) {
          order(id: $cartId) {
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
      variables: { cartId },
    });
    return data.order;
  },
};