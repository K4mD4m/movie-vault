import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getUserRating } from "../firebase/firestore";
import { AuthContext } from "../context/AuthContext";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster_path,
  overview,
}) => {
  const { user } = useContext(AuthContext); // Get the user from the context
  const [userRating, setUserRating] = useState<number | null>(null); // State to store user rating

  // Fetch user rating from Firestore when the component mounts or when user or id changes
  useEffect(() => {
    const fetchRating = async () => {
      if (user) {
        const ratingData = await getUserRating(user.uid, id);
        if (ratingData?.rating) {
          setUserRating(ratingData.rating);
        }
      }
    };

    fetchRating();
  }, [user, id]);

  return (
    <div className="group relative rounded-lg overflow-hidden bg-gray-800 bg-opacity-70 hover:bg-opacity-80 shadow-xl transition duration-500 w-full max-w-64 sm:max-w-72 lg:max-w-xs mx-auto">
      {/* Movie poster */}
      <div className="relative w-full aspect-[2/3]">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="object-fill w-full h-full"
        />

        {/* User rating */}
        {userRating !== null && (
          <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full shadow-lg">
            Your Rating: {userRating}/10
          </div>
        )}
      </div>

      {/* Title and overview */}
      <div className="p-3 sm:p-4 text-white">
        <h3 className="text-base sm:text-lg font-semibold text-indigo-400 group-hover:text-white transition duration-200 line-clamp-1">
          {title}
        </h3>

        <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-300 group-hover:text-gray-200 transition duration-200 line-clamp-3">
          {overview}
        </p>

        <Link
          to={`/movie/${id}`}
          className="text-indigo-400 hover:text-indigo-300 mt-2 sm:mt-3 inline-block transition font-semibold text-sm sm:text-base"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
