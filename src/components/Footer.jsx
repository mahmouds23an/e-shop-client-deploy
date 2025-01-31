import { Link } from "react-router-dom";
import auraLogoFooter from "../../public/S23an black.png";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="flex flex-col items-center">
          <img src={auraLogoFooter} className="mb-5 w-80" alt="" />
          <div className="flex flex-col">
            <p className="w-full text-gray-600 text-center">
              Experience the softest, most comfortable organic cotton essentials
              for the whole family
            </p>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to={"/"}>
              <li className="hover:text-black">Home</li>
            </Link>
            <Link to={"/about"}>
              <li className="hover:text-black">About Us</li>
            </Link>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <a
              href="https://wa.me/201501884857"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex gap-2 items-center font-bold text-base">
                <SocialIcon
                  network="whatsapp"
                  style={{ height: 25, width: 25 }}
                />{" "}
                WhatsApp: (+20) 150 1884 857
              </li>
            </a>
            <li className="flex gap-2 items-center font-bold text-base">
              <SocialIcon
                network="instagram"
                style={{ height: 25, width: 25 }}
              />{" "}
              Instagram Page
            </li>
            <Link to={"https://www.facebook.com/profile.php?id=61572517201936"}>
              <li className="flex gap-2 items-center font-bold text-base">
                <SocialIcon
                  network="facebook"
                  style={{ height: 25, width: 25 }}
                />{" "}
                Facebook Page
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024© example.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
