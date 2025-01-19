export const addToWishlist = (productId: string) => {
  const storedItems = localStorage.getItem("wishlist");
  const items = storedItems ? JSON.parse(storedItems) : [];
  
  if (!items.includes(productId)) {
    items.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(items));
    return true;
  }
  return false;
};

export const removeFromWishlist = (productId: string) => {
  const storedItems = localStorage.getItem("wishlist");
  const items = storedItems ? JSON.parse(storedItems) : [];
  const updatedItems = items.filter((id: string) => id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(updatedItems));
};

export const isInWishlist = (productId: string) => {
  const storedItems = localStorage.getItem("wishlist");
  const items = storedItems ? JSON.parse(storedItems) : [];
  return items.includes(productId);
};