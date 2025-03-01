import { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-hot-toast";

const FeedBackBox = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [feedBack, setFeedBack] = useState("");
  const { backendUrl } = useContext(ShopContext);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(010|011|012|015)\d{8}$/;
    return phoneRegex.test(phone);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(phone)) {
      toast.error("رقم الهاتف غير صحيح.");
      return;
    }
    try {
      const response = await axios.post(backendUrl + "/api/feedback/add", {
        name,
        phone: phone.toString(),
        feedBack,
      });

      if (response.data.success) {
        setName("");
        setPhone("");
        setFeedBack("");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="text-center" dir="rtl">
      <p className="text-2xl font-medium text-gray-800">نقدر ملاحظاتك!</p>
      <p className="text-gray-400 mt-3">يرجى إخبارنا بآرائك واقتراحاتك.</p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex flex-col items-center gap-3 rounded-2xl mx-auto my-6 border border-gray-400 p-4"
      >
        <input
          type="text"
          placeholder="أدخل اسمك (اختياري)"
          className="w-full outline-none border-b border-gray-500 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="أدخل رقم هاتفك"
          className="w-full outline-none border-b border-gray-500 py-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="ملاحظاتك"
          className="w-full outline-none border-b border-gray-500 py-2 resize-none"
          rows={4}
          value={feedBack}
          onChange={(e) => setFeedBack(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-white text-black border border-gray-400 px-2 py-1 rounded-md transition duration-300 
              ease-in-out hover:bg-black hover:text-white focus:outline-none"
          onClick={onSubmitHandler}
        >
          إرسال الملاحظات
        </button>
      </form>
    </div>
  );
};

export default FeedBackBox;
