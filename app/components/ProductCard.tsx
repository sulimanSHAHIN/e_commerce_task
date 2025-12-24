"use client";

import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="bg-white shadow-md rounded-lg overflow-hidden p-4 hover:shadow-xl transition cursor-pointer"
    >
      <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-3"/>
      <h3 className="font-semibold text-gray-800 line-clamp-2 h-12">{product.title}</h3>
      <p className="text-blue-600 font-bold text-lg">${product.price}</p>
    </div>
  );
}
