import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingPeople,
} from "../api/tmdb";
import Particles from "../blocks/Backgrounds/Particles/Particles";
import MovieCard from "../components/MovieCard";
import { Link as RouterLink } from "react-router-dom";
import { Button, Box } from "@mui/material";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Popularne filmy
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]); // Najlepiej oceniane filmy
  const [trendingPeople, setTrendingPeople] = useState<Person[]>([]); // Osoby w trendach

  const [loadingMovies, setLoadingMovies] = useState<boolean>(false); // Ładowanie filmów
  const [errorMovies, setErrorMovies] = useState<string | null>(null); // Komunikat o błędzie

  const [loadingTopRated, setLoadingTopRated] = useState<boolean>(false); // Ładowanie najlepiej ocenianych filmów
  const [errorTopRated, setErrorTopRated] = useState<string | null>(null); // Komunikat o błędzie

  const [loadingPeople, setLoadingPeople] = useState<boolean>(false); // Ładowanie osób
  const [errorPeople, setErrorPeople] = useState<string | null>(null); // Komunikat o błędzie

  const [visibleCount, setVisibleCount] = useState(5); // Początkowo 5 filmów w top 20
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Ładowanie większej ilości filmów

  // Pobieranie danych z API
  useEffect(() => {
    const loadMovies = async () => {
      setLoadingMovies(true);
      setErrorMovies(null);
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        setErrorMovies("Not found. Please try again later or contact support.");
      } finally {
        setLoadingMovies(false);
      }
    };

    // Pobieranie najlepiej ocenianych filmów
    const loadTopRatedMovies = async () => {
      setLoadingTopRated(true);
      setErrorTopRated(null);
      try {
        const topRatedMoviesList = await fetchTopRatedMovies();
        setTopRatedMovies(topRatedMoviesList);
      } catch (error) {
        setErrorTopRated(
          "Not found. Please try again later or contact support."
        );
      } finally {
        setLoadingTopRated(false);
      }
    };

    // Pobieranie osób w trendach
    const loadTrendingPeople = async () => {
      setLoadingPeople(true);
      setErrorPeople(null);
      try {
        const trendingPeopleList = await fetchTrendingPeople();
        setTrendingPeople(trendingPeopleList);
      } catch (error) {
        setErrorPeople("Not found. Please try again later or contact support.");
      } finally {
        setLoadingPeople(false);
      }
    };

    loadMovies();
    loadTopRatedMovies();
    loadTrendingPeople();
  }, []);

  // Funkcja do ładowania kolejnych 5 filmów
  const loadMoreTopRated = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + 5);
        setIsLoadingMore(false);
      }, 1000);
    }
  };

  // Zwracamy spinner jeśli strona jest w stanie ładowania
  if (loadingMovies || loadingTopRated || loadingPeople) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative bg-gray-950 min-h-screen py-8 px-4">
      {/* Tło cząsteczki */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Główna treść */}
      <div className="relative z-10 mt-16">
        <h1 className="text-white text-4xl font-extrabold text-center mb-4 relative">
          <span className="text-indigo-400">
            Discover Your Next Favorite Movie
          </span>
        </h1>

        {/* Opis */}
        <p className="text-white text-lg text-center mb-8 px-6 md:px-0 max-w-3xl mx-auto">
          Uncover hidden gems, trending blockbusters, and timeless classics all
          in one place. Explore films, rate your favorites, and save them to
          your vault once you sign in.
        </p>

        {/* Przycisk do przekierowania na /search */}
        <div className="text-center mb-8">
          <Box textAlign="center" mb={8}>
            <Button
              component={RouterLink}
              to="/search"
              variant="contained"
              sx={{
                backgroundColor: "rgb(97, 95, 255)",
                color: "white",
                py: 2,
                px: 6,
                borderRadius: "16px",
                fontSize: "1.125rem",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(75, 0, 130, 0.8)",
                },
                transition: "background-color 0.3s",
              }}
            >
              Explore Movies
            </Button>
          </Box>
        </div>

        {/* Sekcja filmów popularnych */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white">Trending Now:</h2>
          {loadingMovies ? (
            <p className="text-white text-center">Loading...</p> // Prosty komunikat ładowania
          ) : errorMovies ? (
            <p className="text-center text-red-500">{errorMovies}</p> // Komunikat o błędzie w sekcji
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mt-4">
              {/* Wyświetlamy 5 filmów */}
              {movies.slice(0, 5).map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  overview={movie.overview}
                />
              ))}
            </div>
          )}
        </div>

        {/* Osoby w trendach */}
        <div className="mb-16 mt-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Trending People:
          </h2>
          {loadingPeople ? (
            <p className="text-white text-center">Loading...</p> // Prosty komunikat ładowania
          ) : errorPeople ? (
            <p className="text-center text-red-500">{errorPeople}</p> // Komunikat o błędzie w sekcji
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 lg:gap-12">
              {/* Wyświetlamy 6 osób */}
              {trendingPeople.slice(0, 6).map((person) => (
                <div
                  key={person.id}
                  className="flex flex-col items-center text-white"
                >
                  <div className="relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt={person.name}
                      className="rounded-full w-24 lg:w-40 h-24 lg:h-40 object-cover mb-6 border-4 border-indigo-500 transition-all duration-300"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-3 rounded-b-lg">
                      <span className="text-base lg:text-lg font-semibold text-white whitespace-nowrap">
                        {person.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top 20 filmów */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Top 20 Rated Movies:
          </h2>
          {loadingTopRated ? (
            <p className="text-white text-center">Loading...</p> // Prosty komunikat ładowania
          ) : errorTopRated ? (
            <p className="text-center text-red-500">{errorTopRated}</p> // Komunikat o błędzie w sekcji
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
              {topRatedMovies
                .slice(0, Math.min(20, visibleCount))
                .map((movie, index) => (
                  <div key={movie.id} className="flex flex-col items-center">
                    {/* Numeracja */}
                    <span className="text-2xl font-bold text-indigo-400 mb-2">
                      {index + 1}
                    </span>
                    <MovieCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      poster_path={movie.poster_path}
                      overview={movie.overview}
                    />
                  </div>
                ))}
            </div>
          )}
          {/* Przycisk do ładowania większej ilości filmów */}
          {visibleCount < 20 && ( // Jeśli widoczne jest mniej niż 20 filmów
            <div className="text-center mt-8">
              <Box textAlign="center" mt={8}>
                <Button
                  onClick={loadMoreTopRated}
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(97, 95, 255)",
                    color: "white",
                    py: 2,
                    px: 6,
                    borderRadius: "16px",
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "rgba(75, 0, 130, 0.8)",
                    },
                    transition: "background-color 0.3s",
                  }}
                >
                  {isLoadingMore ? "Loading..." : "Load More"}
                </Button>
              </Box>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
