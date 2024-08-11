import React from "react";
import { useNavigate } from "react-router-dom";

const ProductsList = React.memo(({ products, searchQuery, handleAddToCart }) => {
  const navigate = useNavigate();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {filteredProducts.map((product, index) => (
        <div
          key={`${product.id}-${index}`}
          className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-72 transform transition-transform hover:scale-105 flex flex-col"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="flex justify-center items-center p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <div className="mt-auto">
              <p className="text-lg font-bold mb-4">${product.price}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <span className="absolute inset-[-200%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
                  Add to cart
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ProductsList;