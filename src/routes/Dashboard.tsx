import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getAllUserRatings } from "../firebase/firestore";
import { auth } from "../firebase/config";

interface RatedMovie {
  movieId: number;
  rating: number;
  title: string;
  poster_path: string;
}

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<RatedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#1e1e2f", py: 6 }}>
      <Container maxWidth="lg">
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
          Your Recently Rated Movies
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
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.movieId}>
                <Card
                  sx={{
                    backgroundColor: "#2a2a3d",
                    borderRadius: 3,
                    boxShadow: 4,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="260"
                    image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "white", fontWeight: 600 }}
                    >
                      {movie.title}
                    </Typography>
                    <Typography sx={{ color: "#bbb" }}>
                      Your Rating: {movie.rating}/10
                    </Typography>

                    <Box mt={2}>
                      <Link
                        to={`/movie/${movie.movieId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Box
                          sx={{
                            backgroundColor: "rgb(97, 95, 255)",
                            color: "white",
                            fontWeight: "bold",
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            textAlign: "center",
                            transition: "background-color 0.3s",
                            "&:hover": {
                              backgroundColor: "rgba(75, 0, 130, 0.8)",
                            },
                          }}
                        >
                          View Details
                        </Box>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
