import Header from "../components/Header";
import { Container } from "@mui/material";

const OrdersPage = () => {
  return (
    <>
      <Header current="orders" title="My Orders" />
      <Container maxWidth="lg">Orders Page</Container>
    </>
  );
};

export default OrdersPage;
