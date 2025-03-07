import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});


// Pobieranie popularnych filmów
export const fetchPopularMovies = async () => {
  try {
    const response = await axiosInstance.get(`/movie/popular`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// Pobieranie nowości kinowych
export const fetchNewReleases = async () => {
  try {
    const response = await axiosInstance.get(`/movie/now_playing`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching new releases:", error);
    throw error;
  }
};

// Pobieranie najlepiej ocenianych filmów
export const fetchTopRatedMovies = async () => {
  try {
    const response = await axiosInstance.get(`/movie/top_rated`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

// Pobieranie obecnie popularnych osób
export const fetchTrendingPeople = async () => {
  try {
    const response = await axiosInstance.get(`/trending/person/week`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending people:", error);
    throw error;
  }
};

// Pobieranie filmów z danego gatunku
export const fetchMoviesByGenre = async (genreId: number) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await res.json();
  return data.results;
};

// Szukanie filmów na podstawie zapytania
export const searchMovies = async (query: string) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
};