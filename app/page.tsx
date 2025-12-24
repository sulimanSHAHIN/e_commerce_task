"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/categoriesSlice";
import CategoryCard from "./components/CategoryCard";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const dispatch = useDispatch<any>();
  const { list, status } = useSelector((state: any) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFilterChange = (filter: string) => {
    console.log("Filter selected:", filter);
  };

  const handleSearch = (value: string) => {
    console.log("Search value:", value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <Navbar onFilterChange={handleFilterChange} onSearch={handleSearch} />

      {/* PAGE CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 border-l-4 border-amber-500 pl-3">
          Shop by Category
        </h1>

        {/* Loading State */}
        {status === "loading" && (
          <p className="text-blue-600 font-medium">Loading categories...</p>
        )}

        {/* Categories Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {list.map((cat: string) => (
            <div
              key={cat}
              className="bg-white shadow-lg rounded-xl p-6 cursor-pointer 
                         border-l-4 border-blue-600 hover:border-amber-500 
                         hover:shadow-2xl transform hover:-translate-y-1
                         transition-all duration-300"
            >
              <h2 className="text-lg font-semibold capitalize text-gray-800">
                {cat}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
