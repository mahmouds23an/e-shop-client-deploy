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
    <div
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 -mt-11 -mb-44"
      dir="rtl"
    >
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
              معلومات التوصيل
            </h1>
            <div className="flex items-center gap-3 bg-white/90 px-4 py-2 rounded-full">
              <img
                src={egyptPost}
                alt="Egypt Post Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-gray-800 font-semibold">
                التوصيل عن طريق البريد المصري
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          نتعاون مع البريد المصري لتوفير خدمات توصيل موثوقة في جميع أنحاء مصر.
        </p>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          تحقق من رسوم التوصيل للمواقع المختلفة أدناه.
        </p>
      </div>

      {/* Delivery Fees Table - Three Columns */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#003366] py-4 px-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">رسوم التوصيل</h2>
              <p className="text-white/80 text-sm mt-1">
                أسعار التوصيل الرسمية للبريد المصري
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
                        {fee} جنيه
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
          <h3 className="text-lg font-semibold mb-1.5">
            تغطية في جميع أنحاء مصر
          </h3>
          <p className="text-gray-600 text-sm">
            شبكة البريد المصري تغطي كل زاوية في مصر
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
          <h3 className="text-lg font-semibold mb-1.5">تتبع الطلبات</h3>
          <p className="text-gray-600 text-sm">
            تتبع طلبك من خلال موقعنا بالتعاون مع نظام البريد المصري
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
          <h3 className="text-lg font-semibold mb-1.5">خدمة موثوقة</h3>
          <p className="text-gray-600 text-sm">
            خدمة بريد مصر الرسمية مع أكثر من 150 عامًا من الخبرة
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-xl font-bold">هل تحتاج إلى مساعدة؟</h2>
          </div>
          <p className="text-gray-600 text-sm mb-5">
            إذا كان لديك أي أسئلة حول خدمة التوصيل عبر البريد المصري، فريق الدعم
            لدينا جاهز لمساعدتك .
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
                اتصل بالدعم
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
