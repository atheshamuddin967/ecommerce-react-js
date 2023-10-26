// import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from "./Firebase";
import { useAuth } from "../context/AuthContext";

export default function Singin() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [disable, SetDisable] = useState(false);

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...User, [name]: value });
  };

  const postData = (e) => {
    const { email, password, name } = User;
    e.preventDefault();
    if (!email || !password || !name) {
      setErrorMsg("Please fill all requirements");
      return;
    }
    setErrorMsg("");
    SetDisable(true);
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(async (res) => {
    //     SetDisable(false);
    //     const user = res.user;
    //     await updateProfile(user, {
    //       displayName: name,
    //     });
    //     // console.log(user);
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     SetDisable(false);
    //     setErrorMsg(err.message);
    //   });
    signUp(email, password, name, navigate, SetDisable, setErrorMsg);
  };
  // console.log(User);
  return (
    <div>
      <div className="login-layout">
        <div className="login-Form">
          {/* <button className="close-login " onClick={() => setLogin(false)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button> */}
          <h4>Sing-in</h4>

          <form method="POST">
            <div className="mb-3">
              <label htmlForfor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                name="name"
                placeholder="Enter Your Email Here"
                value={User.name}
                onChange={getUserData}
                required
              />
              {/* <div id="emailHelp" className="form-text"></div> */}
            </div>
            <div className="mb-3">
              <label htmlForfor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                placeholder="Enter Your Email Here"
                value={User.email}
                onChange={getUserData}
                required
              />
              {/* <div id="emailHelp" className="form-text"></div> */}
            </div>
            <div className="mb-3">
              <label htmlForfor="pasword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="Password"
                placeholder="Enter Your Password"
                name="password"
                value={User.password}
                onChange={getUserData}
                required
              />
            </div>
            <p className="error">{errorMsg}</p>
            <button
              type="submit"
              className="btn login-btn"
              onClick={postData}
              disabled={disable}
            >
              Login
            </button>
          </form>
          <div className="singup-singin">
            Already Have Account?
            <span>
              <Link to="/Singup">Singup</Link>
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
