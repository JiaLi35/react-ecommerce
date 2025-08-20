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
import Header from "../components/Header";
import { getProducts } from "../utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Product() {
  // to store data from /products API
  const [products, setProducts] = useState([]);
  // state to store category filter
  const [category, setCategory] = useState("all");
  // to track which page the user is in
  const [page, setPage] = useState(1);

  useEffect(() => {
    // get movies from API
    getProducts(category, page).then((data) => {
      setProducts(data);
    });
  }, [category, page]);

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Product
          </Typography>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/products/new"
          >
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
              onChange={(event) => {
                setCategory(event.target.value);
                // reset the page back to 1
                setPage(1);
              }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Games">Games</MenuItem>
              <MenuItem value="Consoles">Consoles</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Subscriptions">Subscriptions</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={product._id}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontWeight: "bold", minHeight: "30px" }}>
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
                      variant="contained"
                      color="warning"
                      label={`$${product.price}`}
                    />
                    <Chip
                      variant="contained"
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
        {products.length === 0 ? (
          <Typography variant="h4" sx={{ py: 3, textAlign: "center" }}>
            No more products found.
          </Typography>
        ) : null}
        <Box
          sx={{
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            disabled={page === 1 ? true : false}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span>Page: {page}</span>
          <Button
            variant="contained"
            disabled={products.length < 6 ? true : false}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}
