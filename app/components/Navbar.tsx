"use client";

import { useState } from "react";

interface NavbarProps {
  onFilterChange: (value: string) => void;
  onSearch: (value: string) => void;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ onFilterChange, onSearch, onTabChange }: NavbarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("products"); 

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);     
    onTabChange(tab);      
  };

  return (
    <nav className="w-full bg-[#1e2754] shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between text-white">

        <div className="flex gap-4 font-semibold">
          <button
            onClick={() => handleTabClick("products")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "products" ? "bg-amber-500 text-[#1e2754]" : "hover:bg-amber-400"
            }`}
          >
            All Products
          </button>

          <button
            onClick={() => handleTabClick("categories")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "categories" ? "bg-amber-500 text-[#1e2754]" : "hover:bg-amber-400"
            }`}
          >
            Categories
          </button>
        </div>

        <div className="flex gap-4 items-center">

          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Search products..."
            className="px-4 py-2 border placeholder-white border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 
                       focus:ring-orange-600 shadow-sm transition w-56"
          />

          <select
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 
                       bg-white text-black shadow-sm cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-amber-500 
                       transition"
          >
            <option value="">Filter by</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
