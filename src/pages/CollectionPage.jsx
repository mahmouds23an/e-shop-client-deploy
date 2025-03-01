/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const CollectionPage = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const endpoint = `${backendUrl}/api/product/${type}-collection`;
        const response = await axios.get(endpoint);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="my-10" dir="rtl">
      <div className="text-center py-8 text-3xl">
        {/* Translated Title to Arabic */}
        <Title
          text2={type.toUpperCase() === "SUMMER" ? "الصيفية" : "الشتوية"}
          text1={"المجموعة"}
        />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          اكتشف أحدث مجموعة {type === "summer" ? "صيفية" : "شتوية"} وابحث عن
          أسلوبك المثالي.
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
        {products.length > 0 ? (
          products.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              discountedPrice={item.discountedPrice}
            />
          ))
        ) : (
          <p className="text-center w-full">لا توجد منتجات متاحة.</p>
        )}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-black text-white rounded hover:opacity-80 transition duration-200"
        >
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
    </div>
  );
};

export default CollectionPage;
