import { SocialIcon } from "react-social-icons";
import FeedBackBox from "../components/FeedBackBox";
import { assets } from "../assets/frontend_assets/assets";
import { Mail, Clock, MapPin } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "دعم البريد الإلكتروني",
      description: "عادة ما يستجيب فريقنا خلال 24 ساعة",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "ساعات العمل",
      description: "من السبت إلى الخميس: 9:00 صباحًا - 9:00 مساءً",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "الموقع",
      description: "نخدم العملاء في مصر بمنتجات قطنية عالية الجودة",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 -mb-28" dir="rtl">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 -mt-10">
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            نحن هنا لمساعدتك! تواصل معنا عبر أي من طرق الاتصال الخاصة بنا.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
          {/* Left Column - Image */}
          <div className="lg:w-1/2">
            <div className="relative group">
              <img
                src={assets.contact_img}
                className="w-full rounded-3xl shadow-2xl transition-transform duration-500 
                group-hover:scale-[1.02] object-cover h-[300px] md:h-[650px]"
                alt="Contact Us"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
              rounded-3xl transition-opacity duration-500 group-hover:opacity-0"
              />
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="lg:w-1/2 space-y-10">
            {/* Welcome Section */}
            <div className="bg-white p-8 border border-gray-400 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">تواصل معنا</h2>
                {/* <img
                  src={auraLogoFooter}
                  className="w-40 h-16 ml-2"
                  alt="Logo"
                /> */}
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                متخصصون في تقديم منتجات قطنية عالية الجودة منذ أكثر من 60 عاما{" "}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                متخصصون في جميع انواع الملابس الداخلية بخامات عالية الجودة
              </p>
              <p className="text-gray-600 leading-relaxed">
                فريق الدعم لدينا جاهز لمساعدتك في أي استفسارات من خلال المنصات
                التالية:
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-400"
                >
                  <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-500">
                    {info.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-gray-400">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                تواصل معنا
              </h3>
              <div className="flex flex-wrap justify-between md:justify-start gap-6">
                <a
                  href="https://www.facebook.com/textilefinefabrics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform duration-300 hover:scale-110"
                >
                  <SocialIcon
                    network="facebook"
                    style={{ height: 50, width: 50 }}
                    className="hover:opacity-80 transition-opacity"
                  />
                </a>
                <a
                  href="https://www.instagram.com/aurastore5673/?igsh=MW1sZnNtb2Iza2txeA%3D%3D#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform duration-300 hover:scale-110"
                >
                  <SocialIcon
                    network="instagram"
                    style={{ height: 50, width: 50 }}
                    className="hover:opacity-80 transition-opacity"
                  />
                </a>
                <a
                  href="https://wa.me/201501884857"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform duration-300 hover:scale-110"
                >
                  <SocialIcon
                    network="whatsapp"
                    style={{ height: 50, width: 50 }}
                    className="hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="max-w-7xl mx-auto">
          <FeedBackBox />
        </div>
      </div>
    </div>
  );
};

export default Contact;
