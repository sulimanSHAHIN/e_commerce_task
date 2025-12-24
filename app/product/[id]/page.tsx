"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id; 

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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

          <p className="text-gray-500 capitalize">Category: <span className="font-semibold text-gray-800">{product.category}</span></p>

          <button
            className="mt-4 bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
