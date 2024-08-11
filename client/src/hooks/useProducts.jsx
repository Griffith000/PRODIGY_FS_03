// client/src/hooks/useProducts.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = (selectedCategory) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = selectedCategory
          ? `https://fakestoreapi.com/products/category/${selectedCategory}`
          : "https://fakestoreapi.com/products";
        const response = await axios.get(url);
        const filteredProducts = response.data.filter(
          (product) => product.category !== "electronics"
        );
        setProducts(filteredProducts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return { products, loading, error };
};

export default useProducts;
