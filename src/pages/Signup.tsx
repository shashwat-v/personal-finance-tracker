import loginBackground from "../assets/LoginBackground.webp";
import googleIcon from "../assets/GoogleIcon.png";
import emailIcon from "../assets/EmailIcon.png"; // Add your email icon path
import passwordIcon from "../assets/PasswordIcon.png"; // Add your password icon path
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface FormInputs extends FieldValues {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
}

// const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
function Signup() {
  // const { loading, userInfo, success } = useAppSelector((state) => state.auth);
  // const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   // redirect user to login page if registration was successful
  //   if (success) navigate("/login");
  //   // redirect authenticated user to profile screen
  //   if (userInfo) navigate("/");
  // }, [navigate, userInfo, success]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      alert("Password mismatch");
      return;
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    // dispatch(registerUser(data));
    navigate("/");
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
        style={{ width: "540px", height: "600px" }}
      >
        <h1 className="text-3xl font-bold mb-1 text-left">Welcome,</h1>
        <h1 className="text-3xl font-bold mb-2 text-left">Get Started!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 pl-14 border border-gray-300 rounded-md bg-[#F6F6F6] text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              {...register("fullname", { required: "Full Name is required" })}
            />
            <FaUserLarge className="absolute top-3 left-3 w-8 h-7 opacity-50" />
          </div>
          <div className="relative w-full mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-14 border border-gray-300 rounded-md bg-[#F6F6F6] text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              {...register("email", { required: "Email is required" })}
            />
            <img
              src={emailIcon}
              alt="Email"
              className="absolute top-3 left-3 w-8 h-7 opacity-75"
            />
          </div>
          <div className="relative w-full mb-4">
            <input
              type="contact number"
              placeholder="Contact"
              className="w-full p-3 pl-14 border border-gray-300 rounded-md bg-[#F6F6F6] text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              {...register("phoneNumber", { required: "contact is required" })}
            />
            <MdOutlineLocalPhone className="absolute top-3 left-3 w-8 h-7 opacity-50" />
          </div>

          <div className="flex gap-2">
            {/* Password Input Field */}
            <div className="relative w-full mb-4 flex gap-1">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 pl-14 border border-gray-300 rounded-md bg-[#F6F6F6]  text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                {...register("password", {
                  required: "Password is required",
                  minLength: 8,
                })}
              />
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

            {/* Confirm Password Input Field */}
            <div className="relative w-full mb-4 flex gap-[2px]">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full p-3 pl-14 border border-gray-300 rounded-md bg-[#F6F6F6] text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
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
          </div>
          <div className="flex flex-col items-center">
            {}
            <button
              type="submit"
              className="w-60 mb-4 mt-4 p-3 bg-[#00A4DF] text-white text-lg rounded-md"
              onClick={handleSubmit(onSubmit)}
              // disabled={loading}
            >
              Signup
            </button>

            <button className="w-60 p-3 border border-gray-300 rounded-md flex items-center justify-center">
              <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
              <span className="text-lg font-normal">Google</span>
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Aready have an account ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
