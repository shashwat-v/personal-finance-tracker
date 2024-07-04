import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import loginBackground from "../assets/LoginBackground.webp";
import googleIcon from "../assets/GoogleIcon.png";
import emailIcon from "../assets/EmailIcon.png"; // Add your email icon path
import passwordIcon from "../assets/PasswordIcon.png"; // Add your password icon path
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import { userLogin } from "../redux/slices/auth/authActions.ts";
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
// import { GiEarrings } from "react-icons/gi";

interface FormInputs extends FieldValues {
  email: string;
  password: string;
}

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const { loading, userInfo, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    try {
      console.log(data);
      console.log("Login Succesfull");
      dispatch(userLogin(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src={loginBackground}
          alt="Login"
          className="w-full h-full brightness-150 object-cover"
        />
      </div>
      <div
        className="relative z-10 p-8 bg-white rounded-2xl shadow-lg border-2 top-24 border-gray-400 flex-col justify-center items-center"
        style={{ width: "390px", height: "500px" }}
      >
        <h1 className="text-3xl font-bold mb-1 text-left">Hey,</h1>
        <h1 className="text-3xl font-bold mb-1 text-left">Welcome Back!</h1>
        <p className="mb-6 text-left text-gray-800">
          Please Login or SignUp to continue
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-14 border border-gray-300 rounded-md bg-[#F6F6F6] text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <img
              src={emailIcon}
              alt="Email"
              className="absolute top-3 left-3 w-8 h-7 opacity-75"
              {...register("email", { required: "Email is required" })}
            />
          </div>

          <div className="relative w-full mb-4 flex gap-1">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 pl-14 border border-gray-300 rounded-md bg-[#F6F6F6]  text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              {...register("Password", {
                required: "Password is required",
                minLength: 8,
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
            <img
              src={passwordIcon}
              alt="Password"
              className="absolute mx-1 top-3 left-3 w-7 h-7"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <BsEyeFill /> : <RiEyeCloseLine />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full mb-4 mt-4 p-3 bg-[#00A4DF] text-white text-lg rounded-md"
            disabled={loading}
          >
            Login
          </button>

          <button className="w-full p-3 border border-gray-300 rounded-md flex items-center justify-center">
            <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
            <span className="text-lg font-normal">Google</span>
          </button>
        </form>
        <p className="mt-4 text-center">
          Create new account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
