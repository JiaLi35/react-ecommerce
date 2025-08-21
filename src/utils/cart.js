import { toast } from "sonner";
import Swal from "sweetalert2";

// add product to cart
export function AddToCart(product) {
  try {
    // 3. load the cart data from local storage
    const cartLocalStorage = localStorage.getItem("cartlist");
    // 4. create a state to store the cart data from local storage
    const cart = cartLocalStorage ? JSON.parse(cartLocalStorage) : [];
    // check if product already exists
    const existingProduct = cart.find((p) => p._id === product._id);

    if (existingProduct) {
      // just update that product’s quantity
      existingProduct.quantity += 1;
    } else {
      // add new product with quantity 1
      cart.push({ ...product, quantity: 1 });
    }
    // 8. update the notes in local storage
    localStorage.setItem("cartlist", JSON.stringify(cart));
    // 9. show success message
    toast.success("New item added to cart");
  } catch (error) {
    toast.error(error.message);
  }
}

// get all the items in the cart
export function getCart() {}

// update the cart to local storage
export function updateCart(cart) {}

// delete item from the cart
export function deleteItemFromCart(id) {
  // 3. load the cart data from local storage
  const cartLocalStorage = localStorage.getItem("cartlist");
  // 4. create a state to store the cart data from local storage
  const cart = cartLocalStorage ? JSON.parse(cartLocalStorage) : [];
  const updatedCartList = cart.filter((c) => {
    if (c._id !== id) {
      return true;
    }
    return false;
  });
  localStorage.setItem("cartlist", JSON.stringify(updatedCartList));
  toast.success("Item has been deleted from your cart");
  return updatedCartList;
}
