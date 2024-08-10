import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const currentUser = useSelector((state) => state.user.user);

  return (
    <div className="bg-slate-600 text-white text-xl p-4 shadow-lg">
      <div className="flex justify-between items-center py-3 max-w-7xl mx-auto">
        <Link to="/">
          <div className="font-bold">ElectroFashion Hub</div>
        </Link>
        <ul className="flex gap-5">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/About">
            <li>About</li>
          </Link>
          <Link to="/cart">
            <li className="mt-[5px]  ">
              <FaShoppingCart />
            </li>
          </Link>
          <Link to="/Profile">
            {currentUser ? (
              <img
                className="w-9 h-9 object-cover rounded-3xl shadow-lg"
                src={currentUser.profilePicture}
                alt="error"
              />
            ) : (
              <li>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
