import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const SummerCollection = () => {
  const { products } = useContext(ShopContext);
  const [summerCollection, setSummerCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sortedProducts = products.filter(
      (item) => item.clothesCollection === "Summer"
    );

    setSummerCollection(sortedProducts.slice(0, 5));
  }, [products]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading || summerCollection.length === 0) {
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
    <div className="my-10" dir="rtl">
      <div className="text-center py-8 text-3xl">
        <Title text1={"مجموعة"} text2={"الصيف"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-800">
          أسرع واختار من أحدث مجموعة صيفية لدينا
          <Link to="/collection/summer">
            <span className="text-gray-400 hover:underline hover:cursor-pointer hover:text-black mr-2 duration-200">
              عرض المزيد
            </span>
          </Link>
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
        {summerCollection.map((item, index) => (
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

export default SummerCollection;
