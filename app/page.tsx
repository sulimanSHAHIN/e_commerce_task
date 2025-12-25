"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/categoriesSlice";
import { fetchProductsByCategory, fetchAllProducts } from "./redux/productSlice";
import CategoryCard from "./components/CategoryCard";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import { RootState } from "./redux/store";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const dispatch = useDispatch<any>();
    const router = useRouter();
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
    <div className="px-0">
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
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">All Products</h2>
    {prodStatus === "loading" && <p>Loading products...</p>}

    {paginatedProducts.length === 0 ? (
      <div className="min-h-[40vh] flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow">
        <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-5xl">😕</span>
        </div>
        <p className="text-gray-500 text-center mb-2">
          No products found matching your search or filter.
        </p>
        <p className="text-gray-400 text-center text-sm">
          Try changing the search term or removing filters.
        </p>
      </div>
    ) : (
      <>
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
      </>
    )}
  </div>
)}

      {activeTab === "categories" && (
        <div className="p-6">
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
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="w-48 h-48 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-6xl animate-bounce">🛒</span>
        </div>
        <p className="text-gray-500 text-xl text-center max-w-xs">
          Your cart is currently empty. Browse products and add your favorites here!
        </p>
      </div>
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
      <button
        onClick={() => router.push("/wishlist")}
        className="
          fixed bottom-6 right-6
          bg-red-500 text-white
          w-14 h-14
          rounded-full shadow-xl
          flex items-center justify-center
          hover:bg-red-600 transition
          z-50
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-7 h-7"
        >
          <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                   4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                   14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                   6.86-8.65 11.54l-1.45 1.31z" />
        </svg>
      </button>
      </div>
  );
}
