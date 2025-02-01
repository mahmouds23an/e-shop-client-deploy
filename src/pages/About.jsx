import { assets } from "../assets/frontend_assets/assets";
import FeedBackBox from "../components/FeedBackBox";
import Title from "../components/Title";
import auraLogoAbout from "/S23an yellow.png";

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
            <img src={auraLogoAbout} alt="" className="w-96" />
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
          className="w-full md:max-w-[450px] rounded-xl shadow-md hidden md:block"
          alt="Our Products"
        />
        <div className="flex flex-col justify-center md:w-2/4 text-gray-600">
          <p className="text-justify">
            At Aura, we believe that comfort and quality go hand in hand. Our
            carefully crafted collection of underwear, socks, towels, and
            textiles is designed to meet the needs of men, women, and children
            alike.
          </p>
          <p className="text-justify mb-2">
            Using only the finest materials—100% cotton or a blend of 95% cotton
            and 5% Lycra—we ensure that every product offers unparalleled
            softness, breathability, and durability.
          </p>

          {/* Lycra Section */}
          <div className="">
            <h2 className="text-xl font-bold text-black">
              You Know Nothing About Lycra
            </h2>
            <p className="text-gray-600 mb-4 text-justify">
              Lycra, also known as spandex or elastane, is a synthetic fiber
              known for its exceptional elasticity. It is commonly blended with
              other fibers like cotton to enhance the stretchability and comfort
              of garments. Here are some key advantages of Lycra:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li className="text-justify">
                <strong>Enhanced Comfort:</strong> The elasticity of Lycra
                allows for greater freedom of movement, making it perfect for
                activewear and everyday clothing.
              </li>
              <li className="text-justify">
                <strong>Shape Retention:</strong> Lycra helps garments maintain
                their shape over time, preventing sagging or stretching out
                after multiple washes.
              </li>
              <li className="text-justify">
                <strong>Breathability:</strong> When blended with natural fibers
                like cotton, Lycra enhances breathability while providing a snug
                fit.
              </li>
              <li className="text-justify">
                <strong>Durability:</strong> Lycra is resistant to wear and
                tear, ensuring that your clothing lasts longer without losing
                its fit.
              </li>
            </ul>
            <p className="text-gray-600 text-justify -mt-4 mb-2">
              Importantly, Lycra is safe for the body. It is designed to be
              non-irritating and hypoallergenic, making it suitable for all skin
              types. You can enjoy the benefits of stretchy, comfortable
              clothing without worrying about harmful effects on your skin.
            </p>
          </div>

          <b className="text-xl font-bold text-black">Our Mission</b>
          <p className="text-justify">
            To set a new standard in the textile industry by offering
            sustainable, high-quality products that prioritize both comfort and
            style. We aim to create a seamless shopping experience where
            customers can trust the quality of every purchase.
          </p>
        </div>
      </div>

      {/* Why Choose Aura */}
      <div className="text-2xl py-4 text-center -mt-4">
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-20">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-5">
          <b className="text-lg">Quality Assurance</b>
          <p className="text-gray-600 text-justify">
            Our products are crafted from the highest quality Egyptian cotton
            and cotton-blend fabrics, ensuring superior comfort and durability.
            Experience the difference of natural, breathable materials.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-5">
          <b className="text-lg">Sustainability</b>
          <p className="text-gray-600 text-justify">
            We are committed to eco-friendly practices, using sustainable
            materials and ethical manufacturing processes that reduce
            environmental impact.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-5">
          <b className="text-lg">Exceptional Customer Service</b>
          <p className="text-gray-600 text-justify">
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
