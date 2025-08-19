import { BrowserRouter, Routes, Route } from "react-router";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
