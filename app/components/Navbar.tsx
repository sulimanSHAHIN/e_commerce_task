"use client";

import { useState } from "react";

interface NavbarProps {
  onFilterChange: (
    option: string,
    min?: number,
    max?: number,
    minRating?: number
  ) => void;
  onSearch: (value: string) => void;
  onTabChange: (tab: string) => void;
  minPrice?: number;
  maxPrice?: number;
}

export default function Navbar({
  onFilterChange,
  onSearch,
  onTabChange,
  minPrice = 0,
  maxPrice = 1000,
}: NavbarProps) {
  const [activeTab, setActiveTab] = useState("products");
  const [filterOption, setFilterOption] = useState("none");
  const [searchValue, setSearchValue] = useState("");

  const [priceMin, setPriceMin] = useState(minPrice);
  const [priceMax, setPriceMax] = useState(maxPrice);

  const [minRating, setMinRating] = useState(1);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);

    if (tab === "categories") {
      setFilterOption("none");
      setSearchValue("");
      onSearch("");
      onFilterChange("none");
    }
  };

  const resetPriceRange = () => {
    setPriceMin(minPrice);
    setPriceMax(maxPrice);
  };

  return (
    <nav className="w-full bg-[#1e2754] shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between text-white">
        
        {/* Tabs */}
        <div className="flex gap-4 font-semibold">
          <button
            onClick={() => handleTabClick("products")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "products"
                ? "bg-amber-500 text-[#1e2754]"
                : "hover:bg-amber-400"
            }`}
          >
            All Products
          </button>

          <button
            onClick={() => handleTabClick("categories")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "categories"
                ? "bg-amber-500 text-[#1e2754]"
                : "hover:bg-amber-400"
            }`}
          >
            Categories
          </button>
        </div>

        {/* Filters */}
        {activeTab === "products" && (
          <div className="flex gap-4 items-center">
            {/* Search */}
            <input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Search products..."
              className="px-4 py-2 border placeholder-white border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-orange-600 shadow-sm transition w-56"
            />

            {/* Main Filter Selector */}
            <select
              value={filterOption}
              onChange={(e) => {
                const val = e.target.value;
                setFilterOption(val);

                if (val === "none") {
                  resetPriceRange();
                  onFilterChange("none");
                }

                if (val === "price") {
                  onFilterChange("price", priceMin, priceMax);
                }

                if (val === "rating-sort") {
                  onFilterChange("rating-sort");
                }

                if (val === "price-sort") {
                  onFilterChange("price-sort");
                }

                if (val === "title-sort") {
                  onFilterChange("title-sort");
                }

                if (val === "min-rating") {
                  onFilterChange("min-rating", undefined, undefined, minRating);
                }
              }}
              className="px-3 py-2 rounded-lg border border-gray-300 
                         bg-white text-black shadow-sm cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            >
              <option value="none">No Filter</option>
              <option value="price">Price (Range)</option>
              <option value="rating-sort">Rating (High → Low)</option>
              <option value="price-sort">Price (Low → High)</option>
              <option value="title-sort">Title (A → Z)</option>
              <option value="min-rating">Minimum Rating</option>
            </select>

            {/* Price Range UI */}
            {filterOption === "price" && (
              <div className="flex flex-col w-64 text-black">
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <span>${priceMin}</span>
                  <span>${priceMax}</span>
                </div>

                <div className="relative h-6">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceMin}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val <= priceMax) {
                        setPriceMin(val);
                        onFilterChange("price", val, priceMax);
                      }
                    }}
                    className="w-full z-10"
                  />

                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceMax}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= priceMin) {
                        setPriceMax(val);
                        onFilterChange("price", priceMin, val);
                      }
                    }}
                    className="w-full z-0"
                  />
                </div>
              </div>
            )}

            {/* Minimum Rating Dropdown */}
            {filterOption === "min-rating" && (
              <select
                value={minRating}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMinRating(val);
                  onFilterChange("min-rating", undefined, undefined, val);
                }}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-black shadow-sm"
              >
                <option value={1}>1 ⭐+</option>
                <option value={2}>2 ⭐+</option>
                <option value={3}>3 ⭐+</option>
                <option value={4}>4 ⭐+</option>
              </select>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
