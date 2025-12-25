"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart, removeFromCart, clearCart } from "../redux/cartSlice";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity === 0) {
      dispatch(removeFromCart(id));
    } else {
      const item = cartItems.find((i) => i.id === id);
      if (item) {
        dispatch(addToCart({ ...item, quantity }));
      }
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
        <button
          onClick={() => router.push("/")}
          className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
        >
          Go to Products
        </button>
      </div>
    );

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain rounded"
            />
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-amber-500 font-bold">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <label>Qty:</label>
              <select
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, Number(e.target.value))
                }
                className="border rounded px-2 py-1"
              >
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">Total:</h2>
          <p className="text-xl font-bold text-amber-500">${totalPrice.toFixed(2)}</p>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert("Checkout functionality not implemented yet")}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
