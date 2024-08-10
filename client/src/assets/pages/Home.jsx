import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCartStart, addToCartSuccess, addToCartFail } from '../../redux/cart/cartSlice';
import { IoMdSearch } from "react-icons/io";
import ProductsList from '../../components/ProductList';
const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async (category = '') => {
      setLoading(true);
      try {
        const url = category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products';
        console.log(`Fetching products from URL: ${url}`);
        const response = await axios.get(url);
        console.log('API response:', response.data);
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(selectedCategory);
  }, [selectedCategory]);

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

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className='flex items-center justify-center'><span className="loading loading-dots loading-lg"></span></div>;
  if (error) return <div>Error fetching products: {error.message}</div>;

  return (
    <div className="flex">
      {/* Search bar */}
      <div className="w-1/5 min-w-[200px] p-6 bg-gray-100 border-r border-gray-200">
        <div className="relative mb-6 flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="w-full  p-2 border border-gray-300 rounded 
              focus:outline-none focus:ring focus:ring-blue"
          />
         <IoMdSearch size={27} className='absolute top-2 right-2 text-slate-400' />
        </div>
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"].map((category, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => handleCategoryChange(category === 'All' ? '' : category)}
                className={`py-2 px-4 rounded ${selectedCategory === category ? 'bg-gray-300 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-3/4 p-6">
        {/* <div className="flex flex-wrap justify-center gap-8">
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
        </div> */}
        <ProductsList products={filteredProducts} searchQuery={searchQuery} handleAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default Home;