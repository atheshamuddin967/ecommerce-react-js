import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Singup() {
  const navigate = useNavigate();
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [disable, SetDisable] = useState(false);
  const { signIn } = useAuth();
  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...User, [name]: value });
  };

  const postData = (e) => {
    const { email, password } = User;
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill all requirements");
      return;
    }
    setErrorMsg("");
    SetDisable(true);
    // signInWithEmailAndPassword(auth, email, password)
    //   .then(async (res) => {
    //     SetDisable(false);

    //     // console.log(user);
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     SetDisable(false);
    //     setErrorMsg(err.message);
    //   });
    signIn(email, password, navigate, SetDisable, setErrorMsg);
  };
  console.log(User);
  return (
    <div>
      <div className="login-layout">
        <div className="login-Form">
          <h4>Sing-up</h4>

          <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                value={User.email}
                onChange={getUserData}
              />
              {/* <div id="emailHelp" className="form-text"></div> */}
            </div>
            <div className="mb-3">
              <label htmlForfor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={getUserData}
                name="password"
                value={User.password}
              />
            </div>

            <button
              type="submit"
              className="btn login-btn"
              onClick={postData}
              disabled={disable}
            >
              Login
            </button>
          </form>
          <p>{errorMsg}</p>
          <div className="singup-singin">
            Dont ave account?
            <span>
              <Link to="/Singin">Singin</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
