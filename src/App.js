import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import LandingPage from "./pages/LandingPage";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
