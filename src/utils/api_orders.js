import axios from "axios";
import { API_URL } from "./constants";

export const getOrders = async () => {
  const response = await axios.get(API_URL + "orders");
  return response.data;
};

export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice
) => {
  const response = await axios.post(API_URL + "orders", {
    customerName: customerName,
    customerEmail: customerEmail,
    products: products,
    totalPrice: totalPrice,
  });
  return response.data;
};
