import { SocialIcon } from "react-social-icons";
import FeedBackBox from "../components/FeedBackBox";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { Mail, Clock, MapPin } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Our team typically responds within 24 hours",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      description: "Saturday to Thursday: 9:00 AM - 9:00 PM",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      description: "Serving customers in Egypt with quality cotton essentials",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8 -mb-28">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 -mt-10">
          <Title text1="Contact" text2="Us" />
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re here to help! Reach out to us through any of our
            communication channels.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-16 items-center  mb-20">
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
                <h2 className="text-2xl font-bold text-gray-900">
                  Get in Touch with
                </h2>
                <img src="/AuraNav.png" className="w-24 h-8 ml-2" alt="Logo" />
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are an online store dedicated to providing premium-quality
                cotton essentials for men, women, and kids.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our support team is ready to assist you with any inquiries
                through the following platforms:
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300  border border-gray-400"
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
                Connect With Us
              </h3>
              <div className="flex flex-wrap justify-between md:justify-start gap-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61572517201936"
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
