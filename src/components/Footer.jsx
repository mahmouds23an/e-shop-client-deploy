import { Link } from "react-router-dom";
import auraLogoFooter from "../assets/frontend_assets/s23anLogo.png";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div className="" dir="rtl">
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="flex flex-col items-center">
          <img src={auraLogoFooter} className="mb-5 w-36" alt="" />
          <div className="flex flex-col">
            <p className="w-full text-gray-600 text-center">
              جربوا أفضل الملابس القطنية العضوية الناعمة والمريحة للعائلة
              بأكملها
            </p>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 text-center md:text-right">
            الشركة
          </p>
          <div className="text-center md:text-right">
            <ul className="flex flex-col gap-1 text-gray-400 text-lg">
              <Link to={"/"}>
                <li className="hover:text-black hover:text-xl hover:font-semibold">
                  الرئيسية
                </li>
              </Link>
              <Link to={"/about"}>
                <li className="hover:text-black hover:text-xl hover:font-semibold">
                  من نحن
                </li>
              </Link>
              <Link to={"/delivery"}>
                <li className="hover:text-black hover:text-xl hover:font-semibold">
                  التوصيل
                </li>
              </Link>
              <Link to={"/privacy-policy"}>
                <li className="hover:text-black hover:text-xl hover:font-semibold">
                  سياسة الخصوصية
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 text-center md:text-right">
            تواصل معنا
          </p>
          <ul className="flex justify-center md:justify-start text-gray-600 gap-5">
            <Link to={"https://www.facebook.com/textilefinefabrics"}>
              <li className="flex gap-2 items-center font-bold text-base">
                <SocialIcon
                  network="facebook"
                  style={{ height: 50, width: 50 }}
                />{" "}
              </li>
            </Link>
            <Link
              to={
                "https://www.instagram.com/aurastore5673/?igsh=MW1sZnNtb2Iza2txeA%3D%3D#"
              }
            >
              <li className="flex gap-2 items-center font-bold text-base">
                <SocialIcon
                  network="instagram"
                  style={{ height: 50, width: 50 }}
                />{" "}
              </li>
            </Link>
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
        {/* <p className="py-5 text-sm text-center">
          حقوق النشر 2024© example.com - جميع الحقوق محفوظة.
        </p> */}
      </div>
    </div>
  );
};

export default Footer;
