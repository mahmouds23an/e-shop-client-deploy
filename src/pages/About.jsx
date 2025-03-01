import { assets } from "../assets/frontend_assets/assets";
import FeedBackBox from "../components/FeedBackBox";
import auraLogoAbout from "../assets/frontend_assets/s23anNavWhite.png";
import { CheckCircle2, Leaf, HeartHandshake } from "lucide-react";

const About = () => {
  return (
    <div
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 -mb-44 -mt-11"
      dir="rtl"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="relative mb-8 group">
          <img
            src={assets.about_img}
            alt="About Hero"
            className="w-full h-[400px] object-cover rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 rounded-3xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img
              src={auraLogoAbout}
              alt="Aura Logo"
              className="w-96 mb-6 animate-fade-in"
            />
            <p className="text-white text-xl max-w-2xl mx-auto px-4 leading-relaxed animate-slide-up">
              وجهتك الموثوقة لمنتجات القطن الفاخرة، حيث الجودة تلتقي بالراحة في
              كل خيط.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="my-16 flex flex-col md:flex-row gap-20 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <img
            src={assets.about_img}
            className="w-full rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hidden md:block object-cover h-[400px]"
            alt="Our Products"
          />
        </div>
        <div className="flex flex-col justify-center md:w-1/2 space-y-8">
          <div className="prose prose-lg">
            <p className="text-gray-700 leading-relaxed mb-6">
              في متجر السقعان، نؤمن بأن الراحة والجودة يسيران جنبًا إلى جنب.
              مجموعة منتجاتنا المصممة بعناية من الملابس الداخلية والجوارب
              والمناشف والمنسوجات مصممة لتلبية احتياجات الرجال والنساء والأطفال.
            </p>
            <p className="text-gray-700 leading-relaxed">
              باستخدام أفضل المواد - 100% قطن أو مزيج من 95% قطن و5% ليكرا -
              نضمن أن كل منتج يوفر نعومة ومتانة لا مثيل لهم..
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">مهمتنا</h2>
            <p className="text-gray-700 leading-relaxed">
              نهدف إلى وضع معيار جديد في صناعة النسيج من خلال تقديم منتجات عالية
              الجودة ومستدامة تعطي الأولوية للراحة والأناقة. نهدف إلى توفير
              تجربة تسوق سلسة حيث يمكن للعملاء الوثوق بجودة كل عملية شراء.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Aura */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <CheckCircle2 className="h-8 w-8 text-blue-500" />,
              title: "ضمان الجودة",
              description: "أقمشة قطنية مصرية فاخرة  تضمن راحة ومتانة فائقة.",
            },
            {
              icon: <Leaf className="h-8 w-8 text-green-500" />,
              title: "الاستدامة",
              description:
                "ملتزمون بممارسات صديقة للبيئة وعمليات تصنيع أخلاقية.",
            },
            {
              icon: <HeartHandshake className="h-8 w-8 text-purple-500" />,
              title: "خدمة استثنائية",
              description:
                "فريق دعم مخصص دائمًا على استعداد لمساعدتك في أي استفسارات.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="max-w-7xl mx-auto">
        <FeedBackBox />
      </div>
    </div>
  );
};

export default About;
