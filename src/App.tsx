import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

const Home = lazy(() => import("./routes/Home")); // Lazy ładowanie komponentu
const MovieDetails = lazy(() => import("./routes/MovieDetails")); // Lazy ładowanie komponentu
const Search = lazy(() => import("./routes/Search")); // Lazy ładowanie komponentu
const ErrorPage = lazy(() => import("./routes/ErrorPage")); // Lazy ładowanie komponentu
const Contact = lazy(() => import("./routes/Contact")); // Lazy ładowanie komponentu
const Register = lazy(() => import("./routes/Register")); // Lazy ładowanie komponentu
const Login = lazy(() => import("./routes/Login")); // Lazy ładowanie komponentu
const Dashboard = lazy(() => import("./routes/Dashboard")); // Lazy ładowanie komponentu

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
