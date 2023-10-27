import React from "react";
import "./Contact.css";
export default function Contact() {
  return (
    <div>
      <section className="space22" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="contact">
                <h6>Contact us</h6>
                <h1>If You have any querry feel free to contact us</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
                  impedit suscipit optio asperiores eligendi? Molestiae soluta
                  earum dolorum ducimus, veniam voluptatibus temporibus error
                  vel perferendis ullam omnis delectus quae ipsa!
                </p>
                <ul>
                  <li>
                    <h4>Address</h4>{" "}
                    <a href="/">4117 Leroy LaneHarold, KY 41635,</a>
                  </li>
                  <li>
                    <h4>Contact Number</h4>{" "}
                    <a href="tel:+92300001111">+92300001111</a>
                  </li>
                  <li>
                    <h4>Email</h4>
                    <a href="mailto:abc@email.com">Mailto:abc@email.com</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <form id="myform" name="myform" action="">
                <div className="row">
                  <div className="col-6">
                    {/* <!-- <label for="name">Name</label> --> */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      id="name"
                      name="name"
                    />
                  </div>
                  <div className="col-6">
                    {/* <!-- <label for="email"> Email</label> --> */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      id="email"
                      name="email"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {/* <!-- <label for="number">Phone No</label> --> */}
                    <input
                      type="text"
                      name="number"
                      id="number"
                      className="form-control"
                      placeholder="Your Number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {/* <!-- <label for="Message" className="form-label">Message</label> --> */}
                    <textarea
                      className="form-control"
                      id="Message"
                      rows="4"
                      placeholder="Type your mesage here"
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 pt-4">
                    <button className="form-control btn" type="submit">
                      submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
