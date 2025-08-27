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
import { deleteProduct, getProducts } from "../utils/api_products";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { AddToCart } from "../utils/cart";

export default function Product() {
  const navigate = useNavigate();
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

  const handleProductDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the product
      if (result.isConfirmed) {
        // delete product in the backend
        await deleteProduct(id);
        // method #1: remove from the state manually
        // delete the product from the state
        // setProducts(products.filter((p) => p._id !== id));

        // method #2: get the new data from the backend
        const updatedProducts = await getProducts(category, page);
        setProducts(updatedProducts);
        toast.success("Product has been deleted");
      }
    });
  };

  const handleAddToCart = async (product) => {
    try {
      await AddToCart(product);
      navigate("/cart");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Welcome to My Store" current="home" />
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
                      label={"$" + product.price}
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
                    onClick={() => {
                      handleAddToCart(product);
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
                      component={Link}
                      to={`/products/${product._id}/edit`}
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
                      onClick={() => {
                        handleProductDelete(product._id);
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
            disabled={products.length < 1 ? true : false}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}
