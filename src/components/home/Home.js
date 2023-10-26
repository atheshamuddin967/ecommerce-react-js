import React from "react";
import "./Home.css";

export default function Home({ name }) {
  return (
    <div>
      {/* <p>welcome {name}</p> */}
      <section className=" free" id="home">
        <div className="container">
          <div className="row pt-4">
            <div className="col-sm-6 pt-4">
              <div className="easy-to-use">
                <h6>Free Forever For All Users.</h6>
                <h1>Easy-to-use Point of Sale</h1>
                <p>
                  You may start selling in a matter of minutes and easy to use.
                  Appropriate for all devices.
                </p>
                <div className="free-trail pt-4">
                  <a href="#">Start Free Trail</a>
                </div>
              </div>
            </div>

            {/* <!-- image coding --> */}
            <div className="col-sm-6">
              <div className="img1">
                <img src="images/image1.png" alt="" srcset="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="invent space22">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="inventory-headings">
                <h6>Office & inventory</h6>
                <h1>Our best inventory</h1>
              </div>
            </div>
          </div>

          <div className="row  pt-4">
            <div className="col-md-3 col-sm-6 pt-4">
              <div className="inventory  ">
                <div className="sr">01</div>
                <div className="icons">
                  <i className="fa-solid fa-book"></i>
                </div>
                <h4>Recipe management & costing</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and formal
                  typesetting
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 ">
              <div className="inventory ">
                <div className="sr">02</div>
                <div className="icons">
                  <i className="fas fa-chart-area"></i>
                </div>
                <h4>Stock management & inventory</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and formal
                  typesetting
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 pt-4">
              <div className="inventory ">
                <div className="sr">03</div>
                <div className="icons">
                  <i className="fas fa-money-check-alt"></i>
                </div>
                <h4>Purchase management system</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and formal
                  typesetting
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="inventory  ">
                <div className="sr">04</div>
                <div className="icons">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </div>
                <h4>Powerful inventory reporting</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and formal
                  typesetting
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
