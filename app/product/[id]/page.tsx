"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const dispatch = useDispatch<any>();

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6 text-center text-gray-500">Loading product...</p>;
  if (!product) return <p className="p-6 text-center text-red-500">Product not found</p>;

  const fullStars = Math.floor(product.rating.rate);
  const halfStar = product.rating.rate - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        })
      );
      alert(`${product.title} added to cart!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-800 transition font-semibold"
      >
        &larr; Back to Products
      </button>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="flex justify-center md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md h-auto object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          <p className="text-2xl text-amber-500 font-bold">${product.price}</p>

          <p className="text-gray-700">{product.description}</p>

          <p className="text-gray-500 capitalize">
            Category: <span className="font-semibold text-gray-800">{product.category}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            {Array(fullStars)
              .fill(0)
              .map((_, i) => (
                <span key={`full-${i}`} className="text-yellow-400 text-lg">&#9733;</span>
              ))}
            {halfStar && <span className="text-yellow-400 text-lg">&#9734;</span>}
            {Array(emptyStars)
              .fill(0)
              .map((_, i) => (
                <span key={`empty-${i}`} className="text-gray-300 text-lg">&#9733;</span>
              ))}
            <span className="text-gray-600 ml-2 font-semibold">
              {product.rating.rate.toFixed(1)}/5 ({product.rating.count} reviews)
            </span>
          </div>

          {/* Quantity selector */}
          <div className="mt-4 flex items-center gap-4">
            <label className="font-semibold">Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
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
            onClick={handleAddToCart}
            className="mt-4 bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
