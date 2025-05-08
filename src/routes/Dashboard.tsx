import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllUserRatings } from "../firebase/firestore";
import { auth } from "../firebase/config";
import { logout } from "../firebase/auth";
import MovieCard from "../components/MovieCard";

interface RatedMovie {
  movieId: number;
  rating: number;
  title: string;
  poster_path: string;
  overview: string;
}

const MOVIES_PER_PAGE = 10; // Number of movies to load initially and on scroll

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<RatedMovie[]>([]); // State to store rated movies
  const [visibleCount, setVisibleCount] = useState(MOVIES_PER_PAGE); // State to manage the number of visible movies
  const [sortOption, setSortOption] = useState<
    "default" | "topRated" | "alphabetical"
  >("default"); // State to manage sorting option
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const navigate = useNavigate(); // Hook to navigate between routes
  const loaderRef = useRef<HTMLDivElement | null>(null); // Ref to the loader element

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Effect to check if user is authenticated
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  // Effect to fetch rated movies from Firestore
  useEffect(() => {
    const fetchRatedMovies = async () => {
      if (!auth.currentUser) return;
      const userId = auth.currentUser.uid;

      try {
        const ratings = await getAllUserRatings(userId);

        if (ratings.length === 0) {
          setMovies([]);
          setLoading(false);
          return;
        }

        const ratedMovies = await Promise.all(
          ratings.map(async (r) => {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${r.movieId}?api_key=${
                import.meta.env.VITE_TMDB_API_KEY
              }&language=en-US`
            );
            if (!res.ok) throw new Error("Failed to fetch movie data");
            const data = await res.json();
            return {
              movieId: r.movieId,
              rating: r.rating,
              title: data.title,
              poster_path: data.poster_path,
              overview: data.overview,
            };
          })
        );

        setMovies(ratedMovies);
      } catch (err) {
        setError("Failed to load your rated movies. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatedMovies();
  }, []);

  // Effect to handle infinite scroll
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + MOVIES_PER_PAGE, movies.length)
          );
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [movies.length]);

  // Sort movies based on the selected option
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOption === "topRated") {
      return b.rating - a.rating;
    }
    if (sortOption === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#1e1e2f", py: 6 }}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#ff5c5c",
              "&:hover": { backgroundColor: "#e64545" },
              fontWeight: "bold",
            }}
          >
            Logout
          </Button>
        </Box>

        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
          }}
        >
          Welcome back 👋
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "#ccc",
            fontWeight: 500,
            mb: 3,
            textAlign: "center",
          }}
        >
          Your Recently Rated Movies:
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress sx={{ color: "#667eea" }} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && movies.length === 0 && (
          <Typography
            variant="h6"
            sx={{ color: "#aaa", textAlign: "center", mt: 4 }}
          >
            You haven&apos;t rated any movies yet.
          </Typography>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <Box display="flex" justifyContent="center" mb={3}>
              <ButtonGroup variant="outlined">
                <Button
                  variant={sortOption === "default" ? "contained" : "outlined"}
                  onClick={() => setSortOption("default")}
                >
                  Default
                </Button>
                <Button
                  variant={sortOption === "topRated" ? "contained" : "outlined"}
                  onClick={() => setSortOption("topRated")}
                >
                  Top Rated
                </Button>
                <Button
                  variant={
                    sortOption === "alphabetical" ? "contained" : "outlined"
                  }
                  onClick={() => setSortOption("alphabetical")}
                >
                  A-Z
                </Button>
              </ButtonGroup>
            </Box>

            <Grid container spacing={4} justifyContent="center">
              {sortedMovies.slice(0, visibleCount).map((movie) => (
                <Grid item xs={6} sm={6} md={2.4} key={movie.movieId}>
                  <MovieCard
                    id={movie.movieId}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    overview={movie.overview}
                  />
                </Grid>
              ))}
            </Grid>

            {visibleCount < movies.length && (
              <Box ref={loaderRef} mt={4} textAlign="center">
                <CircularProgress sx={{ color: "#667eea" }} />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
