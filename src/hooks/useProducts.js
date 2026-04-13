import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getProductImage } from "../utils/productImages";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const normalizeProduct = (product) => ({
  ...product,
  image: product.image || getProductImage(product.name),
});

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data.map(normalizeProduct));
    } catch (err) {
      setError("Не вдалося завантажити товари з API");
      console.error("Помилка API:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = async (payload) => {
    try {
      setActionError(null);
      const response = await axios.post(`${API_URL}/api/products`, payload);
      setProducts((prev) => [...prev, normalizeProduct(response.data)]);
      return { ok: true };
    } catch (err) {
      const message = err.response?.data?.message || "Не вдалося додати товар";
      setActionError(message);
      return { ok: false, message };
    }
  };

  const updateProduct = async (id, payload) => {
    try {
      setActionError(null);
      const response = await axios.put(`${API_URL}/api/products/${id}`, payload);
      const updated = normalizeProduct(response.data);
      setProducts((prev) => prev.map((item) => (item._id === id ? updated : item)));
      return { ok: true, data: updated };
    } catch (err) {
      const message = err.response?.data?.message || "Не вдалося оновити товар";
      setActionError(message);
      return { ok: false, message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      setActionError(null);
      await axios.delete(`${API_URL}/api/products/${id}`);
      setProducts((prev) => prev.filter((item) => item._id !== id));
      return { ok: true };
    } catch (err) {
      const message = err.response?.data?.message || "Не вдалося видалити товар";
      setActionError(message);
      return { ok: false, message };
    }
  };

  return {
    products,
    loading,
    error,
    actionError,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
