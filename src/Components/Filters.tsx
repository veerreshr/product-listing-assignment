import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ProductType } from "./../Interfaces/ProductListing.model";
import data from "../products.json";

interface FilterProps {
  applyFilter: (filter: ProductType[]) => void;
}

const Filters: React.FC<FilterProps> = ({ applyFilter }) => {
  const [price, setPrice] = React.useState(""); //0: high to low, 1: low to high
  const [ideal, setIdeal] = React.useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice((event.target as HTMLInputElement).value);
  };

  const handleIdealChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdeal((event.target as HTMLInputElement).value);
  };

  const handleApplyFilters = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    let filteredProducts: ProductType[] = data;

    if (price === "0") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }
    if (price === "1") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }
    if (ideal) {
      filteredProducts = filteredProducts.filter((product: ProductType) =>
        product.ideal_for.includes(ideal)
      );
    }

    if (sizes.length > 0) {
      filteredProducts = filteredProducts.filter((product: ProductType) => {
        return product.sizes.some((size) => sizes.includes(size));
      });
    }

    if (brands.length > 0) {
      filteredProducts = filteredProducts.filter((product: ProductType) =>
        brands.includes(product.brand)
      );
    }
    applyFilter([...filteredProducts]);
  };

  const handleClearFilters = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setPrice("");
    setIdeal("");
    setSizes([]);
    setBrands([]);
    applyFilter(data);
  };
  return (
    <Box sx={{ m: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        spacing={1}
      >
        <Typography variant="h5" gutterBottom component="div">
          Filters
        </Typography>
        <Box>
          <Button
            variant="contained"
            size="small"
            sx={{ mr: 1 }}
            onClick={handleApplyFilters}
          >
            Apply
          </Button>
          <Button variant="outlined" size="small" onClick={handleClearFilters}>
            Clear
          </Button>
        </Box>
      </Stack>

      <FormControl component="fieldset" sx={{ m: 1, display: "block" }}>
        <FormLabel component="legend">Price</FormLabel>
        <RadioGroup
          aria-label="price"
          name="price-filter-radio"
          value={price}
          onChange={handlePriceChange}
        >
          <FormControlLabel value="0" control={<Radio />} label="high to low" />
          <FormControlLabel value="1" control={<Radio />} label="low to high" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ m: 1, display: "block" }}>
        <FormLabel component="legend">Ideal For</FormLabel>
        <RadioGroup
          aria-label="ideal-for"
          name="ideal-for-filter-radio"
          value={ideal}
          onChange={handleIdealChange}
        >
          <FormControlLabel value="Men" control={<Radio />} label="Men" />
          <FormControlLabel value="Women" control={<Radio />} label="women" />
        </RadioGroup>
      </FormControl>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="size-filter"
          id="size-filter"
        >
          <Typography>Sizes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <FormControlLabel
                key={size}
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const { checked } = event.target as HTMLInputElement;
                      if (checked) {
                        setSizes([...sizes, size]);
                      } else {
                        setSizes((prevSizes: string[]) =>
                          prevSizes.filter((s) => s !== size)
                        );
                      }
                    }}
                    checked={sizes.includes(size)}
                  />
                }
                label={size}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="brand-filter"
          id="brand-filter"
        >
          <Typography>Brands</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {["Trijal Fab", "TRIPR", "BLIVE", "AND"].map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const { checked } = event.target as HTMLInputElement;
                      if (checked) {
                        setBrands([...brands, brand]);
                      } else {
                        setBrands((prevBrands: string[]) =>
                          prevBrands.filter((b) => b !== brand)
                        );
                      }
                    }}
                    checked={brands.includes(brand)}
                  />
                }
                label={brand}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Filters;
