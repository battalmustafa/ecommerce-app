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
  const isMobile = useSelector((state: RootState) => state.general.isMobile); 
  return (
   
    <>
    {isMobile ?
     <div className='flex flex-wrap items-center justify-center'>
    
      <Logo />
      <Button onClick={handleCartIconClick} color="inherit">
        <Badge badgeContent={cartItems.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Button>

      <SearchBar />
  </div> :
  <div className='flex justify-between items-center mx-auto max-w-6xl py-4 bg-white'>
  <Logo />
  <SearchBar />
  <Button onClick={handleCartIconClick} color="inherit">
    <Badge badgeContent={cartItems.length} color="error">
      <ShoppingCartIcon />
    </Badge>
  </Button>
    <CartModal open={cartDialogOpen} onClose={handleCartDialogClose} />
</div> }
    </>
    
  
  );
};

export default Header;
