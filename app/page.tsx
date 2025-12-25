"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/categoriesSlice";
import { fetchProductsByCategory, fetchAllProducts } from "./redux/productSlice";
import CategoryCard from "./components/CategoryCard";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const dispatch = useDispatch<any>();
  const { list: categories, status: catStatus } = useSelector((state: any) => state.categories);
  const { list: products, status: prodStatus } = useSelector((state: any) => state.products);

  const [activeTab, setActiveTab] = useState<"all" | "categories">("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("none");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
    setSelectedCategory(null);
    if (activeTab === "all") dispatch(fetchAllProducts());
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    const newTab = tab === "categories" ? "categories" : "all";
    setActiveTab(newTab);

    if (newTab === "categories") {
      setFilterOption("none");
      setSearchQuery("");
      setPriceRange([0, 1000]);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    dispatch(fetchProductsByCategory(category));
  };

  // =============================
  // FILTER SYSTEM
  // =============================
  const filteredProducts = products
    // Search
    .filter(
      (p: any) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // Price Range
    .filter((p: any) => {
      if (filterOption === "price") {
        return p.price >= priceRange[0] && p.price <= priceRange[1];
      }
      return true;
    })
    // Minimum Rating
    .filter((p: any) => {
      if (filterOption === "min-rating") {
        return p.rating.rate >= minRating;
      }
      return true;
    })
    // Sorting
    .sort((a: any, b: any) => {
      if (filterOption === "rating-sort") return b.rating.rate - a.rating.rate;
      if (filterOption === "price-sort") return a.price - b.price;
      if (filterOption === "title-sort") return a.title.localeCompare(b.title);
      return 0;
    });

  const paginatedProducts = filteredProducts.slice(0, page * ITEMS_PER_PAGE);

  return (
    <div className="p-6">

      <Navbar
        onFilterChange={(option, min, max, minRatingValue) => {
          setFilterOption(option);

          if (option === "price" && min !== undefined && max !== undefined) {
            setPriceRange([min, max]);
          }

          if (option === "min-rating" && minRatingValue !== undefined) {
            setMinRating(minRatingValue);
          }
        }}
        onSearch={(v) => setSearchQuery(v)}
        onTabChange={handleTabChange}
      />

      {/* All Products */}
      {activeTab === "all" && (
        <div>
          <h2 className="text-xl font-bold mb-4">All Products</h2>

          {prodStatus === "loading" && <p>Loading products...</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {paginatedProducts.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {filteredProducts.length > page * ITEMS_PER_PAGE && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setPage(page + 1)}
                className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}

      {/* Categories */}
      {activeTab === "categories" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Categories</h2>

          {catStatus === "loading" && <p>Loading categories...</p>}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {categories.map((cat: string) => (
              <div key={cat} onClick={() => handleCategoryClick(cat)}>
                <CategoryCard title={cat} />
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Products in "{selectedCategory}"
              </h2>

              {prodStatus === "loading" ? (
                <p>Loading products...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {paginatedProducts.map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
