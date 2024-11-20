import { assets } from "../assets/frontend_assets/assets";
import FeedBackBox from "../components/FeedBackBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam alias
            voluptates, in soluta veniam sequi corporis? Voluptate fugiat
            consequatur autem est molestiae sunt velit voluptatibus alias nulla
            repudiandae. Sit, molestias?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Necessitatibus magnam iusto perferendis rem assumenda minus,
            voluptatum omnis maiores illo impedit natus ratione error fuga atque
            earum iure quibusdam odio numquam.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
            magni accusamus modi non ipsam qui autem at dicta ullam, quas
            ducimus, corporis eos eveniet unde commodi facere nisi atque maxime?
          </p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            facilis eaque eveniet est dignissimos ducimus, voluptatibus pariatur
            consequuntur esse numquam excepturi doloribus ea molestias eius quos
            velit laudantium totam omnis!
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            facilis eaque eveniet est dignissimos ducimus, voluptatibus pariatur
            consequuntur esse numquam excepturi doloribus ea molestias eius quos
            velit laudantium totam omnis!
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            facilis eaque eveniet est dignissimos ducimus, voluptatibus pariatur
            consequuntur esse numquam excepturi doloribus ea molestias eius quos
            velit laudantium totam omnis!
          </p>
        </div>
      </div>
      <FeedBackBox />
    </div>
  );
};

export default About;
