"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";

export default function WishlistPage() {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch<any>();

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (item: any) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    );
    alert(`${item.title} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Your Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-4">
          <div className="w-48 h-48 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-6xl text-amber-400">💔</span>
          </div>
          <p className="text-gray-500 text-xl text-center max-w-sm">
            Your wishlist is empty. Start adding your favorite products to see them here!
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <img src={item.image} alt={item.title} className="w-40 h-40 object-contain mb-4"/>

              <h2 className="font-semibold text-gray-800 line-clamp-2">{item.title}</h2>
              <p className="text-amber-500 font-bold text-lg mt-1">${item.price}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                >
                  Remove
                </button>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
