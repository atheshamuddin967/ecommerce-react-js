import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <div>
      <footer className="space2">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 col-6">
              <div className="logo">
                <h2>SyncViz</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  itaque consequuntur pariatur facere enim repellat?
                </p>
                <ul>
                  <li>
                    <a href="#">
                      <img src="images/insta.png" alt="" srcset="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/fb_03.png" alt="" srcset="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/tw_01.png" alt="" srcset="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="pos-com">
                <h4>Avilable POS</h4>
                <ul>
                  <li>
                    <a href="#">Food Delivery</a>
                  </li>
                  <li>
                    <a href="#">Furniture Store</a>
                  </li>
                  <li>
                    <a href="#">Coffee Shop</a>
                  </li>
                  <li>
                    <a href="#">Clothing Store</a>
                  </li>
                  <li>
                    <a href="#">eCommerce</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3 col-6 d-res">
              <div className="pos-com">
                <h4>Company</h4>
                <ul>
                  <li>
                    <a href="#">Features</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Privacy policy</a>
                  </li>
                  <li>
                    <a href="#">Tearms of use</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-3 col-6 d-res">
              <h4>Subscribe us</h4>
              <p>
                Get Business news, tip and solutions to your problems from our
                experts.
              </p>

              <div className="email">
                <input
                  type="email"
                  name=""
                  id=""
                  className="subs"
                  placeholder="Enter your email"
                />
                <button className="btn2">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col-sm-12">
              <div className="copy-right">
                <p> &copy; COPYRIGHTS 2023 | ALL RIGHTS RESERVED</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
