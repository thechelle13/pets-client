import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import { registerUser } from "../../managers/AuthManager";

export const Register = ({ setToken }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const bio = useRef();
  const city = useRef()
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email: email.current.value,
      password: password.current.value,
      username: username.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      bio: bio.current.value,
      city: city.current.value,
    };

    registerUser(newUser)
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("pet_token", JSON.stringify(authInfo.token));
          console.log("Token stored:", authInfo.token);
          navigate("/");
        } else {
          passwordDialog.current.showModal();
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={passwordDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => passwordDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleRegister}>
          <h1 className="text-4xl mt-7 mb-3">Community Pets</h1>
          <h2 className="text-xl mb-10">Register new account</h2>
         
          <fieldset className="mb-4">
            <label htmlFor="firstName"> First name </label>
            <input
              type="text"
              id="firstName"
              ref={firstName}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="lastName"> Last name </label>
            <input
              type="text"
              id="lastName"
              ref={lastName}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="username"> UserName </label>
                        <input
              type="text"
              id="userName"
              ref={username}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
                    </fieldset>
                    
                   
                    <fieldset className="mb-4">
                        <label htmlFor="city"> City </label>
                        <input
              type="text"
              id="ciyy"
              ref={city}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="bio"> Short Bio </label>
                        <input
              type="text"
              id="bio"
              ref={bio}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputEmail"> Email address </label>
                        <input
              type="text"
              id="inputEmail"
              ref={email}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputPassword"> Password </label>
                        <input
              type="text"
              id="inputPassword"
              ref={password}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputPassword"> Verify Password </label>
                        <input
              type="text"
              id="inputPassword"
              ref={verifyPassword}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
                    </fieldset>
           
          <fieldset>
            <button
              type="submit"
              className="button p-3 rounded-md bg-blue-800 text-blue-100"
            >
              Register
            </button>
          </fieldset>
        </form>
      </section>
      <div className="loginLinks">
        <section className="link--register">
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-800"
            to="/login"
          >
            Already have an account?
          </Link>
        </section>
      </div>
    </main>
  );
};
