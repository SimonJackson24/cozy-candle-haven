import { cartService } from './cart';

export const subscribeToStock = async (productId: string, email: string) => {
  // This would need to be implemented on the Vendure backend
  console.log('Stock notification subscription requested:', { productId, email });
  return true;
};