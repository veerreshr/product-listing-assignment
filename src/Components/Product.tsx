import React from "react";
import { ProductType } from "../Interfaces/ProductListing.model";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface ProductProp {
  product: ProductType;
}
const Product: React.FC<ProductProp> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title + " image"}
        />
        <CardContent>
          <Typography variant="overline" gutterBottom>
            {product.brand}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {product.title?.length > 20
              ? product.title.substring(0, 20) + "..."
              : product.title}
          </Typography>

          <Typography gutterBottom variant="h6" component="div">
            &#8377;{product.price}
          </Typography>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Sizes:
            </Typography>
            {product.sizes.join(", ")}
          </Box>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {product.ideal_for.map((ideal: string) => (
              <Chip key={ideal} label={ideal} size="small" variant="outlined" />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
