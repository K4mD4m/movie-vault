import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

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
  const { id } = useParams<{ id: string }>(); // Pobranie parametru z URL
  const navigate = useNavigate(); // Hook do nawigacji
  const [movie, setMovie] = useState<Movie | null>(null); // Stan do przechowywania danych filmu
  const [loading, setLoading] = useState<boolean>(true); // Stan ładowania
  const [error, setError] = useState<string>(""); // Stan błędu

  // Pobranie szczegółów filmu po załadowaniu komponentu
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          // Zapytanie do API TMDB o szczegóły filmu
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data: Movie = await response.json();
        setMovie(data);
      } catch (err) {
        setError("Something went wrong while fetching movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0); // Ustawienie przewijania na górę strony (naprawiony błąd z przewijaniem do dołu)
  }, []);

  // Zwracamy spinner jeśli strona jest w stanie ładowania
  if (loading) return <LoadingSpinner />;

  // Zwracamy komunikat o błędzie jeśli wystąpił
  if (error) {
    return (
      <div className="min-h-screen bg-black text-center text-xl p-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 px-4">
      {/* Przycisk powrotu */}
      <div className="w-full max-w-4xl">
        <button
          onClick={() => navigate(-1)} // Powrót do poprzedniej strony
          className="flex items-center text-indigo-400 hover:text-indigo-300 transition mb-6 text-lg font-semibold cursor-pointer"
        >
          <ArrowLeft className="mr-2" /> Back to previous page
        </button>
      </div>

      {/* Blok z filmem */}
      {movie && (
        <div className="w-full max-w-4xl bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6 backdrop-blur-md">
          {/* Plakat filmu */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
          />

          {/* Opis filmu */}
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
                  {/* Zaokrąglenie oceny do 1 miejsca po przecinku */}
                  {movie.vote_average.toFixed(1)} / 10{" "}
                </span>
              </p>
              <p className="text-lg">
                <span className="font-bold text-indigo-300">Genres:</span>{" "}
                {movie.genres.map((g) => g.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
