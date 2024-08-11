import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddReview = () => {
    const reviewInput = document.getElementById("review-input");
    const newReview = reviewInput.value;
    if (newReview) {
      setReviews([...reviews, newReview]);
      reviewInput.value = "";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < rating ? "text-yellow-500" : "text-gray-300"}
      />
    ));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  if (error) return <div>Error fetching product: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      {product && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-full">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto rounded-lg max-h-96 object-contain"
              />
            </div>
            <div className="md:w-1/2 md:pl-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h2>
              <div className="flex items-center mt-2">
                {renderStars(Math.round(product.rating.rate))}
                <span className="ml-2 text-gray-600">
                  ({product.rating.count} reviews)
                </span>
              </div>
              <p className="text-gray-600 mt-2">${product.price}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-gray-700 mt-2">{product.description}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Sizes</h3>
                <select className="mt-2 border border-gray-300 rounded-md p-2">
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6 ">
            <h3 className="text-lg font-semibold ml-10">Customer Reviews</h3>
            <div id="reviews" className="mt-4">
              {reviews.map((review, index) => (
                <p key={index} className="border-b border-gray-200 py-2">
                  {review}
                </p>
              ))}
            </div>
            <div className="ml-10 mt-4 w-1/3 ">
              <input
                id="review-input"
                type="text"
                placeholder="Write a review..."
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <button
                onClick={handleAddReview}
                className="bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-700 mt-2"
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
