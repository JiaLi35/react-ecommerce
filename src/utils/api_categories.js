import axios from "axios";
import { API_URL } from "./constants";

export const getCategories = async () => {
  const response = await axios.get(API_URL + "categories");
  return response.data;
};

export const getCategory = async (id) => {
  const response = await axios.get(API_URL + "categories/" + id);
  return response.data;
};

export const addCategory = async (label) => {
  const response = await axios.post(API_URL + "categories", {
    label: label,
  });
  return response.data;
};

export const updateCategory = async (id, label) => {
  const response = await axios.put(API_URL + "categories/" + id, {
    label: label,
  });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(API_URL + "categories/" + id);
  return response.data;
};
