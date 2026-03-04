import { useEffect, useState } from "react";
import axios from "axios";
import { getProductImage } from "../utils/productImages";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/products`);
        const withImages = response.data.map((product) => ({
          ...product,
          image: product.image || getProductImage(product.name),
        }));
        setProducts(withImages);
      } catch (err) {
        setError("Не вдалося завантажити товари з API");
        console.error("Помилка API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, setProducts, loading, error };
}
