
import React from 'react';

const ProductsList = ({ products, searchQuery,handleAddToCart }) => {
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-wrap justify-center gap-8">
          {filteredProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-72 transform transition-transform hover:scale-105 flex flex-col">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
                <div className="mt-auto">
                  <p className="text-lg font-bold mb-4">${product.price}</p>
                  <button onClick={() => handleAddToCart(product)} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors hover:shadow-lg">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
  );
};

export default ProductsList;