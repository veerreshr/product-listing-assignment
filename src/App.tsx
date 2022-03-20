import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import Grid from "@mui/material/Grid";
import Filters from "./Components/Filters";
import ProductListing from "./Components/ProductListing";
import data from "./products.json";
import { ProductType } from "./Interfaces/ProductListing.model";
function App() {
  const [products, setProducts] = useState(data);
  const applyFilter = (filter: ProductType[]) => {
    setProducts(filter);
  };
  return (
    <div className="App">
      <NavBar />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Filters applyFilter={applyFilter} />
        </Grid>
        <Grid item xs={9}>
          <ProductListing products={products} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
