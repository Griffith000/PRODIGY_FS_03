import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const currentUser = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] animate-background-shine text-gray-400 text-xl p-4 shadow-lg">
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
          <Link to="/checkout" className="relative">
            <li className="mt-[5px]">
              <FaShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-[5px] py-[3px] text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
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