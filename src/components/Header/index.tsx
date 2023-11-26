import React, { useState } from 'react';
import { Badge, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import CartModal from './components/CartModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Header: React.FC = () => {
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);


  const handleCartIconClick = () => {
    setCartDialogOpen(true);
  };

  const handleCartDialogClose = () => {
    setCartDialogOpen(false);
  };

  return (
    <div className='grid grid-cols-12 sm:grid-rows-2 mt-8 px-4'>
    <div className='col-span-12 sm:col-span-3 sm:row-span-1 sm:flex'>
      <Logo />
    </div>
    <div className='col-span-12 sm:col-span-6 sm:row-span-1 sm:flex'>
      <SearchBar />
    </div>
    <div className='col-span-12 sm:col-span-3 sm:row-span-1 sm:flex justify-end items-center'>
      <Button onClick={handleCartIconClick} color="inherit">
      <Badge badgeContent={cartItems.length} color="error">
        <ShoppingCartIcon />
      </Badge>
       </Button>
    </div>
      <CartModal open={cartDialogOpen} onClose={handleCartDialogClose} />
    </div>
  
  );
};

export default Header;
