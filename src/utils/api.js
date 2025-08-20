import axios from "axios";

const API_URL = "http://localhost:5125/";

export async function getProducts(category, page = 1) {
  const response = await axios.get(
    API_URL +
      "products?page=" +
      page +
      (category === "all" ? "" : "&category=" + category)
  );
  // http:localhost:5125/products?page=1&category=Games
  return response.data;
}

export function getProduct() {}

export async function addProduct(name, description, price, category) {
  const response = await axios.post(API_URL + "products", {
    name: name,
    description: description,
    price: price,
    category: category,
  });
  return response.data;
}

export function updateProduct() {}

export function deleteProduct() {}
