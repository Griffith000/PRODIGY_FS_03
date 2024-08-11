import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCartStart,
  addToCartSuccess,
  addToCartFail,
} from "../../redux/cart/cartSlice";
import { IoMdSearch } from "react-icons/io";
import ProductsList from "../../components/ProductList";
import useProducts from "../../hooks/useProducts";

const Home = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { products, loading, error } = useProducts(selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(addToCartStart());
    try {
      dispatch(addToCartSuccess(product));
    } catch (err) {
      dispatch(addToCartFail(err.message));
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <div>Error fetching products: {error.message}</div>;

  return (
    <div className="flex flex-col h-screen">
      {/* Hero section */}
      <div className="flex flex-col w-full p-6 ">
        <section className="px-3 py-5 bg-neutral-100 bg-opacity-70 lg:py-10">
          <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
            <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
              <p className="text-4xl font-bold md:text-7xl text-[#B88D60]">
                25% OFF
              </p>
              <p className="text-4xl font-bold md:text-7xl">SUMMER SALE</p>
              <p className="mt-2 text-sm md:text-lg">For limited time only!</p>
              <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
                Shop Now
              </button>
            </div>
            <div className="order-1 lg:order-2 flex justify-center items-center bg-white bg-opacity-80 p-5 rounded-lg">
              <img
                className="h-80 w-80 lg:w-[500px] lg:h-[500px] object-contain"
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                alt="Sale Item"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Search bar and categories */}
      <div className="w-full p-6 bg-gray-100 border-t border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Categories
        </h2>
        <ul className="flex flex-wrap items-center justify-center  gap-4 mb-6">
          {["All", "jewelery", "men's clothing", "women's clothing"].map(
            (category, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() =>
                    handleCategoryChange(category === "All" ? "" : category)
                  }
                  className={`py-2 px-6 rounded-full transition-colors duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              </li>
            )
          )}
        </ul>
        <div className="relative mb-6 w-2/3 flex items-center justify-center ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="w-full mx-auto self-center p-3 ml-[500px] pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-400"
          />
          <IoMdSearch
            size={27}
            className="absolute right-4 top-3 text-gray-500"
          />
        </div>
      </div>
      <span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-3xl text-transparent text-center mx-auto m-5">
        Top Selling <br /> products
      </span>

      {/* Main content */}
      <div className="flex flex-col w-full p-6">
        <ProductsList
          products={filteredProducts}
          searchQuery={searchQuery}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default Home;
