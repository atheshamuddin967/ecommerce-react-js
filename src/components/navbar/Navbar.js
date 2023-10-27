import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";
export default function Navbar({ setCartOpen }) {
  const { user, signOutUser } = useAuth();

  const { quantityOfCart } = useOrder();

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            SyncViz
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="ABout">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Shop">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Contact">
                  Contact
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/Orders">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <button className="showcart nav-link" onClick={signOutUser}>
                    Sign Out{" "}
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </button>
                ) : (
                  <Link className="showcart nav-link" to="/singin">
                    Login <i className="fa fa-user-o" aria-hidden="true"></i>
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <button
                  className="showcart nav-link"
                  onClick={() => setCartOpen(true)}
                >
                  {" "}
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  <span>{quantityOfCart}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
