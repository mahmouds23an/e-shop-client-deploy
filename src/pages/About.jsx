import { assets } from "../assets/frontend_assets/assets";
import FeedBackBox from "../components/FeedBackBox";
import Title from "../components/Title";
import auraLogoAbout from "../assets/frontend_assets/s23anNavWhite.png";
import { ArrowRight, CheckCircle2, Leaf, HeartHandshake } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 -mb-44 -mt-11">
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
              Your trusted destination for premium cotton products, where
              quality meets comfort in every thread.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="my-16 flex flex-col md:flex-row gap-20 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <img
            src={assets.about_img}
            className="w-full rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hidden md:block object-cover h-[600px]"
            alt="Our Products"
          />
        </div>
        <div className="flex flex-col justify-center md:w-1/2 space-y-8">
          <div className="prose prose-lg">
            <p className="text-gray-700 leading-relaxed mb-6">
              At Elsakaan Store, we believe that comfort and quality go hand in hand. Our
              carefully crafted collection of underwear, socks, towels, and
              textiles is designed to meet the needs of men, women, and children
              alike.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Using only the finest materials—100% cotton or a blend of 95%
              cotton and 5% Lycra—we ensure that every product offers
              unparalleled softness, breathability, and durability.
            </p>
          </div>

          {/* Lycra Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              The Power of Lycra
              <ArrowRight className="ml-2 h-5 w-5 text-blue-500" />
            </h2>
            <p className="text-gray-700 mb-6">
              Lycra, also known as spandex or elastane, is a revolutionary
              synthetic fiber that transforms ordinary garments into
              extraordinary comfort wear.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  title: "Enhanced Comfort",
                  desc: "Perfect elasticity for unrestricted movement",
                },
                {
                  title: "Shape Retention",
                  desc: "Maintains garment form through countless washes",
                },
                {
                  title: "Breathability",
                  desc: "Natural ventilation with cotton blend technology",
                },
                {
                  title: "Durability",
                  desc: "Superior resistance to daily wear and tear",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To set a new standard in the textile industry by offering
              sustainable, high-quality products that prioritize both comfort
              and style. We aim to create a seamless shopping experience where
              customers can trust the quality of every purchase.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Aura */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-12">
          <Title text1="Why" text2="Choose Us" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <CheckCircle2 className="h-8 w-8 text-blue-500" />,
              title: "Quality Assurance",
              description:
                "Premium Egyptian cotton and cotton-blend fabrics ensuring superior comfort and durability.",
            },
            {
              icon: <Leaf className="h-8 w-8 text-green-500" />,
              title: "Sustainability",
              description:
                "Committed to eco-friendly practices and ethical manufacturing processes.",
            },
            {
              icon: <HeartHandshake className="h-8 w-8 text-purple-500" />,
              title: "Exceptional Service",
              description:
                "Dedicated support team always ready to assist with any inquiries.",
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
