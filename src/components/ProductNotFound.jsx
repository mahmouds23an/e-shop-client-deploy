import { useNavigate } from "react-router-dom";

const ProductNotFound = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-600">Product Not Found</h1>
        <p className="mt-4 text-lg text-gray-700">
          We&apos;re sorry, but the product you are looking for does not exist.
        </p>
        <p className="mt-2 text-gray-500">
          You might want to check another product or return to the home page.
        </p>
        <button
          onClick={handleHomeRedirect}
          className="mt-6 bg-blue-600 text-white rounded-full py-2 px-6 hover:bg-blue-500 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ProductNotFound;
