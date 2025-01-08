/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { brands, categories } from "../../helpers/helperFunctions";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 8;

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    // Apply search query filter
    if (searchQuery) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productCopy);
    setLoading(false); // Stop loading when filtering is done
  };

  const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filterProducts.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  useEffect(() => {
    setLoading(true); // Set loading true when products change
    applyFilter();
  }, [category, subCategory, products, searchQuery]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    if (products.length > 0 && filterProducts.length === 0) {
      setLoading(false); // Stop loading when no products are found
    }
  }, [filterProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex items-center justify-center">
        {/* search bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="border border-gray-400 rounded-md p-2 mt-2 mb-4 w-3/4 sm:w-1/2"
        />
      </div>
      <div className="max-w-7xl mx-auto md:p-4 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <span className="font-medium text-gray-700">Filters</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      showFilter ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              <div
                className={`space-y-4 ${
                  showFilter ? "block" : "hidden"
                } lg:block`}
              >
                {/* Brands Filter */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Brands</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          value={brand}
                          onChange={toggleSubCategory}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories Filter */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center">
                        <input
                          type="checkbox"
                          value={cat}
                          onChange={toggleCategory}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="mb-6">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="block w-full lg:w-48 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm 
              focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Show products or message if no products found */}
              {filterProducts.length === 0 ? (
                <div className="col-span-full text-center py-4 text-lg font-medium text-gray-500">
                  No products found matching your search.
                </div>
              ) : (
                paginateProducts().map((item, index) => (
                  <ProductItem
                    key={index}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item?.price}
                    discountedPrice={item?.discountedPrice}
                    showDiscountBadge={true}
                    showBuyButton={true}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            {filterProducts.length > productsPerPage && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-md bg-white border border-gray-200 text-sm font-medium 
                  text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <div className="flex items-center space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-md bg-white border border-gray-200 text-sm font-medium 
                  text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
