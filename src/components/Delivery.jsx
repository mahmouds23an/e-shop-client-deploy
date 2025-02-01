import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="relative mb-6">
          <img
            src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            alt="Delivery Hero"
            className="w-full h-[250px] object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Delivery Information
            </h1>
          </div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We provide reliable delivery services across Egypt. Check our delivery
          fees for different locations below.
        </p>
      </div>

      {/* Delivery Fees Table - Three Columns */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] py-4 px-5">
            <h2 className="text-xl font-bold text-white">Delivery Fees</h2>
            <p className="text-white/80 text-sm mt-1">
              Find the delivery fee for your location
            </p>
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
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#25D366]/10 text-[#128C7E] text-sm font-medium">
                          {city.charAt(0)}
                        </span>
                        <span className="text-sm text-gray-800">{city}</span>
                      </div>
                      <span className="inline-flex items-center px-3 py-0.5 text-sm rounded-full bg-[#25D366]/10 text-[#128C7E] font-medium">
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
          <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
            <img
              src="https://img.icons8.com/ios/50/000000/delivery--v1.png"
              alt="Fast Delivery"
              className="w-6 h-6"
            />
          </div>
          <h3 className="text-lg font-semibold mb-1.5">Fast Delivery</h3>
          <p className="text-gray-600 text-sm">
            Quick and reliable delivery to your doorstep
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md text-center border border-gray-300">
          <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
            <img
              src="https://img.icons8.com/ios/50/000000/track-order.png"
              alt="Track Order"
              className="w-6 h-6"
            />
          </div>
          <h3 className="text-lg font-semibold mb-1.5">Real-time Tracking</h3>
          <p className="text-gray-600 text-sm">
            Track your package at every step of delivery
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md text-center border border-gray-300">
          <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
            <img
              src="https://img.icons8.com/ios/50/000000/support.png"
              alt="Support"
              className="w-6 h-6"
            />
          </div>
          <h3 className="text-lg font-semibold mb-1.5">24/7 Support</h3>
          <p className="text-gray-600 text-sm">
            Our customer service team is always here to help
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-2xl mx-auto mt-12 text-center -mb-28">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-3">Need Help?</h2>
          <p className="text-gray-600 text-sm mb-5">
            If you have any questions about our delivery service, our support
            team is ready to assist you 24/7.
          </p>
          <a
            href="https://wa.me/201501884857"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button
              className="bg-gradient-to-r from-[#25D366] to-[#128C7E] 
              text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 
              transition-opacity duration-200 flex items-center gap-2 text-sm"
            >
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
  );
};

export default Delivery;
