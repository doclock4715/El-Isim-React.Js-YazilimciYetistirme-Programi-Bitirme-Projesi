import Login from "./pages/login/Login.js"
import Home from "./pages/home/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUp from "./pages/signUp/SignUp.js";
import AddProduct from "./pages/addProduct/AddProduct.js";
import Cart from "./pages/cart/Cart.js"
import MyProducts from "./pages/myProducts/MyProducts.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myProducts" element={<MyProducts />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
