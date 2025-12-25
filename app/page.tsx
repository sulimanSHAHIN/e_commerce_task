"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/categoriesSlice";
import { fetchProductsByCategory, fetchAllProducts } from "./redux/productSlice";
import CategoryCard from "./components/CategoryCard";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import { RootState } from "./redux/store";

export default function HomePage() {
  const dispatch = useDispatch<any>();
  const { list: categories, status: catStatus } = useSelector((state: RootState) => state.categories);
  const { list: products, status: prodStatus } = useSelector((state: RootState) => state.products);
  const cart = useSelector((state: RootState) => state.cart.items);

  const [activeTab, setActiveTab] = useState<"all" | "categories" | "cart">("all");
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
    if (activeTab === "all") {
      dispatch(fetchAllProducts());
      setSelectedCategory(null);
      setPage(1);
    }
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (activeTab === "categories" && selectedCategory) {
      dispatch(fetchProductsByCategory(selectedCategory));
      setPage(1);
    }
  }, [selectedCategory, activeTab, dispatch]);

  const handleTabChange = (tab: "all" | "categories" | "cart") => {
    setActiveTab(tab);

    setFilterOption("none");
    setSearchQuery("");
    setPriceRange([0, 1000]);
    setMinRating(1);

    if (tab !== "categories") setSelectedCategory(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveTab("categories");
    setPage(1);
  };

  const filteredProducts = products
    .filter((p: any) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((p: any) => (filterOption === "price" ? p.price >= priceRange[0] && p.price <= priceRange[1] : true))
    .filter((p: any) => (filterOption === "min-rating" ? p.rating.rate >= minRating : true))
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
          if (option === "price" && min !== undefined && max !== undefined) setPriceRange([min, max]);
          if (option === "min-rating" && minRatingValue !== undefined) setMinRating(minRatingValue);
        }}
        onSearch={(v) => setSearchQuery(v)}
        onTabChange={handleTabChange}
        minPrice={0}
        maxPrice={1000}
      />

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

      {activeTab === "cart" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-contain"/>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p>${item.price} × {item.quantity}</p>
                      <p className="text-gray-500">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="text-right mt-4 font-bold text-xl">
                Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
