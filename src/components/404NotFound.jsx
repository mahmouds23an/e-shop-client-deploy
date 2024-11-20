import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const NotFound404 = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full sm:max-w-md">
        <Title text1="404" text2="Page Not Found" />
        <p className="text-lg text-gray-700 mt-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <p className="text-lg text-gray-700 mt-2">
          You might want to go back to the home page.
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleHomeRedirect}
            className="bg-blue-600 text-white rounded-full py-2 hover:bg-blue-500 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
