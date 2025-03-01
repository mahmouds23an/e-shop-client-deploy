import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useNavigate } from "react-router-dom";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller);
    setBestSellers(bestProduct.slice(0, 20));
  }, [products]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="my-10" dir="rtl">
      {" "}
      {/* Added RTL direction */}
      <div className="text-center py-8 text-3xl">
        <Title text1={"الأكثر"} text2={"مبيعاً"} /> {/* Translated title */}
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          اكتشف العناصر الأكثر شعبية، المختارة من قبل عملاء مثلك
        </p>{" "}
        {/* Translated description */}
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.slice(0, 20).map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            discountedPrice={item.discountedPrice}
            showDiscountBadge={true}
          />
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-black text-white rounded hover:opacity-80 transition duration-200"
        >
          العودة إلى الرئيسية
        </button>{" "}
        {/* Translated button text */}
      </div>
    </div>
  );
};

export default BestSeller;
