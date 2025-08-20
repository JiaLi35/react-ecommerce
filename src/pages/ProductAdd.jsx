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
import { addProduct } from "../utils/api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handleFormSubmit = async (event) => {
    // 1. check for error
    if (!name || !price || !category) {
      toast.error("Please fill up the required fields.");
    }

    try {
      // 2. trigger the API to create new product
      await addProduct(name, description, price, category);
      // 3. if successful, redirect user back to home page and show success message
      toast("New Product has been added");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h3" align="center" mb={2}>
          Add New Product
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
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ProductAdd;
