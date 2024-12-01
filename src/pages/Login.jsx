/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          firstName,
          lastName,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </>
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="bg-black text-white font-light px-8 py-2 mb-1 w-full">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Login" ? (
          <p className="text-xs text-gray-400">
            Do not have an account?{" "}
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer text-xs text-gray-400 p-1 rounded hover:bg-black hover:text-white duration-200"
            >
              Register
            </span>
          </p>
        ) : (
          <p className="text-xs text-gray-400">
            Have an account?{" "}
            <span
              className="cursor-pointer text-xs text-gray-400 p-1 rounded hover:bg-black hover:text-white duration-200"
              onClick={() => setCurrentState("Login")}
            >
              Login
            </span>
          </p>
        )}
        {currentState === "Login" ? (
          <p className="cursor-pointer text-xs text-gray-400 hover:text-black duration-200">
            Forgot Password
          </p>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

export default Login;
