import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager"
import "./Login.css";

export const Login = ({ setToken }) => {
    const username = useRef();
    const password = useRef();
    const existDialog = useRef();
    const navigate = useNavigate();
    const [isUnsuccessful, setIsUnsuccessful] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault()
    
        const user = {
          username: username.current.value,
          password: password.current.value
        }
    
        loginUser(user)
            .then(res => {
                if ("token" in res && res.token) {
                    setToken(res.token);
                    console.log("Token received:", res.token);
                    navigate("/");
                } else {
                    setIsUnsuccessful(true);
                }
            })
            .catch(error => {
                console.error("Error logging in:", error);
            });
    };


    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="text-4xl mt-7 mb-3">Community Pets</h1>
                    <h2 className="text-xl mb-10">Please sign in</h2>
                    <fieldset className="mb-4">
                        <label htmlFor="inputEmail"> UserName </label>
                        <input type="text" id="inputEmail"
                            ref={username}
                            className="form-control"
                            placeholder="User Name"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password" id="inputPassword"
                            ref={password}
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="button p-3 rounded-md bg-blue-800 text-blue-100">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <div className="loginLinks">
                <section className="link--register">
                    <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/register">Not a member yet?</Link>
                </section>
            </div>
        </main>
    );
};
