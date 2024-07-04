import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  return (
    <nav
      className="bg-gradient-to-b from-gray-700 to-black text-white fixed top-0 left-0 right-0 z-50 shadow-lg"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="flex items-center justify-between px-4 py-2 h-12">
        <Link to="/" className="text-2xl font-bold">Community Pets</Link>
        <button
          role="button"
          className="block md:hidden focus:outline-none"
          aria-label="menu"
          aria-expanded="false"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      <div
        className={`md:flex md:items-center md:justify-between w-full ${navbar.current && navbar.current.classList.contains('is-active') ? 'block' : 'hidden'}`}
        ref={navbar}
      >
        <div className="md:flex md:items-center md:justify-start md:space-x-8">
          {token && (
            <>
              <Link to="/" className="block md:inline-block py-2 px-4 hover:text-blue-400">Home</Link>
              <Link to="/postLists" className="block md:inline-block py-2 px-4 hover:text-blue-400">Posts</Link>
            </>
          )}
        </div>

        <div className="md:flex md:items-center md:space-x-4">
          {token ? (
            <button
              className="block md:inline-block py-2 px-4 border border-blue-400 rounded hover:bg-blue-400 hover:text-white transition"
              onClick={() => {
                setToken("");
                navigate("/login");
              }}
            >
              LOGOUT
            </button>
          ) : (
            <>
              <Link to="/register" className="block md:inline-block py-2 px-4 border border-blue-400 rounded hover:bg-blue-400 hover:text-white transition">Register</Link>
              <Link to="/login" className="block md:inline-block py-2 px-4 border border-blue-400 rounded hover:bg-blue-400 hover:text-white transition">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
