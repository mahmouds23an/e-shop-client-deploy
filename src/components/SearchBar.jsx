import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch } = useContext(ShopContext);
  const location = useLocation();

  if (location.pathname !== "/collection") return null;

  return (
    <div className="border-t border-b bg-white text-center">
      <div
        className="inline-flex items-center justify-center border 
            border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2"
      >
        <input
          type="text"
          placeholder="Search here..."
          className="flex-1 outline-none bg-inherit text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
    </div>
  );
};

export default SearchBar;
