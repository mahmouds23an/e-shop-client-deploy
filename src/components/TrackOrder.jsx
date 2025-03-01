import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-hot-toast";
import { Truck, Package, CheckCircle, Clock } from "lucide-react";
import axios from "axios";

const TrackOrder = () => {
  const { orderId } = useParams();
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/order/${orderId}`, {
          headers: { token: localStorage.getItem("token") || token },
        });
        if (response.data.success) {
          setOrder(response.data.order);
        } else {
          toast.error(response.data.message);
        }
      } catch {
        toast.error("فشل في جلب تفاصيل الطلب");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId, backendUrl, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">الطلب غير موجود</h2>
        <Link to="/orders" className="text-blue-600 hover:underline">
          العودة إلى الطلبات
        </Link>
      </div>
    );
  }

  const getStatusStep = (status) => {
    switch (status) {
      case "Order placed":
        return 1;
      case "Packing":
        return 2;
      case "Out for delivery":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = getStatusStep(order.status);

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="w-full">
        <div className="bg-white rounded-md overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-400 px-4 py-4 sm:px-6 flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              تتبع الطلب:{" "}
              <span className="text-gray-500">{order._id.slice(-5)}</span>
            </h1>
          </div>

          {/* Tracking Status */}
          <div className="px-4 py-6 sm:px-6">
            <div className="relative">
              {/* Progress Bar */}
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center 
                  ${
                    currentStep === 4 ? "bg-green-500" : "bg-orange-500"
                  } transition-all duration-500`}
                ></div>
              </div>

              {/* Status Icons */}
              <div className="flex justify-between">
                <div
                  className={`flex flex-col items-center ${
                    (currentStep >= 1 ? "text-orange-500" : "text-gray-400",
                    currentStep !== 4 && currentStep >= 1
                      ? "text-orange-500"
                      : "text-gray-400")
                  }`}
                >
                  <Clock className="h-8 w-8 mb-2" />
                  <span className="text-xs font-medium">تم الطلب</span>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    (currentStep >= 2 ? "text-orange-500" : "text-gray-400",
                    currentStep !== 4 && currentStep >= 2
                      ? "text-orange-500"
                      : "text-gray-400")
                  }`}
                >
                  <Package className="h-8 w-8 mb-2" />
                  <span className="text-xs font-medium">التغليف</span>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    (currentStep >= 3 ? "text-orange-500" : "text-gray-400",
                    currentStep !== 4 && currentStep >= 3
                      ? "text-orange-500"
                      : "text-gray-400")
                  }`}
                >
                  <Truck className="h-8 w-8 mb-2" />
                  <span className="text-xs font-medium">في الطريق</span>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    currentStep >= 4 ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  <CheckCircle className="h-8 w-8 mb-2" />
                  <span className="text-xs font-medium">تم التوصيل</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="border-t border-gray-400 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-black">
                  عنوان التوصيل
                </dt>
                <dd className="mt-1 text-sm text-gray-600">
                  {order.address.street}, {order.address.city}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-black">تاريخ الطلب</dt>
                <dd className="mt-1 text-sm text-gray-600">
                  {new Date(order.date).toDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-black">
                  المبلغ الإجمالي
                </dt>
                <dd className="mt-1 text-sm text-gray-600">
                  {order.amount} {currency}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-black">طريقة الدفع</dt>
                <dd className="mt-1 text-sm text-gray-600">
                  {order.paymentMethod === "COD"
                    ? "الدفع عند الاستلام"
                    : order.paymentMethod}
                </dd>
              </div>
            </dl>
          </div>

          {/* Items */}
          <div className="">
            <div className="px-4 py-5 sm:px-6 border rounded-md border-gray-400">
              <h3 className="text-lg font-bold text-gray-900">عناصر الطلب</h3>

              <div className="mt-4 space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b border-gray-400 last:border-0"
                  >
                    <div className="flex items-center">
                      <Link to={`/product/${item._id}`}>
                        <div>
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            className="w-16 h-16 object-cover"
                          />
                        </div>
                      </Link>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          الحجم: {item.size}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {item.quantity} ×{" "}
                        {item.discountStatus
                          ? item.discountedPrice
                          : item.price}{" "}
                        {currency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back to Orders Button */}
        <div className="mt-6 text-center">
          <Link
            to="/orders"
            className="inline-flex items-center px-4 py-2 border border-transparent 
            text-sm font-medium rounded-md shadow-sm text-white bg-black 
            hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            العودة إلى الطلبات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
