import Header from "../components/Header";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getProduct, updateProduct } from "../utils/api_products";
import { toast } from "sonner";
import { useNavigate, useParams, Link } from "react-router";

const ProductEdit = () => {
  const { id } = useParams(); // retrieve id from the url
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  // load the product data from the backend api, then assign it to the state
  useEffect(() => {
    getProduct(id)
      .then((productData) => {
        // check if productData is empty or not
        if (productData) {
          // update the individual states with data
          setName(productData ? productData.name : "");
          setDescription(productData ? productData.description : "");
          setPrice(productData ? productData.price : 0);
          setCategory(productData ? productData.category : "");
        } else {
          // if not available, set error message
          setError("Product not found");
        }
      })
      .catch((error) => {
        setError("Product not found");
      });
  }, [id]);

  const handleFormSubmit = async (event) => {
    // 1. check for error
    if (!name || !price || !category) {
      toast.error("Please fill up the required fields.");
    }

    try {
      // 2. trigger the API to update product
      await updateProduct(id, name, description, price, category);
      // 3. if successful, redirect user back to home page and show success message
      toast("Product has been updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // if error return the error
  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h3" align="center" mb={2} color="error">
            {error}
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go back to Home
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h3" align="center" mb={2}>
          Edit Product
        </Typography>
        <Box mb={2}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            type="number"
            label="Price"
            fullWidth
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </Box>
        <Box mb={2}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(event) => {
                setCategory(event.target.value);
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
        <Box mb={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
          >
            Update
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ProductEdit;
