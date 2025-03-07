import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft } from "lucide-react";
import { fetchMoviesByGenre, searchMovies } from "../api/tmdb";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

// Lista gatunków filmowych
const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 16, name: "Animation" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 10751, name: "Family" },
];

const Search = () => {
  const [moviesByGenre, setMoviesByGenre] = useState<{
    [key: string]: Movie[];
  }>({}); // Stan dla filmów według gatunku
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // Stan dla wyników wyszukiwania
  const [isSearching, setIsSearching] = useState(false); // Stan dla wyszukiwania
  const [loading, setLoading] = useState(true); // Stan dla ładowania
  const [error, setError] = useState(false); // Stan dla błędu
  const [searchLoading, setSearchLoading] = useState(false); // Stan dla ładowania wyszukiwania
  const [selectedGenre, setSelectedGenre] = useState<string>(""); // Stan dla wybranego gatunku

  // Pobieranie filmów według gatunku
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const newMoviesByGenre: { [key: string]: Movie[] } = {};
        for (const genre of genres) {
          const movies = await fetchMoviesByGenre(genre.id);
          newMoviesByGenre[genre.name] = movies;
        }
        setMoviesByGenre(newMoviesByGenre);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Obsługa wyszukiwania
  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    setSearchLoading(true);
    try {
      const results = await searchMovies(query);
      setSearchResults(results || []); // ustaw wyniki wyszukiwania na wyniki z API lub pustą tablicę
    } catch (err) {
      console.error("Search API error:", err);
      setSearchResults([]); // ustaw wyniki wyszukiwania na pustą tablicę w przypadku błędu
    } finally {
      setSearchLoading(false);
    }
  };

  // Obsługa zmiany gatunku
  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    setSelectedGenre(event.target.value);
  };

  // Komponenty dla strzałek w karuzeli
  interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
  }

  const CustomPrevArrow: React.FC<ArrowProps> = ({
    className,
    style,
    onClick,
  }) => {
    return (
      <div
        className={`${className} custom-arrow custom-prev`}
        style={{
          ...style,
          display: "block",
          left: "-20px",
        }}
        onClick={onClick}
      >
        ⬅
      </div>
    );
  };

  const CustomNextArrow: React.FC<ArrowProps> = ({
    className,
    style,
    onClick,
  }) => {
    return (
      <div
        className={`${className} custom-arrow custom-next`}
        style={{
          ...style,
          display: "block",
          right: "-20px",
        }}
        onClick={onClick}
      >
        ➡
      </div>
    );
  };

  // Ustawienia dla karuzeli
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  // Zwracamy spinner jeśli strona jest w stanie ładowania
  if (loading) {
    return <LoadingSpinner />;
  }

  // Zwracamy komunikat o błędzie
  if (error) {
    return (
      <div className="bg-gray-950 min-h-screen p-6 text-white text-center">
        <h1 className="text-4xl font-bold mb-6">Error loading movies</h1>
        <p>
          There was an issue fetching the movie data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    // Wyszukiwarka filmów
    <div className="bg-gray-950 min-h-screen p-6">
      <h1 className="text-white text-4xl font-bold text-center mb-6 mt-16">
        Find Your Movie:
      </h1>
      <SearchBar onSearch={handleSearch} />

      {/* Sekcja rekomendowanych filmów */}
      {!isSearching && ( // Jeśli nie jesteśmy w stanie wyszukiwania to wyświetlamy rekomendowane filmy
        <>
          <h2 className="text-white text-3xl font-semibold text-center mt-16 lg:mt-24">
            Or explore our recommended Movies...
          </h2>

          {/* Dropdown menu dla gatunków */}
          <div className="text-center mb-8 mt-4">
            <FormControl
              fullWidth
              sx={{
                maxWidth: { xs: "100%", sm: 350, lg: 500 },
                mx: "auto",
              }}
            >
              <InputLabel id="genre-select-label" sx={{ color: "white" }}>
                Select Genre
              </InputLabel>
              <Select
                labelId="genre-select-label"
                value={selectedGenre}
                onChange={handleGenreChange}
                label="Select Genre"
                sx={{
                  backgroundColor: "rgba(96, 96, 96, 0.8)",
                  color: "white",
                  py: { xs: 2, lg: 1 },
                  px: 4,
                  borderRadius: 6,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {genres.map((genre) => (
                  <MenuItem
                    key={genre.id}
                    value={genre.name}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                      },
                    }}
                  >
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </>
      )}

      {/* Sekcja wyników wyszukiwania */}
      {isSearching ? ( // Jeśli jesteśmy w stanie wyszukiwania to wyświetlamy wyniki wyszukiwania
        <div className="mt-8">
          <h2 className="text-white text-2xl font-semibold mb-4">
            <div className="w-full max-w-4xl">
              {/* Przycisk powrotu do wyszukiwania */}
              <button
                onClick={() => window.location.reload()}
                className="flex items-center text-indigo-400 hover:text-indigo-300 transition mb-6 text-lg font-semibold cursor-pointer"
              >
                <ArrowLeft className="mr-2" /> Back to Search
              </button>
            </div>
            Search Results:
          </h2>
          {searchLoading ? ( // Jeśli trwa ładowanie wyników wyszukiwania to wyświetlamy prosty komunikat
            <div className="text-white">Loading...</div>
          ) : Array.isArray(searchResults) && searchResults.length === 0 ? (
            <div className="text-white">No movies found for your search.</div> // Jeśli nie znaleziono filmów to wyświetlamy komunikat
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Wyświetlamy wyniki wyszukiwania */}
              {searchResults.map((movie) => (
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
      ) : selectedGenre ? ( // Jeśli wybrano gatunek to wyświetlamy filmy dla tego gatunku
        <div className="mt-8">
          <h2 className="text-white text-2xl font-semibold mb-4">
            {selectedGenre}
          </h2>
          {moviesByGenre[selectedGenre] &&
          moviesByGenre[selectedGenre].length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {moviesByGenre[selectedGenre].map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  overview={movie.overview}
                />
              ))}
            </div>
          ) : (
            // Jeśli pojawi się błąd to wyświetlamy komunikat
            <p className="text-red-500">
              There was an issue fetching movies for {selectedGenre}. Please try
              again later or contact support.
            </p>
          )}
        </div>
      ) : (
        genres.slice(0, 3).map((genre) => {
          // Wyświetlamy filmy dla pierwszych trzech gatunków
          const movies = moviesByGenre[genre.name];
          const isEmpty = !Array.isArray(movies) || movies.length === 0; // Sprawdzamy czy filmy dla danego gatunku istnieją

          return (
            <div key={genre.id} className="mb-8">
              <h2 className="text-white text-2xl font-semibold mb-4">
                {genre.name}
              </h2>
              {isEmpty ? (
                <div className="text-red-500">
                  Not found. Please try again later or contact support.
                </div> // Jeśli nie znaleziono filmów to wyświetlamy komunikat
              ) : (
                <Slider {...sliderSettings}>
                  {" "}
                  {/* Karuzela dla filmów */}
                  {movies?.map((movie) => (
                    <div key={movie.id} className="px-2">
                      <MovieCard
                        id={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        overview={movie.overview}
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Search;
