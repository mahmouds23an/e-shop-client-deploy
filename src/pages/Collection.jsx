/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { brands, categories } from "../../helpers/helperFunctions";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Collection = () => {
  const { backendUrl } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 8;

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  // Fetch paginated products from the backend
  const fetchPaginatedProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/get-paginated-products`,
        {
          params: {
            page: currentPage,
            limit: productsPerPage,
            category: category.join(","), // Send categories as a comma-separated string
            subCategory: subCategory.join(","), // Send subcategories as a comma-separated string
            search: searchQuery, // Send search query
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setAllProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
      }
    } catch (error) {
      console.error("Error fetching paginated products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when page, filters, or search query changes
  useEffect(() => {
    fetchPaginatedProducts();
  }, [currentPage, category, subCategory, searchQuery]);

  // Handle sorting of products
  useEffect(() => {
    if (sortType === "low-high") {
      setAllProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sortType === "high-low") {
      setAllProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sortType]);

  // Toggle category filter
  const toggleCategory = (value) => {
    setCategory((prev) => {
      const updatedCategory = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      // Reset to page 1 when filter is changed
      setSearchParams({ page: 1 });
      return updatedCategory;
    });
  };

  // Toggle subcategory filter
  const toggleSubCategory = (value) => {
    setSubCategory((prev) => {
      const updatedSubCategory = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      // Reset to page 1 when filter is changed
      setSearchParams({ page: 1 });
      return updatedSubCategory;
    });
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Search Bar */}
      <div className="w-full bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="max-w-[90%] mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full md:w-2/3 lg:w-1/2 mx-auto block border border-gray-300 
            rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            aria-label="Search products"
          />
        </div>
      </div>

      <div className="max-w-full mx-auto py-1">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="lg:hidden w-full mb-4 bg-white border border-gray-300 rounded-lg 
          px-4 py-2 flex items-center justify-between"
        >
          <span className="font-medium">Filters</span>
          <svg
            className={`w-5 h-5 transition-transform ${
              showFilter ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-1/4 ${showFilter ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-400">
              {/* Brands Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Brands
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {brands.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={subCategory.includes(item)}
                        onChange={() => toggleSubCategory(item)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-blue-600 transition-colors">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategories Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Subcategories
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={category.includes(item)}
                        onChange={() => toggleCategory(item)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-blue-600 transition-colors">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none 
                focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevant">Most Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.length === 0 ? (
                <div className="col-span-full bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="text-gray-500 text-lg font-medium">
                    No products found matching your search.
                  </div>
                </div>
              ) : (
                allProducts.map((item, index) => (
                  <ProductItem
                    key={index}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                    showDiscountBadge={true}
                    showBuyButton={true}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-8 bg-white rounded-lg shadow-sm p-4">
              <button
                onClick={() =>
                  setSearchParams({ page: Math.max(currentPage - 1, 1) })
                }
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 
                disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Previous
              </button>
              <span className="px-6 py-2 font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setSearchParams({
                    page: Math.min(currentPage + 1, totalPages),
                  })
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 
                disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;