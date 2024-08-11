import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCartStart,
  removeFromCartSuccess,
  removeFromCartFail,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/cart/cartSlice";
import { FaCheckCircle } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { removeError, removeSuccess } from "../../main";
import EmptyCart from "../../lottie-animations/empty-cart.json";
import Lottie from "lottie-react";
import Footer from "../../components/Footer"; // Import the Footer component

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  console.log(cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCartStart());
    try {
      dispatch(removeFromCartSuccess(item.id));
      removeSuccess();
    } catch (err) {
      dispatch(removeFromCartFail(err.message));
      removeError();
    }
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shippingFee = 5.0; // Example shipping fee
    const tax = subtotal * 0.1; // Example tax rate of 10%
    return (subtotal + shippingFee + tax).toFixed(2);
  };

  const handlePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const body = {
      products: cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(`/api/user/create-checkout-session`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row p-6 h-full">
          <div className="w-full md:w-2/3 p-4">
            <h2 className="font-bold mb-4">
              <span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-3xl text-transparent">
                Checkout
              </span>
            </h2>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full -mt-24">
                <Lottie animationData={EmptyCart} className="w-1/2 h-1/2" />
                <p className="text-lg text-gray-600">
                  Your cart is empty. Add some products to your cart.
                </p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4 p-4 border rounded-lg shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleDecrementQuantity(item.id)}
                        className="bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400 transition-colors"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrementQuantity(item.id)}
                        className="bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="w-full md:w-1/4 p-4">
            <h2 className="text-2xl font-bold mb-4">
              <h2 className="inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-2xl text-transparent">
                Summary
              </h2>
            </h2>
            <div className="p-4 border rounded-lg shadow-sm">
              <p className="text-lg font-semibold">
                Subtotal: $
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
              <hr className="m-2 " />
              <p className="text-lg font-semibold">Shipping Fee: $5.00</p>
              <hr className="m-2" />
              <p className="text-lg font-semibold">
                Tax: $
                {(
                  cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  ) * 0.1
                ).toFixed(2)}
              </p>
              <hr className="m-2 " />
              <p className="text-lg font-semibold">
                Total: ${calculateTotal()}
              </p>
              <button
                onClick={handlePayment}
                className="transition-background inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50  m-4"
              >
                Proceed with payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
