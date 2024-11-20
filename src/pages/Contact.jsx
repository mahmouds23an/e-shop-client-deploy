import { assets } from "../assets/frontend_assets/assets";
import FeedBackBox from "../components/FeedBackBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"Contact"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            13 elzaheer st, portsaied st, <br /> Mansoura, Dakhalia, Egypt.
          </p>
          <p className="text-gray-500">
            Tel: (050) 2242235 <br /> Mobile: (+20) 1065454551
          </p>
        </div>
      </div>
      <FeedBackBox />
    </div>
  );
};

export default Contact;
