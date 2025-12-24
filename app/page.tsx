"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/categoriesSlice";
import { fetchProducts, loadMore } from "./redux/productSlice";
import CategoryCard from "./components/CategoryCard";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const dispatch = useDispatch<any>();

  const [activeTab, setActiveTab] = useState("products");

  const { list: categories, status: catStatus } = useSelector((state: any) => state.categories);
  const { all: products, visible, status: prodStatus } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        onFilterChange={() => {}}
        onSearch={() => {}}
        onTabChange={(t) => setActiveTab(t)}  
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {activeTab === "categories" && (
          <>
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Categories</h1>

            {catStatus === "loading" && <p>Loading categories...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat: string) => (
                <CategoryCard key={cat} title={cat} />
              ))}
            </div>
          </>
        )}

        {activeTab === "products" && (
          <>
            <h2 className="text-3xl font-bold text-blue-600 mb-6">All Products</h2>

            {prodStatus === "loading" && <p>Loading products...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, visible).map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {visible < products.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => dispatch(loadMore())}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-lg"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
