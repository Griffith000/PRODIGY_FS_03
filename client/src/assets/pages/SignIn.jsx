import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFail,
} from "../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../components/OAuth.jsx";
import { signInValide, signInError } from "../../main.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFail(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      signInValide();
      navigate("/");
    } catch (error) {
      dispatch(signInFail(error));
      signInError();
    }
  };
  return (
    <div className="h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center max-w-md mx-auto my-auto "
      >
        <div className="text-4xl m-7 font-semibold text-black text-center  ">
          Sign In
        </div>

        <input
          onChange={handleChange}
          id="email"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          id="password"
          type="password"
          placeholder="Password"
        />
        <button
          disabled={loading}
          className=" w-full animate-background-shine border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 m-2 mb-4 py-3 rounded hover:transition duration-100 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
        <p className="self-start">
          Dont have an account{" "}
          <Link
            to="/signUp"
            className="text-blue-600 underline hover:text-violet-800 transition duration-100"
          >
            sign up
          </Link>
        </p>
      </form>
      {error && (
        <p className="text-red-600 m-3 text-center">
          Something went wrong: {error}
        </p>
      )}
    </div>
  );
};

export default SignIn;
