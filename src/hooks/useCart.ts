import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../components/ListPage/components/ProductCard';
import { addToCartRedux, removeFromCartRedux } from '../redux/slices/cartSlice';
import postRequest, { ApiResponse } from '../utils/postRequest';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartResponse {
  success: boolean;
  message: string;
}

const useCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const addToCart = async (product: Product, quantity: number) => {
    try {
      setLoading(true);
      setError(null);

      // Dispatch action to update Redux store
      dispatch(addToCartRedux({ product, quantity }));

      const apiUrl = `https://linkedin-cv-crawler.beta-limited.workers.dev/interview/add-to-cart?id=${product.id}`;

      const body: CartItem = {
        productId: product.id,
        quantity,
      };

      const response: ApiResponse = await postRequest(apiUrl, { body });

      console.log('Add to Cart Response:', response);

      setLoading(false);

      return response.data as CartResponse;
    } catch (error) {
      console.error('Add to Cart Error:', error);

      setLoading(false);
      setError('Failed to add to cart. Please try again.');

      return {
        success: false,
        message: 'Failed to add to cart. Please try again.',
      };
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      dispatch(removeFromCartRedux(productId));


      const apiUrl = `https://linkedin-cv-crawler.beta-limited.workers.dev/interview/subtract-from-cart?id=${productId}`;

      const response: ApiResponse = await postRequest(apiUrl);

      console.log('Remove from Cart Response:', response);

      setLoading(false);

      return response.data as CartResponse;
    } catch (error) {
      console.error('Remove from Cart Error:', error);

      setLoading(false);
      setError('Failed to remove from cart. Please try again.');

      return {
        success: false,
        message: 'Failed to remove from cart. Please try again.',
      };
    }
  };

  return {
    addToCart,
    removeFromCart,
    loading,
    error,
  };
};

export default useCart;
