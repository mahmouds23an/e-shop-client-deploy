import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const NotFound404 = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      dir="rtl"
    >
      <div className="bg-white shadow-md rounded-lg p-8 w-full sm:max-w-md">
        <Title text1="404" text2="الصفحة غير موجودة" />
        <p className="text-lg text-gray-700 mt-4">
          عذرًا، الصفحة التي تبحث عنها غير موجودة.
        </p>
        <p className="text-lg text-gray-700 mt-2">
          يمكنك العودة إلى الصفحة الرئيسية.
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleHomeRedirect}
            className="bg-blue-600 text-white rounded-full py-2 hover:bg-blue-500 transition"
          >
            العودة إلى الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
