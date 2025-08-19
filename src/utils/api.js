import axios from "axios";

const API_URL = "http://localhost:5125/products";

export async function getProducts(category) {
  const response = await axios.get(
    API_URL + "?category=" + (category === "all" ? "" : category)
  );
  return response.data;
}
