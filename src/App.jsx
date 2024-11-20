import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound404 from "./components/404NotFound";
import Wishlist from "./pages/Wishlist";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";
import OrderDetails from "./components/OrderDetails";

const App = () => {
  return (
    <div className="px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <ScrollToTop />
      <div className="sticky-navbar">
        <Navbar />
      </div>
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
