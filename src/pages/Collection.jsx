/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { brands, categories } from "../../helpers/helperFunctions";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import SearchItem from "../components/SearchItem";
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const Collection = () => {
  const { backendUrl, products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [fixedProducts, setFixedProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchResultItems, setSearchResultItems] = useState([]);
  const productsPerPage = 8;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const fetchPaginatedProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/get-paginated-products`,
        {
          params: {
            page: currentPage,
            limit: productsPerPage,
            category: category.join(","),
            subCategory: subCategory.join(","),
            search: searchQuery,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setAllProducts(data.products);
        setFixedProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
      }
    } catch (error) {
      console.error("Error fetching paginated products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaginatedProducts();
  }, [currentPage, category, subCategory]);

  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResultItems([]);
    } else {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResultItems(filteredProducts);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResultItems([]);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (sortType === "low-high") {
      setAllProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sortType === "high-low") {
      setAllProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sortType]);

  const toggleCategory = (value) => {
    setCategory((prev) => {
      const updatedCategory = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      setSearchParams({ page: 1 });
      return updatedCategory;
    });
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) => {
      const updatedSubCategory = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      setSearchParams({ page: 1 });
      return updatedSubCategory;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4" ref={searchContainerRef}>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleChangeSearch}
                onFocus={() => setIsSearchInputFocused(true)}
                placeholder="Search for products..."
                className="w-full h-12 pl-12 pr-12 rounded-md border-2 border-gray-200 focus:border-gray-300 
                focus:outline-none focus:ring-2 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {isSearchInputFocused && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl 
              border border-gray-200 max-h-[70vh] overflow-y-auto"
              >
                {!searchQuery && (
                  <div className="p-4 text-center text-gray-500">
                    Start typing to search products...
                  </div>
                )}
                {searchQuery && !searchResultItems.length && (
                  <div className="p-4 text-center text-gray-500">
                    No products found
                  </div>
                )}
                {searchResultItems.map((product) => (
                  <SearchItem key={product._id} item={product} />
                ))}
                {searchQuery && searchResultItems.length > 0 && (
                  <div className="p-4 text-center bg-gray-50 text-gray-600 font-medium">
                    Found {searchResultItems.length} items
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="lg:hidden w-full mb-6 bg-white rounded-lg px-4 py-3 flex items-center justify-between
          shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <span className="font-medium flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </span>
          <div
            className={`transform transition-transform duration-300 ${
              showFilter ? "rotate-180" : ""
            }`}
          >
            ▼
          </div>
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-1/4 ${showFilter ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
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

              {/* Categories Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Categories
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
            {/* Sort and Total Count */}
            <div className="rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevant">Most Relevant</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allProducts.length === 0 ? (
                  <div className="col-span-full bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="text-gray-500 text-lg font-medium">
                      No products found matching your criteria.
                    </div>
                  </div>
                ) : (
                  allProducts.map((item) => (
                    <ProductItem
                      key={item._id}
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
            )}

            {/* Pagination */}
            {!loading && allProducts.length > 0 && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setSearchParams({ page: Math.max(currentPage - 1, 1) })
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                    border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 
                    disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 transition-all 
                    duration-200 group"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Previous
                  </button>

                  <div className="flex items-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage =
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          Math.abs(pageNum - currentPage) <= 1;

                        // Show dots only between gaps
                        if (!showPage) {
                          if (pageNum === 2 || pageNum === totalPages - 1) {
                            return (
                              <span
                                key={`dots-${pageNum}`}
                                className="px-2 text-gray-400"
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setSearchParams({ page: pageNum })}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium 
                          transition-all duration-200 ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setSearchParams({
                        page: Math.min(currentPage + 1, totalPages),
                      })
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                    border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 
                    disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 transition-all 
                    duration-200 group"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
