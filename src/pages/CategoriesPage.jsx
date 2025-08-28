import Header from "../components/Header";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  InputLabel,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
        <Typography variant="h5" mb={2}>
          Categories
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mb: 3,
          }}
        >
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
              label="Category Name"
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right" sx={{ paddingRight: "130px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="category">
                    {category.label}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-end",
                      }}
                    >
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default CategoriesPage;
