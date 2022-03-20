import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Product from "./Product";
import {
  ProductListingType,
  ProductType,
} from "../Interfaces/ProductListing.model";
import Grid from "@mui/material/Grid";

const ProductListing: React.FC<ProductListingType> = ({ products }) => {
  const [productList, setProductList] = useState<ProductType[]>();
  useEffect(() => {
    setProductList(products);
  }, [products]);
  return (
    <Box sx={{ m: 2 }}>
      <Grid container spacing={2}>
        {productList?.length === 0 && (
          <Box sx={{ m: 2 }}>No Products Available</Box>
        )}
        {productList?.map((product: ProductType) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            {" "}
            <Product key={product.id} product={product} />{" "}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListing;
