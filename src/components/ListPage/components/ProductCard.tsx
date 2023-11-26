import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartRedux } from '../../../redux/slices/cartSlice';
import { Card, CardContent, Chip, Rating, Typography, IconButton, CardMedia, Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import currencyFormat from '../../../utils/currencyFormat';
import { RootState } from '../../../redux/store';
import useCart from '../../../hooks/useCart';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  discount: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
const {addToCart, removeFromCart} = useCart()
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = async (product: Product) => {
    await addToCart(product, quantity);
  };
  return (
    <Card sx={{padding: '0px',borderRadius: '10px'}}>
        <div className='bg-secondary p-2'>
        <Chip style={{ backgroundColor: '#c24b5a', color: '#ffffff' }} label={product.discount} size="small" color="primary" />
        <img className="w-60 h-60 " src={product.image} alt={product.name} />
        </div>
        <CardContent>
        <div className='flex justify-between bg-white'>
          <div>
            <Typography variant="subtitle1" className="mb-2">
              {product.name}
            </Typography>
        <div className='flex items-center text-xs mt-0.5'>
         <Rating
            name="read-only"
            value={product.rating}
            size="small"
            readOnly
        /> 
        <span>{"(" + product.rating + ")"}</span></div>
            <Typography variant="body2" className="text-red-700">
             {currencyFormat(product.price)}
              <span className='line-through text-gray-500 text-xs'>  {currencyFormat(product.originalPrice)}</span>
            </Typography>
          </div>
          <div className="flex flex-col items-center pl-4">
          {quantity !== 1 ? (
  <button
    className="border border-primary rounded-lg text-primary"
    style={{ visibility: 'visible', opacity: 1 }}
    onClick={handleDecrease}>
    <Remove />
  </button>
) : (
  <span style={{ visibility: 'hidden', opacity: 0 }}> <Remove /></span>
)}
  <span className="text-xs py-0.5 font-semibold">{quantity}</span>
  <button className="border rounded-lg border-primary text-primary" onClick={handleIncrease}>
    <Add />
  </button>
</div>
        </div>
        <Button
          fullWidth
          size="small"
          variant="contained"
          sx={{ borderRadius: '2px', marginTop: '12px' }}
          onClick={() => handleAddToCart(product)}
          disabled={cartItems.some(item => item.product.id === product.id)}
        >
          {cartItems.some(item => item.product.id === product.id) ? "In Cart" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
