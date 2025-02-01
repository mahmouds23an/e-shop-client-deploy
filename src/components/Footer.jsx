import { Link } from "react-router-dom";
import auraLogoFooter from "/S23an black.png";
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
          <p className="text-xl font-medium mb-5 text-center md:text-left">
            COMPANY
          </p>
          <div className="text-center md:text-left">
            <ul className="flex flex-col gap-1 text-gray-400 text-lg">
              <Link to={"/"}>
                <li className="hover:text-black hover:text-xl hover:font-semibold">
                  Home
                </li>
              </Link>
              <Link to={"/about"}>
                <li className="hover:text-black hover:text-xl hover:font-semibold">
                  About Us
                </li>
              </Link>
              <Link to={"/delivery"}>
                <li className="hover:text-black hover:text-xl hover:font-semibold">
                  Delivery
                </li>
              </Link>
              <Link to={"/privacy-policy"}>
                <li className="hover:text-black hover:text-xl hover:font-semibold">
                  Privacy policy
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 text-center md:text-left">
            GET IN TOUCH
          </p>
          <ul className="flex justify-center md:justify-start text-gray-600 gap-5">
            <Link to={"https://www.facebook.com/profile.php?id=61572517201936"}>
              <li className="flex gap-2 items-center font-bold text-base">
                <SocialIcon
                  network="facebook"
                  style={{ height: 50, width: 50 }}
                />{" "}
              </li>
            </Link>
            <li className="flex gap-2 items-center font-bold text-base">
              <SocialIcon
                network="instagram"
                style={{ height: 50, width: 50 }}
              />{" "}
            </li>
            <a
              href="https://wa.me/201501884857"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="flex gap-2 items-center font-bold text-base">
                <SocialIcon
                  network="whatsapp"
                  style={{ height: 50, width: 50 }}
                />{" "}
              </li>
            </a>
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
