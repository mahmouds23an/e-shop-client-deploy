import { assets } from "../assets/frontend_assets/assets";
import FeedBackBox from "../components/FeedBackBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 -mb-44 -mt-11">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="relative mb-6">
          <img
            src={assets.about_img}
            alt="About Hero"
            className="w-full h-[300px] object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              About Aura
            </h1>
          </div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the story behind Aura—your trusted destination for premium
          cotton products. Our commitment to quality and comfort is woven into
          every thread.
        </p>
      </div>

      {/* Introduction Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px] rounded-xl shadow-md"
          alt="Our Products"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Aura, we believe that comfort and quality go hand in hand. Our
            carefully crafted collection of underwear, socks, towels, and
            textiles is designed to meet the needs of men, women, and children
            alike.
          </p>
          <p>
            Using only the finest materials—100% cotton or a blend of 95% cotton
            and 5% Lycra—we ensure that every product offers unparalleled
            softness, breathability, and durability.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            To set a new standard in the textile industry by offering
            sustainable, high-quality products that prioritize both comfort and
            style. We aim to create a seamless shopping experience where
            customers can trust the quality of every purchase.
          </p>
        </div>
      </div>

      {/* Why Choose Aura */}
      <div className="text-2xl py-4">
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-20">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-5">
          <b className="text-lg">Quality Assurance</b>
          <p className="text-gray-600">
            Our products are crafted from the highest quality cotton and
            cotton-blend fabrics, ensuring superior comfort and durability.
            Experience the difference of natural, breathable materials.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-5">
          <b className="text-lg">Sustainability</b>
          <p className="text-gray-600">
            We are committed to eco-friendly practices, using sustainable
            materials and ethical manufacturing processes that reduce
            environmental impact.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-5">
          <b className="text-lg">Exceptional Customer Service</b>
          <p className="text-gray-600">
            Your satisfaction is our top priority. Our dedicated support team is
            always here to assist you with any inquiries or concerns.
          </p>
        </div>
      </div>

      {/* Feedback Section */}
      <FeedBackBox />
    </div>
  );
};

export default About;
