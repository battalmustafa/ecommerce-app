import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ProductCard, { Product } from '../ListPage/components/ProductCard';
import fetchApiData from '../../utils/fetchApiData';

const SearchList: React.FC = () => {
  const productAPI = "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/products";
  const [products, setproducts] = useState<any>();
useEffect(() => {
    const fetchData = async () => {
        try {
          const apiResponse = await fetchApiData(productAPI);
            setproducts(apiResponse.data);
          console.log(apiResponse.data);
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchData();
}, []);
  return (
    <div className='bg-background min-h-screen pt-4 '>
      <Grid container spacing={2} justifyContent="center" mt={8}>
      {products && products.map((product:Product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
    </div>
    
  );
};

export default SearchList;
