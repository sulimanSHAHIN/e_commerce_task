"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts } from "../../redux/categoryProductSlice";
import ProductCard from "../../components/ProductCard";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;

  const dispatch = useDispatch<any>();
  const { list, status } = useSelector((state: any) => state.categoryProducts);

  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryProducts(category));
    }
  }, [category, dispatch]);

  if (!category) return <p className="p-6">No category selected</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 capitalize">{category}</h1>

      {status === "loading" && <p>Loading products...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {list.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
