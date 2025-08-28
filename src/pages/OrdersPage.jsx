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
import CircularProgress from "@mui/material/CircularProgress";
import { getOrders, updateOrder, deleteOrder } from "../utils/api_orders";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";

const OrdersPage = () => {
  // store orders data from API
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleOrderStatusUpdate = async (id, newStatus) => {
    setLoading(true);
    await updateOrder(id, newStatus);
    const updatedOrders = await getOrders();
    setOrders(updatedOrders);
    toast.success("Order status has been updated");
    setLoading(false);
  };

  const handleOrderDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the order
      if (result.isConfirmed) {
        // delete order in the backend
        await deleteOrder(id);
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
                          <Box key={p._id}>{p.name}</Box>
                        ))}
                      </TableCell>
                      <TableCell>{"$" + order.totalPrice}</TableCell>
                      <TableCell>
                        {loading ? (
                          <CircularProgress color="inherit" />
                        ) : (
                          <Select
                            defaultValue={order.status}
                            onChange={(e) => {
                              handleOrderStatusUpdate(
                                order._id,
                                e.target.value
                              );
                            }}
                            disabled={order.status === "pending" ? true : false}
                          >
                            <MenuItem value="pending" disabled>
                              Pending
                            </MenuItem>
                            <MenuItem value="failed">Failed</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="paid">Paid</MenuItem>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell>{order.paid_at}</TableCell>
                      <TableCell>
                        {order.status === "pending" && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              handleOrderDelete(order._id);
                            }}
                          >
                            Delete
                          </Button>
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
