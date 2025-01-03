/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";
import { Eye, EyeOff, Check, X, Mail, User, Lock } from "lucide-react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasMinLength: false,
  });

  const validatePassword = (value) => {
    setPasswordRequirements({
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasMinLength: value.length >= 8,
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (currentState === "Sign Up") {
      validatePassword(value);
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (currentState === "Sign Up") {
        if (!Object.values(passwordRequirements).every(Boolean)) {
          toast.error("Please meet all password requirements");
          return;
        }
        const response = await axios.post(`${backendUrl}/api/user/register`, {
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
        const response = await axios.post(`${backendUrl}/api/user/login`, {
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
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const RequirementIndicator = ({ met, text }) => (
    <div className="flex items-center gap-2 text-sm py-1">
      {met ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-red-500" />
      )}
      <span className={met ? "text-green-600" : "text-gray-600"}>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 -mb-20 -mt-16">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {currentState}
          </h2>
          <p className="text-sm text-gray-600">
            {currentState === "Login" ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
          {currentState === "Sign Up" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="First Name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Last Name"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Email address"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
              value={password}
            />

            {password.length > 0 && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
          {currentState === "Login" && (
            <button
              type="button"
              className="text-gray-600 text-sm text-right -mb-2 w-full hover:text-gray-800 font-normal focus:outline-none"
            >
              Forgot password?
            </button>
          )}

          {currentState === "Sign Up" && password.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-400 space-y-1">
              <RequirementIndicator
                met={passwordRequirements.hasUpperCase}
                text="Contains uppercase letter (A-Z)"
              />
              <RequirementIndicator
                met={passwordRequirements.hasLowerCase}
                text="Contains lowercase letter (a-z)"
              />
              <RequirementIndicator
                met={passwordRequirements.hasMinLength}
                text="At least 8 characters long"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm 
              text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-black transition duration-200 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              currentState
            )}
          </button>

          <div className="flex items-center justify-between text-sm">
            {currentState === "Login" ? (
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setCurrentState("Sign Up")}
                  className="text-black hover:text-gray-800 font-medium focus:outline-none"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setCurrentState("Login")}
                  className="text-black hover:text-gray-800 font-medium focus:outline-none"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
