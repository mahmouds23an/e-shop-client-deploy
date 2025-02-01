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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound404 from "./components/404NotFound";
import Wishlist from "./pages/Wishlist";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";
import OrderDetails from "./components/OrderDetails";
import TrackOrder from "./components/TrackOrder";
import { Toaster } from "react-hot-toast";
import NewArrival from "./pages/NewArrival";
import BestProducts from "./pages/BestProducts";
import Delivery from "./components/Delivery";
import PrivacyPolicy from "./components/PrivacyPolicy";

const App = () => {
  return (
    <div className="px-4 sm:px[5vw] md:px-[7vw] lg:px-[4vw]">
      <ToastContainer
        position="top-center"
        autoClose={3000}
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
        <Route path="/track-order/:orderId" element={<TrackOrder />} />
        <Route path="/new-arrivals" element={<NewArrival />} />
        <Route path="/best-products" element={<BestProducts />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
