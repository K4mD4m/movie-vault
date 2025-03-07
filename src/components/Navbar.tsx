import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Stan do obsługi hamburger menu

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl lg:text-4xl font-extrabold text-indigo-400 hover:text-indigo-500 transition duration-300 flex items-center"
        >
          🎬 <span className="ml-2">MovieVault</span>
        </Link>

        {/* Menu dla desktopu */}
        <div className="hidden md:flex space-x-6 ml-auto mr-6">
          <Link
            to="/"
            className="hover:text-indigo-400 text-2xl transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="hover:text-indigo-400 text-2xl transition duration-300"
          >
            Search
          </Link>
          <Link
            to="/contact"
            className="hover:text-indigo-400 text-2xl transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Hamburger menu dla mobilnych urządzeń */}
        <button
          className={`text-white focus:outline-none transform transition-all duration-300 md:hidden mt-1 ${
            menuOpen ? "rotate-180" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div
            className={`w-7 h-1 bg-white mb-1 transition-all duration-300 rounded-4xl ${
              menuOpen ? "transform rotate-45 translate-y-2" : ""
            }`}
          />
          <div
            className={`w-7 h-1 bg-white mb-1 transition-all duration-300 rounded-4xl ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <div
            className={`w-7 h-1 bg-white mb-1 transition-all duration-300 rounded-4xl ${
              menuOpen ? "transform -rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobilne menu */}
      <div
        className={`absolute top-16 right-0 w-full bg-gray-800 rounded-lg p-4 z-50 transform origin-top-right transition-all duration-300 ${
          menuOpen
            ? "scale-100 opacity-100 translate-x-0 translate-y-0"
            : "scale-0 opacity-0 translate-x-5 -translate-y-5"
        }`}
      >
        <Link
          to="/"
          className="block text-center p-3 rounded-lg hover:bg-indigo-500 transition duration-300 text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/search"
          className="block text-center p-3 rounded-lg hover:bg-indigo-500 transition duration-300 text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          Search
        </Link>
        <Link
          to="/contact"
          className="block text-center p-3 rounded-lg hover:bg-indigo-500 transition duration-300 text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
