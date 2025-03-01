import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const UnAuthorized = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      dir="rtl"
    >
      <div className="bg-white shadow-md rounded-lg w-full sm:max-w-md">
        <Title text1="رفض" text2="الوصول" />
        <p className="text-lg text-gray-700">
          ليس لديك إذن للوصول إلى هذه الصفحة.
        </p>
        <p className="text-lg text-gray-700 mt-2">
          يرجى تسجيل الدخول للوصول إلى هذا المحتوى.
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleLoginRedirect}
            className="bg-blue-600 text-white rounded-full py-2 hover:bg-blue-500 transition"
          >
            تسجيل الدخول
          </button>
          <button
            onClick={handleHomeRedirect}
            className="bg-gray-600 text-white rounded-full py-2 hover:bg-gray-500 transition"
          >
            العودة إلى الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
