import Header from "../components/Header";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../utils/api_categories";
import Swal from "sweetalert2";
import { toast } from "sonner";

const CategoriesPage = () => {
  // store categories data from API
  const [categories, setCategories] = useState([]);
  const [label, setLabel] = useState("");

  // Call the API
  useEffect(() => {
    getCategories()
      .then((data) => {
        // putting the data into orders state
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call only once when the page loads

  const handleAddNewCategory = async (label) => {
    if (!label) {
      toast.error("Please fill in the field!");
    } else {
      try {
        // 2. trigger the API to create new category
        await addCategory(label);
        // 3.
        setLabel("");
        const updatedCategories = await getCategories();
        setCategories(updatedCategories);
        toast("New Category has been added");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleUpdateCategory = async (id) => {
    const specificCategory = await getCategory(id);

    Swal.fire({
      title: "Update Category",
      input: "text",
      inputPlaceholder: specificCategory.label,
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      preConfirm: async (value) => {
        if (!value) {
          Swal.showValidationMessage("Please fill in the fields");
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCategory(id, result.value);
        const updatedCategories = await getCategories();
        setCategories(updatedCategories);
        toast.success("Category updated successfully");
      }
    });
  };

  const handleDeleteCategory = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this category?",
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
        await deleteCategory(id);
        // method #2: get the new data from the backend
        const updatedCategories = await getCategories();
        setCategories(updatedCategories);
        toast.success("Category has been deleted");
      }
    });
  };

  return (
    <>
      <Header current="categories" title="Manage Categories" />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
          }}
        >
          <InputLabel>Add New Category</InputLabel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              mt: "10px",
            }}
          >
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleAddNewCategory(label)}
            >
              Add
            </Button>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <InputLabel>Categories</InputLabel>
          <List sx={{ width: "100%" }}>
            {categories.map((category) => (
              <ListItem
                key={category._id}
                disableGutters
                divider
                secondaryAction={
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleUpdateCategory(category._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                }
              >
                <ListItemText primary={`${category.label}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
};

export default CategoriesPage;
