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
      navigate("/");
    } catch (error) {
      dispatch(signInFail(error));
    }
  };
  return (
    <div>
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
          className=" w-full bg-slate-600 hover:bg-slate-500 text-white uppercase mb-4 py-3 px-8 rounded hover:transition duration-100 disabled:opacity-80"
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
