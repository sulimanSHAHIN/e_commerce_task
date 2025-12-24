"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { id, title, price, category, image, rating } = product;

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  // Generate stars
  const fullStars = Math.floor(rating.rate);
  const halfStar = rating.rate - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain p-4 bg-gray-50"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{title}</h3>
        <p className="text-blue-600 font-bold">${price.toFixed(2)}</p>
        <p className="text-gray-500 capitalize text-sm">{category}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array(fullStars)
            .fill(0)
            .map((_, i) => (
              <span key={`full-${i}`} className="text-yellow-400">&#9733;</span>
            ))}
          {halfStar && <span className="text-yellow-400">&#9734;</span>}
          {Array(emptyStars)
            .fill(0)
            .map((_, i) => (
              <span key={`empty-${i}`} className="text-gray-300">&#9733;</span>
            ))}
          <span className="text-gray-600 text-sm ml-2">{rating.rate.toFixed(1)}/5</span>
        </div>
        <p className="text-gray-400 text-xs">{rating.count} reviews</p>
      </div>
    </div>
  );
}
