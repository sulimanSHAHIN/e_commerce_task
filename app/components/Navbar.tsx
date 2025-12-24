"use client";

import { useState } from "react";

interface NavbarProps {
  onFilterChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export default function Navbar({ onFilterChange, onSearch }: NavbarProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <nav className="w-full bg-[#1e2754]  shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* LEFT SECTION – NAV BUTTONS */}
        <div className="flex gap-6 font-semibold text-white">
          <button className="hover:text-orange-600 transition">
            All Products
          </button>
          <button className="hover:text-orange-600 transition">
            Category
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
                       bg-white shadow-sm cursor-pointer
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
