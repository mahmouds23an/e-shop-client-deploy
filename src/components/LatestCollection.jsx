import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sortedProducts = products
      .sort((a, b) => new Date(b?.date) - new Date(a?.date))
      .slice(0, 10);

    setLatestProducts(sortedProducts);
  }, [products]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading || latestProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-16 w-16 
        border-t-2 border-b-2 border-black"
        ></div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-800">
          Shop the latest collection and discover your next favorite items
          <span className="text-gray-400 hover:underline hover:cursor-pointer hover:text-black ml-2 duration-200">
            show more
          </span>
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            discountedPrice={item?.discountedPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
