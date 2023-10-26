import React from "react";
import "./About.css";
import Faq from "../faq/Faq";
export default function ABout() {
  return (
    <div>
      <section id="about" className="space22  abt">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="image3 ">
                <img src="images/image3.png" alt="" srcset="" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="about">
                <h6>About The POS</h6>
                <h1>Best solution for point of sale about details</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                  <br />
                  Lorem Ipsum the & been the industry's. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem
                  Ipsum passages.
                </p>
              </div>
              <div className="row">
                <div className="col-9">
                  <div className="about-li">
                    <ul>
                      <li>
                        <h4>Other point of sale information</h4>
                        <p>
                          But I must explain to you how all this mistaken in
                          denouncing pleasure and praising pain was born and I
                          will give.
                        </p>
                      </li>
                      <li>
                        <h4>Best process system POS</h4>
                        <p>
                          At vero eos et accusamus et iusto odio dignissimos
                          ducimus qui blanditiis praesentium voluptatum deleniti
                          at.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-3">
                  <div className="img2">
                    <img src="images/image2.png" alt="" srcset="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="feature" className="space22 section5">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="inventory-headings">
                <h6>POS Features</h6>
                <h1>Avilable Features</h1>
              </div>
            </div>
          </div>

          <div className="row pt-4">
            <div className=" col-md-4 col-sm-6">
              <div className="mt">
                <div className="features ">
                  <div className="icon-box2">
                    <i className="fab fa-cc-mastercard"></i>
                  </div>
                  <h4>Effortless Cards</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error, fuga amet consectetur adipisicing elit!
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-md-4 col-sm-6">
              <div className="mt">
                <div className="features ">
                  <div className="icon-box2">
                    <i className="fas fa-users-cog"></i>
                  </div>
                  <h4>Customization</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error, fuga amet consectetur adipisicing elit!
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-md-4 col-sm-6">
              <div className="mt">
                <div className="features ">
                  <div className="icon-box2">
                    <i className="fas fa-file-invoice"></i>
                  </div>
                  <h4>Software accuracy</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error, fuga amet consectetur adipisicing elit!
                  </p>
                </div>
              </div>
            </div>

            <div className=" col-md-4 col-sm-6">
              <div className="mt">
                <div className="features ">
                  <div className="icon-box2">
                    <i className="fas fa-user-edit"></i>
                  </div>
                  <h4>Costumer Data</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error, fuga amet consectetur adipisicing elit!
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-md-4 col-sm-6">
              <div className="mt">
                <div className="features ">
                  <div className="icon-box2">
                    <i className="fas fa-cart-plus"></i>
                  </div>
                  <h4>Seamless Checkout</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error, fuga amet consectetur adipisicing elit!
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-md-4 col-sm-6">
              <div className="mt">
                <div className="features ">
                  <div className="icon-box2">
                    <i className="fas fa-chalkboard-teacher"></i>
                  </div>
                  <h4>High speed process</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error, fuga amet consectetur adipisicing elit!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Faq />
    </div>
  );
}
