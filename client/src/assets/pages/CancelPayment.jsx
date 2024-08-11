import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPayment = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-24">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h1>
      <p className="text-lg mb-6">Something went wrong with your payment.</p>
      <button
        onClick={handleRedirect}
        className="transition-background inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default CancelPayment;