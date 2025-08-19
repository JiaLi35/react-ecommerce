import {
  Box,
  Button,
  Container,
  Grid,
  Select,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import { getProducts } from "../utils/api";
import { useState, useEffect } from "react";

export default function Product() {
  // to store data from /products API
  const [products, setProducts] = useState([]);
  // state to store category filter
  const [category, setCategory] = useState("all");

  useEffect(() => {
    // get movies from API
    getProducts(category).then((data) => {
      setProducts(data);
    });
  }, [category]);

  return (
    <>
      {/* header */}
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Welcome to My Store
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Products
          </Typography>
          <Button variant="contained" color="success">
            Add New
          </Button>
        </Box>
        <Box sx={{ py: 2 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Games">Games</MenuItem>
              <MenuItem value="Consoles">Consoles</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Subscriptions">Subscriptions</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={product.id}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 2,
                    }}
                  >
                    <Chip
                      variant="outlined"
                      color="warning"
                      label={`$${product.price}`}
                    />
                    <Chip
                      variant="outlined"
                      color="success"
                      label={`${product.category}`}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      width: "100%",
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="info"
                      sx={{
                        borderRadius: 5,
                        textTransform: "capitalize",
                        fontSize: "14px",
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        borderRadius: 5,
                        textTransform: "capitalize",
                        fontSize: "14px",
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
