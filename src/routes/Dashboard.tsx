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

interface Movie {
  id: number;
  title: string;
  rating: number;
  poster: string;
}

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        const fetchedMovies = [
          {
            id: 27205,
            title: "Inception",
            rating: 9,
            poster:
              "https://image.tmdb.org/t/p/w300/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
          },
          {
            id: 157336,
            title: "Interstellar",
            rating: 8.5,
            poster:
              "https://image.tmdb.org/t/p/w300/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
          },
          {
            id: 155,
            title: "The Dark Knight",
            rating: 9.5,
            poster:
              "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          },
        ];
        setMovies(fetchedMovies);
        setLoading(false);
      } catch (err) {
        setError("Failed to load movies.");
        setLoading(false);
      }
    }, 2000);
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

        {!loading && !error && (
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
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
                    image={movie.poster}
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
                      Rating: {movie.rating}/10
                    </Typography>

                    <Box mt={2}>
                      <Link
                        to={`/movie/${movie.id}`}
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
