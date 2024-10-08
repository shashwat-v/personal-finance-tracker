import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import loginBackground from "../assets/LoginBackground.webp";
// import googleIcon from "../assets/GoogleIcon.png";
import emailIcon from "../assets/EmailIcon.png"; // Add your email icon path
import passwordIcon from "../assets/PasswordIcon.png"; // Add your password icon path
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  loginInFailure,
  loginInStart,
  loginInSuccess,
} from "../redux/slices/auth/userSlice";
import { loginUser } from "../redux/slices/auth/apiService";
import { store } from "../redux/store";
import axios, { AxiosResponse } from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
interface FormInputs extends FieldValues {
  email: string;
  password: string;
}
// interface IUser {
//   googleId: string;
//   email: string;
//   name: string;
//   phoneNumber?: string;
// }

// interface IResponse {
//   user?: IUser;
//   message: string;
// }
const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const { loading, currentUser } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    dispatch(loginInStart());
    try {
      const response = await loginUser(data);
      const { _id, email, phoneNumber, fullname } = response.data;
      dispatch(loginInSuccess({ email, _id, phoneNumber, fullname }));

      console.log(`${response}:Login succesfully`);
      console.log("State after loginInSuccess:", store.getState());
    } catch (error) {
      dispatch(loginInFailure(data));
      console.log(`${data}:Login failed ${error}`);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleLogin = async (token: string): Promise<void> => {
    // console.log(token);
    try {
      const response: AxiosResponse<{ user: any; message: string }> =
        await apiClient.post("/api/user/google", { token });

      if (response.data.message === "User authenticated successfully") {
        const { _id, email, phoneNumber, fullname } = response.data.user;
        dispatch(loginInSuccess({ email, _id, phoneNumber, fullname }));
        // Handle successful login
        // console.log(response.data.user);
      }
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        // User not found, redirect to sign-up page
        console.log("User not found. Redirecting to sign-up page.");
        navigate("/signup");
      } else {
        console.error("Authentication failed:", error);
      }
    }
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
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 pl-14 border border-gray-300 rounded-md bg-[#F6F6F6] text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
            <img
              src={emailIcon}
              alt="Email"
              className="absolute top-3 left-3 w-8 h-7 opacity-75"
            />
          </div>
          <div className="relative w-full mb-4 flex gap-1">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 pl-14 border border-gray-300 rounded-md bg-[#F6F6F6]  text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mb-4 mt-4 p-3 bg-[#00A4DF] text-white text-lg rounded-md"
            disabled={loading}
          >
            Login
          </button>
          <GoogleOAuthProvider clientId="824073592427-m2ejpmb7pbgqba1ka4ooq4us6ppf72qn.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                console.log(credentialResponse);
                const token = credentialResponse.credential;
                if (token) {
                  handleGoogleLogin(token);
                  // dispatch(loginInSuccess(credentialResponse));
                } else {
                  console.error("No credential received from Google");
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
          {/* <button className="w-full p-3 border border-gray-300 rounded-md flex items-center justify-center">
            <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
            <span className="text-lg font-normal">Google</span>
          </button> */}
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
