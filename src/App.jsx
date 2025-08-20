import { BrowserRouter, Routes, Route } from "react-router";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/new" element={<ProductAdd />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
