import Header from "../components/Header";
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
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { getOrders, updateOrder, deleteOrder } from "../utils/api_orders";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";

const OrdersPage = () => {
  // store orders data from API
  const [orders, setOrders] = useState([]);

  // Call the API
  useEffect(() => {
    getOrders()
      .then((data) => {
        // putting the data into orders state
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call only once when the page loads

  const handleOrderDelete = async (id) => {
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
        await deleteOrder(id);
        // method #1: remove from the state manually
        // delete the product from the state
        // setProducts(products.filter((p) => p._id !== id));

        // method #2: get the new data from the backend
        const updatedOrders = await getOrders();
        setOrders(updatedOrders);
        toast.success("Order has been deleted");
      }
    });
  };

  return (
    <>
      <Header current="orders" title="My Orders" />
      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length === 0 ? (
                <>
                  <Typography variant="h6" sx={{ m: 1 }}>
                    No Orders Made Yet
                  </Typography>
                </>
              ) : (
                <>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>
                        {order.customerName} <br /> ({order.customerEmail})
                      </TableCell>
                      <TableCell>
                        {order.products.map((p) => (
                          <Box>{p.name}</Box>
                        ))}
                      </TableCell>
                      <TableCell>{"$" + order.totalPrice}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={order.status}
                          onChange={async (e) => {
                            await updateOrder(order._id, e.target.value);
                          }}
                          disabled={order.status === "pending" ? true : false}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="failed">Failed</MenuItem>
                          <MenuItem value="completed">Completed</MenuItem>
                          <MenuItem value="paid">Paid</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>{order.paid_at}</TableCell>
                      <TableCell>
                        {order.status === "pending" ? (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              handleOrderDelete(order._id);
                            }}
                          >
                            Delete
                          </Button>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default OrdersPage;
