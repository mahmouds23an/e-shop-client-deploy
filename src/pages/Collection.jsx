/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import ProductItem from "../components/ProductItem";
import { brands, categories } from "../../helpers/helperFunctions";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

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
    if (showSearch && search) {
      const searchKeywords = search.toLowerCase().split(" ");
      productCopy = productCopy.filter((item) =>
        searchKeywords.every((keyword) =>
          item.name.toLowerCase().includes(keyword)
        )
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

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <>
      <div className="container mx-auto flex flex-col sm:flex-row gap-6 pt-10 border-t">
        {/* Filter Options */}
        <div className="sm:w-60 w-full">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center md:border-none md:p-0 p-4 rounded-full border border-gray-400 justify-between sm:justify-start text-lg font-semibold cursor-pointer 
            gap-2 text-gray-800 md:mb-4 mb-5 sm:mb-0"
          >
            Filters
            <img
              className={`h-4 sm:hidden transform transition-transform ${
                showFilter ? "rotate-90" : ""
              }`}
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
            />
          </p>

          {/* Sub-Category Filter */}
          <div
            className={`border border-gray-300 rounded-lg p-4 mb-5 transition-all ${
              showFilter ? "block" : "hidden"
            } sm:block`}
          >
            <div className="flex justify-between">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Brands <span className="text-gray-400">({brands.length})</span>
              </p>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Selected{" "}
                <span className="text-gray-400">({subCategory.length})</span>
              </p>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {[
                "Cottonil",
                "Dice",
                "Embarator",
                "Jet",
                "Royal",
                "Cottolight",
                "Elnour",
                "Solo",
                "Lasso",
                "Elaraby",
                "Kalia",
                "Bary",
                "Berlla",
                "Colors",
              ].map((type) => (
                <label
                  className="flex items-center gap-2 text-gray-600"
                  key={type}
                >
                  <input
                    type="checkbox"
                    value={type}
                    onChange={toggleSubCategory}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div
            className={`border border-gray-300 rounded-lg p-4 transition-all ${
              showFilter ? "block" : "hidden"
            } sm:block`}
          >
            <div className="flex justify-between">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Categories{" "}
                <span className="text-gray-400">({categories.length})</span>
              </p>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Selected{" "}
                <span className="text-gray-400">({category.length})</span>
              </p>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {[
                "Men",
                "Women",
                "Bra",
                "Kids",
                "Babies",
                "Socks",
                "Textiles",
                "Towels",
              ].map((category) => (
                <label
                  className="flex items-center gap-2 text-gray-600"
                  key={category}
                >
                  <input
                    type="checkbox"
                    value={category}
                    onChange={toggleCategory}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 mt-4 sm:mt-0 text-gray-700"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          {filterProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 -mb-10">
              {filterProducts.map((item, index) => (
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
              ))}
            </div>
          ) : (
            <div className="text-center my-10">
              <img
                src={assets.no_results_icon}
                alt="No Results"
                className="mx-auto h-40 mb-4"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Collection;
