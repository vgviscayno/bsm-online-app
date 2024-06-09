import { CartItem } from "@/components/add-to-cart/form";

export default function CartContent() {
  // get local storage cart items
  const cartItems: CartItem[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("cartItems") || "[]")
      : [];

  if (cartItems.length === 0) {
    // return empty cart message
    return (
      <div>
        <p>Your cart is currently empty.</p>
      </div>
    );
  }

  return (
    <div>
      {cartItems.map((item) => (
        <CartRow key={item.id} item={item} />
      ))}
    </div>
  );
}

function CartRow({ item }: { item: CartItem }) {
  return (
    <div className="flex">
      <div>{item.product.name}</div>
      <div>{item.quantity}</div>
      <div>{item.product.price}</div>
    </div>
  );
}
