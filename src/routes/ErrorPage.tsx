import { Link } from "react-router-dom";
import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="h-screen bg-gray-950 items-center flex flex-col justify-center text-white text-4xl md:text-6xl space-y-6 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-400">
        Not Found
      </h1>
      <Link to="/">
        <button className="bg-indigo-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-indigo-600 transition duration-300 text-lg mt-4">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
