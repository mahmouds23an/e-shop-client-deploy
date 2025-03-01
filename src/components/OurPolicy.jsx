import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div
      className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700"
      dir="rtl"
    >
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">سياسة التبديل السهلة</p>
        <p className="text-gray-400">
          نقدم سياسة استبدال وإرجاع خالية من المتاعب
        </p>
      </div>
      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">سياسة الإرجاع لمدة 7 أيام</p>
        <p className="text-gray-400">
          نقدم سياسة إرجاع لمدة 7 أيام لمعظم منتجاتنا
        </p>
      </div>
      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">أفضل دعم للعملاء</p>
        <p className="text-gray-400">نقدم دعم لجميع عملائنا على مدار الساعة</p>
      </div>
    </div>
  );
};

export default OurPolicy;
