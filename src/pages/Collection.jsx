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

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end === totalPages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // First page
    if (start > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => setSearchParams({ page: 1 })}
          className="w-8 h-8 flex items-center justify-center rounded text-sm font-medium 
          text-gray-700 hover:bg-gray-100 transition-all duration-200"
        >
          1
        </button>
      );
      if (start > 2) {
        pages.push(
          <span key="dots-1" className="px-1 text-gray-400">
            ...
          </span>
        );
      }
    }

    // Visible pages
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setSearchParams({ page: i })}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium 
          transition-all duration-200 ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(
          <span key="dots-2" className="px-1 text-gray-400">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => setSearchParams({ page: totalPages })}
          className="w-8 h-8 flex items-center justify-center rounded text-sm font-medium 
          text-gray-700 hover:bg-gray-100 transition-all duration-200"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="sticky top-0 z-20 bg-white">
        <div
          className="max-w-7xl mx-auto md:px-4 px-1 py-4"
          ref={searchContainerRef}
        >
          <div className="relative">
            <div className="relative -mb-7 md:mb-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleChangeSearch}
                onFocus={() => setIsSearchInputFocused(true)}
                placeholder="ابحث عن منتجات..."
                className="w-full h-12 pr-12 pl-12 rounded-md border-2 border-gray-200 focus:border-gray-300 
                focus:outline-none focus:ring-2 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                    ابدأ بالكتابة للبحث عن المنتجات...
                  </div>
                )}
                {searchQuery && !searchResultItems.length && (
                  <div className="p-4 text-center text-gray-500">
                    لم يتم العثور على منتجات
                  </div>
                )}
                {searchResultItems.map((product) => (
                  <SearchItem key={product._id} item={product} />
                ))}
                {searchQuery && searchResultItems.length > 0 && (
                  <div className="p-4 text-center bg-gray-50 text-gray-600 font-medium">
                    تم العثور على {searchResultItems.length} منتجات
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
            الفلاتر
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
                  العلامات التجارية
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
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-2"
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
                  الفئات
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
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-2"
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
            <div className="rounded-lg shadow-sm p-1 mb-3 -mt-2">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevant">الأكثر صلة</option>
                    <option value="low-high">السعر: من الأقل إلى الأعلى</option>
                    <option value="high-low">السعر: من الأعلى إلى الأقل</option>
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
                      نعمل على هذا القسم، سيكون هنا قريبًا
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

            {/* Mobile-friendly Pagination */}
            {!loading && allProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-1 bg-white rounded-lg shadow-sm p-1">
                  <button
                    onClick={() =>
                      setSearchParams({ page: Math.max(currentPage - 1, 1) })
                    }
                    disabled={currentPage === 1}
                    className="p-1.5 rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50 
                    disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 border border-gray-300 rounded-full" />
                  </button>

                  <div className="flex items-center">
                    {renderPaginationNumbers()}
                  </div>

                  <button
                    onClick={() =>
                      setSearchParams({
                        page: Math.min(currentPage + 1, totalPages),
                      })
                    }
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50 
                    disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 border border-gray-300 rounded-full" />
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
