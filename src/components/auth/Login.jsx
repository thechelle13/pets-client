import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";
import "./Login.css";

export const Login = ({ setToken }) => {
    const username = useRef();
    const password = useRef();
    const existDialog = useRef();
    const navigate = useNavigate();
    const [isUnsuccessful, setIsUnsuccessful] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        const user = {
            username: username.current.value,
            password: password.current.value
        };

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
        <div className="bg-gradient-to-b from-blue-500 to-purple-500 min-h-screen flex flex-col items-center justify-center p-4"> {/* Added padding for mobile */}
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <div className="w-full max-w-sm"> {/* Responsive max width */}
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="text-3xl sm:text-4xl mt-10 mb-3 text-center">Community Pets</h1> {/* Responsive text size */}
                    <h2 className="text-lg sm:text-xl mb-8 text-center">Please sign in</h2> {/* Responsive text size */}
                    <fieldset className="mb-4">
                        <label htmlFor="inputEmail" className="block text-sm"> UserName </label> {/* Added block for better spacing */}
                        <input type="text" id="inputEmail"
                            ref={username}
                            className="form-control w-full p-2 border rounded"
                            placeholder="User Name"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputPassword" className="block text-sm"> Password </label> {/* Added block for better spacing */}
                        <input type="password" id="inputPassword"
                            ref={password}
                            className="form-control w-full p-2 border rounded"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="button p-3 rounded-md bg-blue-800 text-blue-100 w-full">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </div>
            <div className="loginLinks mt-5 text-center">
                <section className="link--register">
                    <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/register">
                        Not a member yet?
                    </Link>
                </section>
            </div>
        </div>
    );
};
