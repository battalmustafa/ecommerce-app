import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import ProductCard from '../../ListPage/components/ProductCard';
import fetchApiData from '../../../utils/fetchApiData';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
interface SearchResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: any;
}

const SearchResultModal: React.FC<SearchResultModalProps> = ({ isOpen, onClose, results }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Search Results
      <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: 'absolute', right: '18px', top: '8px', padding: '4px'}}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent="center" mt={8}>
          {results &&
            results.map((product: any) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchApi =
    'https://linkedin-cv-crawler.beta-limited.workers.dev/interview/search?name=';
  const [results, setResults] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSearch = async () => {
    try {
      if (searchQuery.length > 1) {
        const apiResponse = await fetchApiData(searchApi + searchQuery);
        setResults(apiResponse.data);
        setOpenModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const isMobile = useSelector((state: RootState) => state.general.isMobile); 


  return (
    <div className='flex justify-stretch mx-auto'>
      <TextField
        variant="outlined"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          style: { borderRadius: '25px 0 0 25px', height: '40px', width: isMobile ? '200px' : '600px' },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        style={{
          borderRadius: '0 25px 25px 0',
          backgroundColor: '#c24b5a',
          color: '#ffffff',
          maxHeight: '40px',
          boxShadow: 'none',
          textTransform: 'none',
        }}
      >
        Search
      </Button>
      <SearchResultModal isOpen={openModal} onClose={handleCloseModal} results={results} />
    </div>
  );
};

export default SearchBar;
