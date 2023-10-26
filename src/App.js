import "./App.css";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Shop from "./components/shop/Shop";
import Cart from "./components/cart/Cart";
import SingleProduct from "./components/shop/SingleProduct";
import Singin from "./components/singin/Singin";
import Singup from "./components/singin/Singup";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./components/firebase/Firebase";
import { useAuth } from "./components/context/AuthContext";
import Footer from "./components/footer/Footer";
import Orders from "./components/order/Orders";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  // const [itemAlreadyInCart, setItemAlreadyInCart] = useState("");
  // const [showItemInCartMessage, setShowItemInCartMessage] = useState(false);
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await auth.signOutUser();

      // navigate("/"); // Redirect to the home page or any desired route after sign-out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <>
      {" "}
      <Router>
        <Navbar
          setCartOpen={setCartOpen}
          user={user}
          handleSignOut={handleSignOut}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />

          <Route path="/Shop" element={<Shop />} />
          <Route path="/Contact" element={<Contact />} />
          <Route
            path="/SingleProduct/:id"
            element={
              <SingleProduct
              // setItemAlreadyInCart={setItemAlreadyInCart}
              // itemAlreadyInCart={itemAlreadyInCart}
              // showItemInCartMessage={showItemInCartMessage}
              // setShowItemInCartMessage={setShowItemInCartMessage}
              />
            }
          />

          <Route path="/Singin" element={<Singin />} />
          <Route path="/Singup" element={<Singup />} />
          <Route path="/Orders" element={<Orders />} />
        </Routes>
      </Router>
      <Cart setCartOpen={setCartOpen} cartOpen={cartOpen} />
      <Footer />
    </>
  );
}

export default App;
