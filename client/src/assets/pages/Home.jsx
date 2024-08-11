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
      
      <span className='inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-2xl text-transparent text-center mx-auto m-5'>
      Top selling <br/> products
    </span>

      <ProductsList products={filteredProducts} searchQuery={searchQuery} handleAddToCart={handleAddToCart} />
    </div>
  </div>
  );
};

export default Home;