const customError = require("../utils/error");
const User = require("../models/user-model");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const test = (req, res) => {
  res.json({ response: "Api woking!" });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(customError(401, "You can update only your account!"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(customError(401, "Unauthorized"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (err) {
    next(err);
  }
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const createCheckoutSession = async (req, res) => {
  try {
    const line_items = req.body.products.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            images: [product.image],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { test, updateUser, deleteUser, createCheckoutSession };
