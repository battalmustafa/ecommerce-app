import { Box, IconButton, Modal, Typography, Divider, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import currencyFormat from '../../../utils/currencyFormat';
import useCart from '../../../hooks/useCart';

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartDialogProps> = ({ open, onClose }) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems); // i did not use getCart api because it returns all products
const {removeFromCart} = useCart();
  const handleRemoveFromCart = async (productId: string) => {
    await removeFromCart(productId);
  };
  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.product.price * cartItem.quantity;
    }, 0);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          p: 4,
          width: 400,
          borderRadius: 8,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Your Cart
        </Typography>
        {cartItems.length === 0 && (
          <Typography variant="body2">Your cart is empty</Typography>
        )}
        {cartItems.map((item, index) => (
          <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1">
                Product Name: {item.product.name} 
              </Typography>
              <Typography variant="body2">
                Product ID: {item.product.id} 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity}
              </Typography>
            </Box>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleRemoveFromCart(item.product.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
        {cartItems.length > 0 && <Divider />}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Typography variant="h6" color="primary">
            Total: 
          </Typography>
          <Typography variant="h6" color="primary">
            {currencyFormat(calculateTotal()) }
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default CartModal;
