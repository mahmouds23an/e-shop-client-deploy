import { SocialIcon } from "react-social-icons";
import FeedBackBox from "../components/FeedBackBox";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div className="-mb-28">
      <div className="text-center text-2xl pt-10 -my-8">
        <Title text1={"Contact"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px] rounded-2xl shadow-xl"
          alt="Contact Us"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl flex items-center text-black">
            Get in Touch with{" "}
            <img src="/S23an blackNav.png" className="w-20 h-7 ml-1" alt="" />
          </p>
          <p className="text-gray-500">
            We are an online store dedicated to providing premium-quality cotton
            essentials for men, women, and kids.
          </p>
          <p className="text-gray-500">
            Our support team is ready to assist you with any inquiries through
            the following platforms:
          </p>
          <ul className="flex justify-center md:justify-start text-gray-600 gap-5 mt-4 w-full -mb-20">
            <a
              href="https://www.facebook.com/profile.php?id=61572517201936"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex gap-2 items-center font-bold text-base">
                <SocialIcon
                  network="facebook"
                  style={{ height: 50, width: 50 }}
                />
              </li>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex gap-2 items-center font-bold text-base">
                <SocialIcon
                  network="instagram"
                  style={{ height: 50, width: 50 }}
                />
              </li>
            </a>
            <a
              href="https://wa.me/201501884857"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex gap-2 items-center font-bold text-base">
                <SocialIcon
                  network="whatsapp"
                  style={{ height: 50, width: 50 }}
                />
              </li>
            </a>
          </ul>
        </div>
      </div>
      <FeedBackBox />
    </div>
  );
};

export default Contact;
