"use client";

import { useState } from "react";

interface NavbarProps {
  onFilterChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export default function Navbar({ onFilterChange, onSearch }: NavbarProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Tabs */}
      <div className="flex gap-6 font-medium">
        <button className="hover:text-blue-600">All Products</button>
        <button className="hover:text-blue-600">Category</button>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 items-center">
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search..."
          className="border px-3 py-2 rounded-lg"
        />

        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Filter by</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
      </div>
    </nav>
  );
}
