/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ShopContext } from "../src/context/ShopContext";

const CitySelect = ({ value, onChange, setDeliveryFee }) => {
  const { deliveryFees } = useContext(ShopContext);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    onChange(e);
    setDeliveryFee(deliveryFees[selectedCity]);
  };

  return (
    <select
      className="border border-gray-400 rounded-lg py-1.5 px-3.5 w-full"
      name="city"
      value={value}
      onChange={handleCityChange}
      required
    >
      <option value="" disabled>
        Select your city
      </option>
      {Object.keys(deliveryFees).map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};

export default CitySelect;
