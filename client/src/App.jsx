import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import SignIn from "./assets/pages/SignIn";
import SignUp from "./assets/pages/SignUp";
import Profile from "./assets/pages/Profile";
import About from "./assets/pages/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./assets/pages/Checkout";
import DetailPage from "./assets/pages/DetailPage";
import Footer from "./components/Footer";
import SuccessPayment from "./assets/pages/SuccessPayment";
import CancelPayment from "./assets/pages/CancelPayment";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-24 ">
        {" "}
        {/* Add padding to the top */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/success" element={<SuccessPayment />} />
          <Route path="/cancel" element={<CancelPayment />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/product/:productId" element={<DetailPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
