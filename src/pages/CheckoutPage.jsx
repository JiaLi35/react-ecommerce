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
  Grid,
  TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import validator from "email-validator";
import { toast } from "sonner";
import Header from "../components/Header";
import { getCart } from "../utils/cart";
import { createOrder } from "../utils/api_orders";
import { useCookies } from "react-cookie";

const CheckoutPage = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "", email = "", name = "" } = currentuser;
  // 3. load the cart data from local storage
  // 4. create a state to store the cart data from local storage
  const [cart, setCart] = useState(getCart());
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const getCartTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.quantity * product.price;
    });
    return total.toFixed(2);
  };

  const handleCheckout = async () => {
    // 1. make sure the name and email fields is not empty
    if (!name || !email) {
      toast.error("Please fill up all the fields");
    } else if (!validator.validate(email)) {
      // 2. make sure the email is valid
      toast.error("Please use a valid email address");
    } else {
      // 3. do checkout
      try {
        // open loading backdrop
        setLoading(true);
        // 3.1 get total price
        const totalPrice = getCartTotal();
        // 3.2 create order
        const response = await createOrder(name, email, cart, totalPrice);
        // 3.3 get the billplz url from the response
        const billplz_url = response.billplz_url;
        // 3.4 redirect the user to billplz payment page
        window.location.href = billplz_url;
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        // close the loading backdrop
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header title="Checkout" current="checkout" />
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography variant="h5">Contact Information</Typography>
            <Box mb={2}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                // onChange={(event) => setName(event.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                // onChange={(event) => setEmail(event.target.value)}
              />
            </Box>
            <Box mb={2}>
              <Button variant="contained" fullWidth onClick={handleCheckout}>
                Pay ${getCartTotal()}
              </Button>
            </Box>
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography variant="h5">Order Summary</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Total</TableCell>
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
                          <TableCell align="right">
                            ${(p.price * p.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                  <TableRow>
                    <TableCell colSpan={1} />
                    <TableCell align="right">${getCartTotal()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CheckoutPage;
