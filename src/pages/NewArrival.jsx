import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const NewArrival = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/new-collection`
        );
        setNewProducts(response.data.newCollection);
      } catch (error) {
        console.error("Error fetching new products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, [backendUrl]);

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
        <Title text1={"المنتجات الواصلة"} text2={"حديثا"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          تسوق أحدث المجموعات واكتشف العناصر المفضلة لديك والواصلة حديثا
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
        {newProducts.length > 0 ? (
          newProducts.map((item) => (
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
          <p>لا توجد منتجات جديدة متاحة.</p>
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

export default NewArrival;
