import { CartItem } from "@/components/add-to-cart/form";

export function isProductInCart(cartItems: CartItem[], productId: string) {
  for (let index = 0; index < cartItems.length; index++) {
    const item = cartItems[index];
    if (item.product.id === productId) {
      return true;
    }
  }
  return false;
}
