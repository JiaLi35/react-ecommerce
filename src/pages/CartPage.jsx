import {
  Container,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import { deleteItemFromCart } from "../utils/cart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CartPage = () => {
  const navigate = useNavigate();
  // 3. load the cart data from local storage
  const cartLocalStorage = localStorage.getItem("cartlist");
  // 4. create a state to store the cart data from local storage
  const [cart, setCart] = useState(
    cartLocalStorage ? JSON.parse(cartLocalStorage) : []
  );
  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    cartTotal += cart[i].price * cart[i].quantity;
  }

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
        const updatedCart = deleteItemFromCart(id);
        setCart(updatedCart);
      }
    });
  };

  return (
    <>
      <Header title="Cart" />
      <Container sx={{ textAlign: "center" }}>
        Cart Page
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.length === 0 ? (
                <>
                  <Typography variant="h6" sx={{ m: 1 }}>
                    No Product Added yet
                  </Typography>
                </>
              ) : (
                <>
                  {cart.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell align="right">{"$" + p.price}</TableCell>
                      <TableCell align="right">{p.quantity}</TableCell>
                      <TableCell align="right">
                        {p.price * p.quantity}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleProductDelete(p._id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
              <TableRow>
                <TableCell rowSpan={1} />
                <TableCell
                  align="right"
                  colSpan={3}
                  sx={{ fontWeight: "bold" }}
                >
                  {"$" + cartTotal.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          textAlign="right"
          sx={{ my: 2 }}
        >
          Checkout
        </Button>
      </Container>
    </>
  );
};

export default CartPage;
