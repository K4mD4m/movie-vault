import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Rating, Typography, Button } from "@mui/material";
import {
  saveUserRating,
  getUserRating,
  deleteUserRating,
} from "../firebase/firestore";
import { AuthContext } from "../context/AuthContext";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the movie ID from the URL parameters
  const navigate = useNavigate(); // Hook to navigate between routes
  const [movie, setMovie] = useState<Movie | null>(null); // State to store movie details
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string>(""); // State to manage error messages
  const [userRating, setUserRating] = useState<number | null>(null); // State to store user rating
  const [hoverRating, setHoverRating] = useState<number>(-1); // State to manage hover rating

  const { user } = useContext(AuthContext); // Get the user from the context

  // Function to handle back navigation
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const movieData: Movie = await response.json();
        setMovie(movieData);

        if (user && movieData?.id) {
          const userRatingData = await getUserRating(user.uid, movieData.id);
          if (userRatingData?.rating) {
            setUserRating(userRatingData.rating);
          }
        }
      } catch (err) {
        setError("Something went wrong while fetching movie details.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, user]);

  // Function to save user rating to Firestore
  useEffect(() => {
    const saveRating = async () => {
      if (user && movie && userRating !== null) {
        await saveUserRating(user.uid, movie.id, userRating);
      }
    };
    saveRating();
  }, [userRating, movie, user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-black text-center text-xl p-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-400 hover:text-indigo-300 transition mb-6 text-lg font-semibold cursor-pointer"
        >
          <ArrowLeft className="mr-2" /> Back to previous page
        </button>
      </div>

      {movie && (
        <div className="w-full max-w-4xl bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6 backdrop-blur-md">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-indigo-400">
              {movie.title}
            </h1>
            <p className="text-lg text-gray-300 mt-4 leading-relaxed">
              {movie.overview}
            </p>
            <div className="mt-6 space-y-3">
              <p className="text-lg">
                <span className="font-bold text-indigo-300">Release Date:</span>{" "}
                {movie.release_date}
              </p>
              <p className="text-lg">
                <span className="font-bold text-indigo-300">Rating:</span>{" "}
                <span className="text-yellow-400 font-bold text-xl">
                  {movie.vote_average.toFixed(1)} / 10
                </span>
              </p>
              <p className="text-lg">
                <span className="font-bold text-indigo-300">Genres:</span>{" "}
                {movie.genres.map((g) => g.name).join(", ")}
              </p>

              {user ? (
                <>
                  <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                    Rate this movie:
                  </Typography>

                  <Rating
                    name="custom-rating"
                    value={userRating}
                    onChange={(_, newValue) => {
                      setUserRating(newValue);
                      setHoverRating(-1);
                    }}
                    onChangeActive={(_, newHover) => setHoverRating(newHover)}
                    max={10}
                    sx={{
                      color: "gold",
                      "& .MuiRating-iconEmpty": { color: "#555" },
                    }}
                  />

                  <div
                    style={{
                      height: "32px",
                      marginTop: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: hoverRating !== -1 ? "flex" : "none",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "#bbb" }}>
                        Your rating: {hoverRating} / 10
                      </Typography>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display:
                          hoverRating === -1 && userRating !== null
                            ? "flex"
                            : "none",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "#bbb" }}>
                        You rated this movie: {userRating} / 10
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        onClick={async () => {
                          if (user && movie) {
                            await deleteUserRating(user.uid, movie.id);
                            setUserRating(null);
                          }
                        }}
                        sx={{
                          color: "#888",
                          textTransform: "none",
                          fontSize: "0.8rem",
                          minWidth: 0,
                          padding: 0,
                          "&:hover": {
                            color: "#ccc",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Clear Rating
                      </Button>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display:
                          hoverRating === -1 && userRating === null
                            ? "flex"
                            : "none",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "#bbb" }}>
                        Click a star to rate.
                      </Typography>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                    Rate this movie:
                  </Typography>

                  <Rating
                    name="custom-rating"
                    value={userRating}
                    onChange={(_, newValue) => setUserRating(newValue)}
                    onChangeActive={(_, newHover) => setHoverRating(newHover)}
                    max={10}
                    sx={{
                      color: "gold",
                      "& .MuiRating-iconEmpty": { color: "#555" },
                    }}
                    readOnly
                  />

                  <Typography variant="body1" sx={{ color: "#bbb" }}>
                    Please log in to rate this movie.
                  </Typography>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
