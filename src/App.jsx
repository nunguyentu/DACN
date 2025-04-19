import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';// có sd bootrap
import Example from './components/Payments/ExampleModal'; // Đường dẫn đến file ExampleModal.jsx


import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Products from "./data/Products";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetail from "./components/Products/ProductDetail";
import Cart from "./components/Cart/Cart";
import Carts from "./data/Carts";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Users from "./components/Users";
import Product from "./components/Products/Product";
import PrivacyPolicy from "./components/PrivacyPolicys/PrivacyPolicy";
import Payment from "./components/Payments/payment";

import About from "./components/Abouts/About";
import Review from "./components/Reviews/Review";

import Contact from "./components/Contacts/Contact";
import ProductSP from "./components/Products/ProductSP";
import LichSuHinhThanh from "./components/Abouts/LichSuHinhThanh";
import SuMenh from "./components/Abouts/SuMenh";
import DoiNgu from "./components/Abouts/DoiNgu";
import ThanhToan from "./components/Payments/payment";
import CheckPayment from "./components/Payments/checkpayment";


// import CustomerPage from "./components/CustomerPage";

function App() {
  const [products, setProducts] = useState(Products);

  const [cart, setCart] = useState(Carts);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  const addToCart = (product, value) => {
    console.log(product);
    const cartItem = cart.find((item) => item.id == product.id);
    if (cartItem) {
      setCart(
        cart.map((item) =>
          item.id == product.id
            ? { ...item, quantity: (item.quantity += value) }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: parseInt(value) }]);
    }
  };

  const isAuth = localStorage.getItem("isAuthenticated");
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Layout cart={cart} />}>
              <Route
                path="/"
                element={<Home products={products} addToCart={addToCart} />}
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="login"
                element={
                  <Login
                    setIsAuthenticated={setIsAuthenticated}
                    setUserType={setUserType}
                  />
                }
              />

              <Route
                path="dashboard"
                element={
                  isAuth && isLogin?.role === "admin" ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/Login" />
                  )
                }
              >
                <Route path="user" element={<Users />} />
                <Route
                  path="product"
                  element={
                    <Product products={products} setProducts={setProducts} />
                  }
                />
              </Route>

              <Route
                path="product/:id"
                element={
                  <ProductDetail products={products} addToCart={addToCart} />
                }
              />
              <Route
                path="cart"
                element={<Cart cart={cart} setCart={setCart} />}
              />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/" element={<Home />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<ProductSP />} />
              <Route path="/review" element={<Review />} />
              <Route path="/about/lichsuhinhthanh" element={<LichSuHinhThanh />}/>
              <Route path="/about/sumenh" element={<SuMenh />}/>
              <Route path="/about/doingu" element={<DoiNgu />}/>
              <Route path="/payments/thanhtoan" element={<ThanhToan />}/>
              <Route path="/check-payment" element={<CheckPayment />} />
             
            </Route>
            
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
