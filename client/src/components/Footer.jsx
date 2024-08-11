import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="w-full p-6 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] animate-background-shine text-gray-400 text-center">
      <p className="text-lg m-1">
        © 2024 Fashion Hub. All rights reserved.
      </p>
      <p className="text-sm flex justify-center items-center space-x-4">
        <span>Follow us on</span>
        <a href="https://twitter.com" className="text-blue-500">
          <AiOutlineTwitter size={20} />
        </a>
        <a href="https://facebook.com" className="text-blue-700">
          <FaFacebook size={20} />
        </a>
        <a href="https://instagram.com" className="text-pink-500">
          <FaInstagram size={20} />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
