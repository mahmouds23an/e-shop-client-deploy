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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg  w-full sm:max-w-md">
        <Title text1="Access" text2="Denied" />
        <p className="text-lg text-gray-700 ">
          You do not have permission to view this page.
        </p>
        <p className="text-lg text-gray-700 mt-2">
          Please log in to access this content.
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleLoginRedirect}
            className="bg-blue-600 text-white rounded-full py-2 hover:bg-blue-500 transition"
          >
            Log In
          </button>
          <button
            onClick={handleHomeRedirect}
            className="bg-gray-600 text-white rounded-full py-2 hover:bg-gray-500 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
