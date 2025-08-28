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
  Box,
} from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import { getCart, updateCart } from "../utils/cart";
import { Link } from "react-router";

const CartPage = () => {
  // 3. load the cart data from local storage
  // 4. create a state to store the cart data from local storage
  const [cart, setCart] = useState(getCart());

  const getCartTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.quantity * product.price;
    });
    return total.toFixed(2);
  };

  const removeItemFromCart = (product) => {
    // 1. remove product from cart
    const updatedCart = cart.filter((item) => item._id !== product._id);
    // 2. update the cart data in local storage and the state
    updateCart(updatedCart);
    // 3. update the state
    setCart(updatedCart);
  };

  return (
    <>
      <Header title="Cart" current="cart" />
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
                        ${(p.price * p.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => removeItemFromCart(p)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
              <TableRow>
                <TableCell colSpan={3} />
                <TableCell align="right">${getCartTotal()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ pt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
            // disable the checkout page if no item found in cart
            disabled={cart.length === 0 ? true : false}
          >
            Checkout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CartPage;
