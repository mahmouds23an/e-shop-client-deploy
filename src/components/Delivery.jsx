import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import egyptPost from "../assets/frontend_assets/nav-logo.svg";

const Delivery = () => {
  const { deliveryFees } = useContext(ShopContext);

  // Split deliveryFees into three arrays
  const entries = Object.entries(deliveryFees);
  const chunkSize = Math.ceil(entries.length / 3);
  const columns = [
    entries.slice(0, chunkSize),
    entries.slice(chunkSize, chunkSize * 2),
    entries.slice(chunkSize * 2),
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 -mt-11 -mb-44">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="relative mb-6">
          <img
            src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            alt="Delivery Hero"
            className="w-full h-[250px] object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-2xl" />
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Delivery Information
            </h1>
            <div className="flex items-center gap-3 bg-white/90 px-4 py-2 rounded-full">
              <img
                src={egyptPost}
                alt="Egypt Post Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-gray-800 font-semibold">
                Delivered by Egypt Post (البريد المصري)
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We partner with Egypt Post (البريد المصري) to provide reliable
          delivery services across Egypt. Check our delivery fees for different
          locations below.
        </p>
      </div>

      {/* Delivery Fees Table - Three Columns */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#003366] py-4 px-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Delivery Fees</h2>
              <p className="text-white/80 text-sm mt-1">
                Egypt Post Official Delivery Rates
              </p>
            </div>
            <img
              src={egyptPost}
              alt="Egypt Post Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="p-4">
                <div className="space-y-3">
                  {column.map(([city, fee]) => (
                    <div
                      key={city}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#003366]/10 text-[#003366] text-sm font-medium">
                          {city.charAt(0)}
                        </span>
                        <span className="text-sm text-gray-800">{city}</span>
                      </div>
                      <span className="inline-flex items-center px-3 py-0.5 text-sm rounded-full bg-[#003366]/10 text-[#003366] font-medium">
                        {fee} EGP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="bg-white p-5 rounded-xl shadow-md text-center border border-gray-300">
          <div className="w-12 h-12 mx-auto mb-3 bg-[#003366]/10 rounded-full flex items-center justify-center">
            <img
              src="https://img.icons8.com/ios/50/003366/delivery--v1.png"
              alt="Nationwide Coverage"
              className="w-6 h-6"
            />
          </div>
          <h3 className="text-lg font-semibold mb-1.5">Nationwide Coverage</h3>
          <p className="text-gray-600 text-sm">
            Egypt Post&apos;s extensive network reaches every corner of Egypt
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md text-center border border-gray-300">
          <div className="w-12 h-12 mx-auto mb-3 bg-[#003366]/10 rounded-full flex items-center justify-center">
            <img
              src="https://img.icons8.com/ios/50/003366/track-order.png"
              alt="Track Order"
              className="w-6 h-6"
            />
          </div>
          <h3 className="text-lg font-semibold mb-1.5">Official Tracking</h3>
          <p className="text-gray-600 text-sm">
            Track your package through Egypt Post&apos;s official system
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md text-center border border-gray-300">
          <div className="w-12 h-12 mx-auto mb-3 bg-[#003366]/10 rounded-full flex items-center justify-center">
            <img
              src="https://img.icons8.com/ios/50/003366/guarantee.png"
              alt="Reliable"
              className="w-6 h-6"
            />
          </div>
          <h3 className="text-lg font-semibold mb-1.5">Trusted Service</h3>
          <p className="text-gray-600 text-sm">
            Egypt&apos;s official postal service with over 150 years of
            experience
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-xl font-bold">Need Help?</h2>
          </div>
          <p className="text-gray-600 text-sm mb-5">
            If you have any questions about our delivery service through Egypt
            Post, our support team is ready to assist you 24/7.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/201501884857"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="bg-[#003366] text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 text-sm">
                <img
                  src="https://img.icons8.com/material-rounded/24/ffffff/whatsapp.png"
                  alt="WhatsApp"
                  className="w-5 h-5"
                />
                Contact Support
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
